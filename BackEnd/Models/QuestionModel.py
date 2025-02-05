from pydantic import BaseModel

class QuestionModel(BaseModel):
    
    id: int
    question: str
    answer: str
    status: str

    def to_dict(self):
        return {
            "id": self.id,
            "question": self.question,
            "answer": self.answer,
            "status" : self.status

        }