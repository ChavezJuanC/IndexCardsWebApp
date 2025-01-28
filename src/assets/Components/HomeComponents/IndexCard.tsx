import { useState } from "react";

interface IndexCardProps {
    question: string;
    answer: string;
}

function IndexCard({ question, answer }: IndexCardProps) {
    const [showAnswer, setShowAnswer] = useState<boolean>(false);

    function handleShowAnswer(): void {
        if (!showAnswer) {
            setShowAnswer(true);
        }
    }

    return (
        <div className="flex flex-col h-full">
            <div className="flex-grow-[3] overflow-auto p-2">{question}</div>
            <hr />
            {/*This section should show a "show" button to reveal answer*/}
            <div className="flex-grow-[1] overflow-auto p-2">
                {showAnswer ? (
                    answer
                ) : (
                    <div
                        onClick={handleShowAnswer}
                        className="border-2 border-black h-10 w-30 flex justify-center items-center mx-auto mt-10 rounded-md
                        hover:cursor-pointer"
                    >
                        Show Answer
                    </div>
                )}
            </div>
        </div>
    );
}

export default IndexCard;
