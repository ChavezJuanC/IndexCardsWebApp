import {
    QuestionAnswerType,
    ReplaceAllQuestions,
} from "../../../../HelperFunctions/ApiCalls";

function LoadQuestion() {
    async function handleQuestionsUpdate(data: QuestionAnswerType[]) {
        await ReplaceAllQuestions(data);
    }

    function handleFileChange(event: React.ChangeEvent<HTMLInputElement>) {
        let parsedData: QuestionAnswerType[];

        if (event.target.files != null) {
            const file = event.target.files[0];

            if (file.type == "application/json") {
                const reader = new FileReader();
                reader.onload = async (e) => {
                    try {
                        if (
                            e.target != null &&
                            typeof e.target.result === "string"
                        ) {
                            parsedData = JSON.parse(e.target.result);
                            console.log(parsedData);
                            await handleQuestionsUpdate(parsedData);
                        }
                    } catch (error) {
                        console.error("Error parsing JSON:", error);
                    }
                };

                reader.readAsText(file);
            } else {
                alert("Please choose a valid json file");
            }
        }
    }

    return (
        //Maybe this should read the questions file, validate its structure(else return error..), paste it to the main file...
        <>
            <div className="hidden xl:flex">
                <div>load Questions</div>
                <div>
                    <input
                        type="file"
                        onChange={(e) => {
                            handleFileChange(e);
                        }}
                    />
                </div>
            </div>
            <div className="block xl:hidden p-6 text-center text-blue-800 bg-blue-50 rounded-lg shadow-lg mx-4 my-10">
                Please extend your browser size for the best experience.
            </div>
        </>
    );
}

export default LoadQuestion;
// Write put route for api that will replace everything on the current file....

//Create. a save questions feature that lets you save your current questions as json files for later use.

//THOUGHTS... for the AI have it generate the json with a set structure... show questions.. give option to save questions to file... replace current file info with this info and bang!!!

//Delete unecessary routes.. AI style and bang!c
