import { UpdateQuestionsList } from "../../../HelperFunctions/ApiCalls";

interface QuestionAnswer {
    id: number;
    question: string;
    answer: string;
    setQuestionsList: Function;
}

function QuestionAnswerPair({
    question,
    answer,
    id,
    setQuestionsList,
}: QuestionAnswer) {
    const server: string = "http://127.0.0.1:8000";

    async function deleteQuestion(question_id: number) {
        try {
            const res = await fetch(
                `${server}/local-questions/${question_id}`,
                {
                    method: "DELETE",
                    headers: {
                        "content-type": "application/json",
                    },
                }
            );

            if (!res.ok) {
                throw new Error("Network Error Deleting Question");
            }

            console.log("Question with id {0} deleted successfully", id);

            const newQuestionList: any[] = await UpdateQuestionsList();
            setQuestionsList(newQuestionList);
        } catch (error) {
            console.log(`Error: ${error}`);
        }
    }

    return (
        <div className="my-4 bg-blue-50 shadow-md rounded-lg p-4">
            <div className="border-2 border-blue-200 rounded-md my-2 p-3 bg-white">
                {question.split("\n").map((line, index) => (
                    <span key={index}>
                        {line}
                        <br />
                    </span>
                ))}
            </div>
            <div className="border-2 border-blue-200 rounded-md my-2 p-3 bg-white">
                {answer.split("\n").map((line, index) => (
                    <span key={index}>
                        {line}
                        <br />
                    </span>
                ))}
            </div>
            <div className="flex justify-end">
                <button
                    className="border-2 border-red-600 bg-red-600 text-white px-4 py-1 rounded-md hover:bg-red-700 transition-colors duration-200"
                    onClick={() => deleteQuestion(id)}
                >
                    Delete
                </button>
            </div>
        </div>
    );
}

export default QuestionAnswerPair;