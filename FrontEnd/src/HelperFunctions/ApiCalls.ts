const serverUrl: string = "http://127.0.0.1:8000";

interface QuestionAnswerType {
    id: number;
    question: string;
    answer: string;
    status: string;
}

async function UpdateQuestionsList(): Promise<QuestionAnswerType[]> {
    const res: Response = await fetch(`${serverUrl}/all-local-questions`);
    let questions = [];

    try {
        if (!res.ok) {
            throw new Error("Network Error Fetching Quesions");
        }
        questions = await res.json();
        return questions.reverse();
    } catch (error) {
        console.log(`Error: ${error}`);
        return questions.reverse();
    }
}

async function PostNewQuestion(question: QuestionAnswerType): Promise<string> {
    const res: Response = await fetch(`${serverUrl}/new/question`, {
        method: "POST",
        headers: {
            "content-type": "application/json",
            //how to include body here??
        },
        body: JSON.stringify(question),
    });

    if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
    }

    const data: string = await res.json();
    return data;
}

export { UpdateQuestionsList, serverUrl, PostNewQuestion };
export type { QuestionAnswerType };
