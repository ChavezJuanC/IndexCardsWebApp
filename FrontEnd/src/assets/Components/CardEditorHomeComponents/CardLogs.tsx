import QuestionAnswerPair from "./QuestionAnswerPair";

interface Question {
    id: number;
    question: string;
    answer: string;
}

interface CardLogsProps {
    questions: Question[];
    setQuestionList: Function;
}

function CardLogs({ questions, setQuestionList }: CardLogsProps) {
    const questionFeed = questions.map((q) => (
        <QuestionAnswerPair
            question={q.question}
            answer={q.answer}
            id={q.id}
            setQuestionsList={setQuestionList}
        />
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
