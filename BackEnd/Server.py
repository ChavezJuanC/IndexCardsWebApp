from fastapi import FastAPI
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
            if not isinstance(questions_data, list):  # Ensure it's a list
                questions_data = []
    except (FileNotFoundError, json.JSONDecodeError):
        questions_data = [] # Start fresh List

    questions_data.append(question.to_dict())  

    with open("questions.json", mode="w", encoding="utf-8") as write_file:
        json.dump(questions_data, write_file, ensure_ascii=False, indent=4)

    return {"Message" : "New Question Added"}

##Second route should be able to retrive all of the questions in local file...
##Third route should be able to clear the entire local file...
##Fourth route should be able to delete question by id.
##Fifth route should be able to accept a exact file path and return all question in that json file..
##Sixth route should be able to delete question from said file