const serverUrl: string = "http://127.0.0.1:8000";

interface QuestionAnswerType {
    id: number;
    question: string;
    answer: string;
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

export { UpdateQuestionsList, serverUrl };
export type { QuestionAnswerType };
