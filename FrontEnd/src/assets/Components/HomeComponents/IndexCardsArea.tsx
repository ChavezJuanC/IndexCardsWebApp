import { useEffect, useState } from "react";
import { QuestionAnswerType } from "../../../HelperFunctions/ApiCalls";

interface IndexCardsAreaProps {
    questions: QuestionAnswerType[];
}

function IndexCardsArea({ questions }: IndexCardsAreaProps) {
    const [currentCard, setCurrentCard] = useState<QuestionAnswerType>({
        id: 0,
        question: "Please add some questions",
        answer: "Please add some answer",
        status: "unanswered",
    });

    useEffect(() => {
        if (questions.length > 0) {
            setCurrentCard(questions[0]);
        }
    });

    function handleStatusUpdate(newState: string) {
        console.log(newState);
        //send update request to server by id.. update current card(stateful) with new reponse body also update on the list by id.
    }

    useEffect(() => {
        console.log("Index Card Area Questions: ", questions);
    });

    return (
        <div className="w-1/2 border-2 border-black mx-auto">
            <div>{currentCard.status}</div>
            <div className=" border-2 border-black mx-auto">
                <div>
                    <div>{currentCard.question}</div>
                    <div>{currentCard.answer}</div>
                </div>
            </div>
            <div>
                <div onClick={() => handleStatusUpdate("correct")}>Correct</div>
                <div onClick={() => handleStatusUpdate("Incorrect")}>
                    Incorrect
                </div>
            </div>
        </div>
    );
}

export default IndexCardsArea;
