interface QuestionAnswer {
    question: string;
    answer: string;
}

function QuestionAnswerPair({ question, answer }: QuestionAnswer) {
    return (
        <div className="my-4">
            <div className="border-1 rounded-sm my-1 px-2 py-1">
                Q: {question}
            </div>
            <div className="border-1 rounded-sm my-1 px-2 py-1">
                A: {answer}
            </div>
            {/*Delete button logic pending!!*/}
            <div className="flex justify-end">
                <button className="border-2 px-2 rounded-sm">Delete</button>
            </div>
        </div>
    );
}

export default QuestionAnswerPair;
