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

    const [currentCardIndex, setCurrentCardIndex] = useState<number>(0);

    useEffect(() => {
        if (questions.length > 0) {
            setCurrentCard(questions[currentCardIndex]);
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

    function handleCardCycling(direction: string) {
        let newIndex = currentCardIndex;

        if (direction === "right") {
            if (currentCardIndex < questions.length - 1) {
                newIndex = currentCardIndex + 1;
                console.log("next card");
            } else {
                console.log("Last Card");
                return;
            }
        } else if (direction === "left") {
            if (currentCardIndex > 0) {
                newIndex = currentCardIndex - 1;
                console.log("prev card");
            } else {
                console.log("First Card");
                return;
            }
        } else {
            console.log("Invalid Direction Param");
            return;
        }

        setCurrentCardIndex(newIndex);
        setCurrentCard(questions[newIndex]);
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
                <div>
                    <div onClick={() => handleStatusUpdate("correct")}>
                        Correct
                    </div>
                    <div onClick={() => handleStatusUpdate("incorrect")}>
                        Incorrect
                    </div>
                </div>
                <div>
                    <div
                        onClick={() => {
                            handleCardCycling("left");
                        }}
                    >
                        Previous
                    </div>
                    <div
                        onClick={() => {
                            handleCardCycling("right");
                        }}
                    >
                        Next
                    </div>
                </div>
            </div>
        </div>
    );
}

export default IndexCardsArea;
