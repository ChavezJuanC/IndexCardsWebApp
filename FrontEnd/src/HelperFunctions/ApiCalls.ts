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
        return questions;
    } catch (error) {
        console.log(`Error: ${error}`);
        return questions;
    }
}

async function PostNewQuestion(question: QuestionAnswerType): Promise<string> {
    const res: Response = await fetch(`${serverUrl}/new/question`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(question),
    });

    if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
    }

    const data: string = await res.json();
    return data;
}

async function updateQuestionById(
    id: string,
    status: string
): Promise<QuestionAnswerType> {
    const res: Response = await fetch(
        `${serverUrl}/local-questions/${id}/${status}`,
        {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
        }
    );

    if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
    }

    const data: QuestionAnswerType = await res.json();

    return data;
}

async function ResetQuestionsStatus(): Promise<QuestionAnswerType[]> {
    const res: Response = await fetch(`${serverUrl}/local-questions/reset`, {
        method: "POST",
        headers: { "Content-Type": "applicaton/json" },
    });

    if (!res.ok) {
        throw new Error(`HTTP error! status : ${res.status}`);
    }

    const data: QuestionAnswerType[] = await res.json();

    return data;
}

async function ReplaceAllQuestions(
    questionsList: QuestionAnswerType[]
): Promise<QuestionAnswerType[]> {
    console.log(questionsList);
    const res: Response = await fetch(`${serverUrl}/local-questions/replace`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(questionsList),
    });

    if (!res.ok) {
        throw new Error(`HTTP error :  status : ${res.status}`);
    }

    const data: QuestionAnswerType[] = await res.json();

    return data;
}

export {
    UpdateQuestionsList,
    serverUrl,
    PostNewQuestion,
    updateQuestionById,
    ResetQuestionsStatus,
    ReplaceAllQuestions,
};
export type { QuestionAnswerType };
