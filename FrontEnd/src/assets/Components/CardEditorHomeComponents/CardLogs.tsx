import { useNavigate } from "react-router-dom";
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
    const questionFeed = questions
        .map((q) => (
            <QuestionAnswerPair
                key={q.id}
                question={q.question}
                answer={q.answer}
                id={q.id}
                setQuestionsList={setQuestionList}
            />
        ))
        .reverse();

    const naviagate = useNavigate();
    return (
        <div className="bg-white shadow-lg rounded-lg p-6">
            <div className="mb-4">
                <button
                    className="border-2 border-blue-600 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors duration-200"
                    onClick={() => naviagate("/savenewquestions")}
                >
                    Save Questions
                </button>
            </div>
            <div className="space-y-4">{questionFeed}</div>
        </div>
    );
}

export default CardLogs;
