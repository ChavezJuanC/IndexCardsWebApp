import { useEffect, useState } from "react";
import {
    QuestionAnswerType,
    updateQuestionById,
} from "../../../HelperFunctions/ApiCalls";

interface IndexCardsAreaProps {
    questions: QuestionAnswerType[];
    setQuestionList: Function;
}

function IndexCardsArea({ questions, setQuestionList }: IndexCardsAreaProps) {
    const [currentCard, setCurrentCard] = useState<QuestionAnswerType>({
        id: 0,
        question: "Please add some questions",
        answer: "Please add some answers",
        status: "unanswered",
    });

    useEffect(() => {
        if (questions.length > 0) {
            setCurrentCard(questions[0]);
        }
    }, [questions]);

    async function handleStatusUpdate(newState: string) {
        try {
            const updatedQuestion = await updateQuestionById(
                currentCard.id.toString(),
                newState
            );

            setCurrentCard(updatedQuestion);

            const newList = questions.map((element) =>
                element.id === currentCard.id ? updatedQuestion : element
            );

            setQuestionList(newList);
            console.log("Update successful");
        } catch (error) {
            console.error("Failed to update status:", error);
        }
    }

    return (
        <div>
            <div>{currentCard.status}</div>
            <div>
                <div>
                    <div>{currentCard.question}</div>
                    <div>{currentCard.answer}</div>
                </div>
            </div>
            <div>
                <div onClick={() => handleStatusUpdate("correct")}>Correct</div>
                <div onClick={() => handleStatusUpdate("incorrect")}>
                    Incorrect
                </div>
            </div>
        </div>
    );
}

export default IndexCardsArea;
