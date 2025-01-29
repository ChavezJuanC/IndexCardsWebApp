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
            {/* Top section (Question) */}
            <div className="flex-grow-[3] overflow-auto p-2">{question}</div>
            <hr />
            {/* Bottom section (Answer or Show Button) */}
            <div className="flex-grow-[1] min-h-[100px] overflow-auto p-2 flex justify-center items-center">
                {showAnswer ? (
                    <div className="overflow-auto h-full w-full">{answer}</div>
                ) : (
                    <div
                        onClick={handleShowAnswer}
                        className="border-2 border-black h-10 w-30 flex justify-center items-center rounded-md
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
