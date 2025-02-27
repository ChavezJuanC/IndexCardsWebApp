import { generateQuestions } from "../../../../HelperFunctions/AICalls";
import {
    QuestionAnswerType,
    ReplaceAllQuestions,
} from "../../../../HelperFunctions/ApiCalls";

function AIQuestions() {
    async function handleQuestionsFileUpdate(questions: QuestionAnswerType[]) {
        try {
            await ReplaceAllQuestions(questions);
        } catch (error) {
            console.error("Error updating questions file:", error);
        }
    }

    return (
        <div>
            AI QUESTIONS
            <div
                onClick={async () => {
                    console.log("Generating Questions...");
                    const questions: QuestionAnswerType[] =
                        await generateQuestions("Vinos", 3, 5, "Spanish");
                    await handleQuestionsFileUpdate(questions);
                    console.log(questions);
                }}
            >
                CLICK ME
            </div>
        </div>
    );
}

export default AIQuestions;

//implement object structure validation on AI API CALL
//implement form for questions prompt.
//use form data for prompt on generate click!
//VISUALS
//Diasble buttons -> indicate generating... with stateful var + loop -> update file -> enable buttons.
