import { useEffect, useState } from "react";
import {
    QuestionAnswerType,
    updateQuestionById,
} from "../../../HelperFunctions/ApiCalls";

interface IndexCardsAreaProps {
    questions: QuestionAnswerType[];
    setQuestionList: Function;
    trigerReset: boolean;
    setTrigerReset: Function;
}

function IndexCardsArea({
    questions,
    setQuestionList,
    trigerReset,
    setTrigerReset,
}: IndexCardsAreaProps) {
    const [currentCard, setCurrentCard] = useState<QuestionAnswerType>({
        id: 0,
        question: "Please add some questions",
        answer: "Please add some answers",
        status: "unanswered",
    });

    const [showAnswer, setShowAnswer] = useState<boolean>(false);
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

    useEffect(() => {
        if (trigerReset) {
            setTrigerReset();

            setCurrentCard(questions[0]);
            setCurrentCardIndex(0);
            setShowAnswer(false);
            console.log("Questions Reset");
            setTrigerReset(false);
        }
    }, [trigerReset]);

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
        <div className="mt-10 h-screen">
            <div className="mb-10 text-2xl mx-auto text-center text-blue-800 font-bold">
                {currentCard.status[0].toUpperCase() +
                    currentCard.status.slice(1)}
            </div>
            <div className="border-2 border-blue-600 bg-white shadow-lg rounded-lg w-1/2 mx-auto h-4/7 flex flex-col">
                {/* Question Section (takes 3/4 of the card height) */}
                <div className="flex-1 p-6 overflow-y-auto text-blue-900">
                    {currentCard.question.split("\n").map((line, index) => (
                        <span key={index}>
                            {line}
                            <br />
                        </span>
                    ))}
                </div>

                {/* Answer Section (takes 1/4 of the card height) */}
                <div className="h-1/3 border-t-2 border-blue-600 relative bg-blue-50 rounded-b-lg">
                    {/* Hide/Show Button (positioned above the answer box) */}
                    <div
                        onClick={() => setShowAnswer(!showAnswer)}
                        className="absolute -top-6 left-1/2 transform -translate-x-1/2 bg-blue-600 text-white border-2 border-blue-600 px-4 py-1 rounded-md cursor-pointer hover:bg-blue-700 transition-colors duration-200"
                    >
                        {showAnswer ? "Hide Answer" : "Show Answer"}
                    </div>

                    {/* Answer Box (inside the bottom 1/4 section) */}
                    {showAnswer && (
                        <div className="h-full p-4 overflow-y-auto text-blue-900">
                            {currentCard.answer
                                .split("\n")
                                .map((line, index) => (
                                    <span key={index}>
                                        {line}
                                        <br />
                                    </span>
                                ))}
                        </div>
                    )}
                </div>
            </div>

            {/* Buttons for navigation and status update */}
            <div className="flex flex-row justify-center mt-10">
                <div className="flex mr-64">
                    <div
                        onClick={() => handleStatusUpdate("correct")}
                        className="border-2 border-green-600 bg-green-600 text-white px-4 py-2 rounded-md mx-2 hover:cursor-pointer hover:bg-green-700 transition-colors duration-200"
                    >
                        Correct
                    </div>
                    <div
                        onClick={() => handleStatusUpdate("incorrect")}
                        className="border-2 border-red-600 bg-red-600 text-white px-4 py-2 rounded-md mx-2 hover:cursor-pointer hover:bg-red-700 transition-colors duration-200"
                    >
                        Incorrect
                    </div>
                </div>
                <div className="flex ml-64">
                    <div
                        onClick={() => {
                            setShowAnswer(false);
                            handleCardCycling("left");
                        }}
                        className="border-2 border-blue-600 bg-blue-600 text-white px-4 py-2 rounded-md mx-2 hover:cursor-pointer hover:bg-blue-700 transition-colors duration-200"
                    >
                        Previous
                    </div>
                    <div
                        onClick={() => {
                            setShowAnswer(false);
                            handleCardCycling("right");
                        }}
                        className="border-2 border-blue-600 bg-blue-600 text-white px-4 py-2 rounded-md mx-2 hover:cursor-pointer hover:bg-blue-700 transition-colors duration-200"
                    >
                        Next
                    </div>
                </div>
            </div>
        </div>
    );
}

export default IndexCardsArea;