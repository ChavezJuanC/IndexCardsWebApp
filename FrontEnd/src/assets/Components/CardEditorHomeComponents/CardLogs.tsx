import QuestionAnswerPair from "./QuestionAnswerPair";

interface Question {
    id: string;
    question: string;
    answer: string;
}

interface CardLogsProps {
    questions: Question[];
}

function CardLogs({ questions }: CardLogsProps) {
    const questionFeed = questions.map((q) => (
        <QuestionAnswerPair question={q.question} answer={q.answer} />
    ));

    return (
        <div>
            <div className="">
                <button className="border-2 rounded-md px-2">
                    Save Questions
                </button>
            </div>
            <div>{questionFeed}</div>
        </div>
    );
}

export default CardLogs;
