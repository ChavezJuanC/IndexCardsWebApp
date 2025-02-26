import { useNavigate } from "react-router-dom";
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

    const navigate = useNavigate();

    return (
        <>
            {/* Back Button */}
            <div
                onClick={() => navigate("/edit-cards/home")}
                className="hover:cursor-pointer text-white hover:text-stone-300 bg-blue-600 font-semibold p-3 transition-colors duration-200 w-28 text-center mt-5 ml-5 rounded-md"
            >
                Back
            </div>

            {/* Main Content */}
            <div className="hidden xl:flex mt-10 justify-center">
                <div className="border-2 border-blue-200 bg-white shadow-lg rounded-lg p-6 w-96">
                    {/* Title */}
                    <div className="text-blue-800 text-xl font-bold mb-4">
                        Upload Your Own Questions
                    </div>

                    {/* File Input Section */}
                    <div className="flex items-center space-x-4">
                        <div className="text-blue-700">File:</div>
                        <div>
                            <input
                                type="file"
                                onChange={handleFileChange}
                                className="border-2 border-blue-200 rounded-md p-1 focus:border-blue-600 focus:outline-none"
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* Responsive Message */}
            <div className="block xl:hidden p-6 text-center text-blue-800 bg-blue-50 rounded-lg shadow-lg mx-4 my-10">
                Please extend your browser size for the best experience.
            </div>
        </>
    );
}

export default LoadQuestion;

//Create. a save questions feature that lets you save your current questions as json files for later use.

//THOUGHTS... for the AI have it generate the json with a set structure... show questions.. give option to save questions to file... replace current file info with this info and bang!!!

//Delete unecessary routes.. AI style and bang
