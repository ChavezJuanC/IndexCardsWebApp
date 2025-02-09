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
    //Delete by id from api here
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
        <div className="my-4">
            <div className="border-1 rounded-sm my-1 p-3">
                {question.split("\n").map((line, index) => (
                    <span key={index}>
                        {line}
                        <br />
                    </span>
                ))}
            </div>
            <div className="border-1 rounded-sm my-1 p-3">
                {answer.split("\n").map((line, index) => (
                    <span key={index}>
                        {line}
                        <br />
                    </span>
                ))}
            </div>
            {/*Delete button logic pending!!*/}
            <div className="flex justify-end">
                <button
                    className="border-2 px-2 rounded-sm"
                    onClick={() => deleteQuestion(id)}
                >
                    Delete
                </button>
            </div>
        </div>
    );
}

export default QuestionAnswerPair;
