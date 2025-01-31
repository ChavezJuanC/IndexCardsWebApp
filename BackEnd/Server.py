from fastapi import FastAPI, HTTPException
from Models import QuestionModel
import json

# ID counter global var
idCounter : int = 0

app = FastAPI()

@app.get("/")
async def ping_server():
    return {"Ping" : "Ping"}

##Firs route should allow us to send a question and an answers +  ID and store it in a json file locally...
@app.post("/new/question")
async def new_question(question: QuestionModel.QuestionModel):
    global idCounter
    question.id = idCounter
    idCounter += 1

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

    return {"Message" : "New Question Added"}

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

            return{"Message" : "Question list was cleared"}

    except(FileExistsError):
        raise HTTPException(status_code=404, detail="File with local questions not found..")
    
    except:
        raise HTTPException(status_code=400, detail="Error trying to read questions file.")

##Fourth route should be able to delete question by id.
@app.delete("/local-questions/{id}")
def delete_local_question(id: int):
    try:
        with open("questions.json", mode="r", encoding="utf-8") as read_file:
            question_data = json.load(read_file)
            if not isinstance(question_data, list):
                raise HTTPException(status_code=400, detail="Error Handling Data, Ensure Json is valid.")
        
        starting_length : int = len(question_data)

        if starting_length == 0:
            raise HTTPException(status_code=400, detail="Empty Question File.")

        question_data = [item for item in question_data if item.get("id") != id]

        if (len(question_data) != starting_length):
            with open("questions.json", mode="w", encoding="utf-8") as write_file:
                json.dump(question_data, write_file)

            return {"Message" : f"Question with id ({id}) has been deleted."}
        
        else:
            raise HTTPException(status_code=404, detail=f"Question with id ({question_data}) not found.")
    
    except(FileNotFoundError):
        raise HTTPException(status_code=404, detail="No questions file found.")
    
    except:
        raise HTTPException(status_code=400, detail="Something went wrong while tryign to delete question.")

##Fifth route should be able to accept a exact file path and return all question in that json file..
@app.get("/questions-file/{path}")
def get_questions_from_filepath(path: str):

    try:
        with open(path, mode="r", encoding="utf-8") as read_file:
            question_data = json.load(read_file)
            if not isinstance(question_data, list):
                question_data = []
    
    except (FileNotFoundError, json.JSONDecodeError):
        question_data = []

    return question_data
