from fastapi import FastAPI, HTTPException
from Models import QuestionModel
import json
from fastapi.middleware.cors import CORSMiddleware
import datetime

ALLOWED_STATUSES = {"unanswered", "correct", "incorrect"}  # Use a set for faster lookup

app = FastAPI()

##not very tailored
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
async def ping_server():
    return {"Ping": "Ping"}


##Firs route should allow us to send a question and an answers +  ID and store it in a json file locally...
@app.post("/new/question")
async def new_question(question: QuestionModel.QuestionModel):
    ##create id here based on time and date
    now = datetime.datetime.now()
    newId = now.strftime("%Y%m%d%H%M%S")
    question.id = newId
    question.status = "unanswered"

    # Load existing data safely
    try:
        with open("questions.json", mode="r", encoding="utf-8") as read_file:
            questions_data = json.load(read_file)
            if not isinstance(questions_data, list):
                questions_data = []

    except (FileNotFoundError, json.JSONDecodeError):
        questions_data = []

    questions_data.append(question.to_dict())

    with open("questions.json", mode="w", encoding="utf-8") as write_file:
        json.dump(questions_data, write_file, ensure_ascii=False, indent=4)

    return {"Message": "New Question Added"}


##Second route should be able to retrive all of the questions in local file...
@app.get("/all-local-questions")
def get_all_local_questions():
    try:
        with open("questions.json", mode="r", encoding="utf-8") as read_file:
            question_data = json.load(read_file)
            if not isinstance(question_data, list):
                question_data = []

    except (FileNotFoundError, json.JSONDecodeError):
        question_data = []

    return question_data


##Third route should be able to clear the entire local file...
@app.delete("/all-local-questions")
def delete_all_local_questions():
    try:
        with open("questions.json", mode="w", encoding="utf-8") as write_file:
            json.dump("[]", write_file)

            return {"Message": "Question list was cleared"}

    except FileExistsError:
        raise HTTPException(
            status_code=404, detail="File with local questions not found.."
        )

    except:
        raise HTTPException(
            status_code=400, detail="Error trying to read questions file."
        )


##Fourth route should be able to delete question by id.
@app.delete("/local-questions/{id}")
def delete_local_question(id: str):
    try:
        with open("questions.json", mode="r", encoding="utf-8") as read_file:
            question_data = json.load(read_file)
            if not isinstance(question_data, list):
                raise HTTPException(
                    status_code=400, detail="Error Handling Data, Ensure Json is valid."
                )

        starting_length: int = len(question_data)

        if starting_length == 0:
            raise HTTPException(status_code=400, detail="Empty Question File.")

        question_data = [item for item in question_data if item.get("id") != id]

        if len(question_data) != starting_length:
            with open("questions.json", mode="w", encoding="utf-8") as write_file:
                json.dump(question_data, write_file)

            return {"Message": f"Question with id ({id}) has been deleted."}

        else:
            raise HTTPException(
                status_code=404, detail=f"Question with id ({question_data}) not found."
            )

    except FileNotFoundError:
        raise HTTPException(status_code=404, detail="No questions file found.")

    except:
        raise HTTPException(
            status_code=400,
            detail="Something went wrong while tryign to delete question.",
        )


##Fifth route should be able to accept a exact file path and return all question in that json file..
from fastapi import HTTPException
import json


@app.put("/local-questions/{id}/{status}")
def update_question_status(id: str, status: str):
    targetQuestion = None

    # Validate the status
    if status not in ALLOWED_STATUSES:
        raise HTTPException(
            status_code=400,
            detail=f"Invalid status. Allowed values are: {ALLOWED_STATUSES}",
        )

    try:
        with open("questions.json", mode="r", encoding="utf-8") as read_file:
            question_data = json.load(read_file)
            if not isinstance(question_data, list):
                question_data = []

        for question in question_data:
            if question["id"] == id:
                question["status"] = status
                targetQuestion = question
                break

        if targetQuestion is None:
            raise HTTPException(
                status_code=404,
                detail=f"Question with id ({id}) not found.",
            )

        with open("questions.json", mode="w", encoding="utf-8") as write_file:
            json.dump(question_data, write_file)

        return targetQuestion

    except FileNotFoundError:
        raise HTTPException(status_code=404, detail="No questions file found.")
    except json.JSONDecodeError:
        raise HTTPException(status_code=400, detail="Invalid JSON format in the file.")
    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Something went wrong while trying to update the status: {str(e)}",
        )


# create a POST route that reads the current file...
# for every obj in the file.. status = "unanswered"
# Write list to file..
# Return moded list
@app.post("/local-questions/reset")
def local_questions_status_reset():
    try:  
        with open("questions.json", mode="r", encoding="utf-8") as read_file:
            question_data = json.load(read_file)
            if not isinstance(question_data, list):
                raise HTTPException(
                    status_code=400, detail="Error Handling Data, Ensure Json is valid."
            )

        if len(question_data) > 0:
            for question in question_data:
                question["status"] = "unanswered"
        
        with open("questions.json", mode="w", encoding="utf-8") as write_file:
            json.dump(question_data, write_file)

        return question_data
    
    except FileNotFoundError:
        raise HTTPException(status_code=404, detail="No questions file found.")
    except json.JSONDecodeError:
        raise HTTPException(status_code=400, detail="Invalid JSON format in the file.")
    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Something went wrong while trying to reset the status for all questions: {str(e)}",
        )
            


