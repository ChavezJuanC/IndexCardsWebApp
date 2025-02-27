import { useState } from "react";
import { useNavigate } from "react-router-dom";

function SaveQuestions() {
    const navigate = useNavigate();
    const [fileName, setFileName] = useState<string>("NewQuestions.json");

    async function handleDownload() {
        console.log("Downloading ", fileName);
        try {
            const res = await fetch("/questions.json");

            if (!res.ok) {
                throw new Error("Failed to fetch the JSON file.");
            }
            console.log(res);
            const jsonData = await res.json();
            const blob = new Blob([JSON.stringify(jsonData, null, 2)], {
                type: "application/json",
            });

            // Download with link
            const url = URL.createObjectURL(blob);
            const link = document.createElement("a");
            link.href = url;
            link.download = fileName; // Force download name
            document.body.appendChild(link);
            link.click();

            //clean up
            URL.revokeObjectURL(url);
            document.body.removeChild(link);
        } catch (error) {
            console.log(`Error: ${error}`);
        }
    }

    function handleNameChange(e: React.ChangeEvent<HTMLInputElement>) {
        setFileName(`${e.target.value}.json`);
    }

    return (
        <div className="min-h-screen bg-blue-50 p-6">
            {/* Back Button */}
            <div
                onClick={() => navigate("/edit-cards/home")}
                className="hover:cursor-pointer text-white hover:text-stone-300 bg-blue-600 font-semibold p-3 transition-colors duration-200 w-28 text-center rounded-md shadow-md"
            >
                Back
            </div>

            {/* Main Content */}
            <div className="flex flex-col items-center justify-center mt-10">
                {/* File Name Input Section */}
                <div className="bg-white shadow-lg rounded-lg p-6 w-96">
                    <div className="text-blue-800 text-lg font-semibold mb-4">
                        New File Name:
                    </div>
                    <input
                        defaultValue={"NewQuestions"}
                        type="text"
                        onChange={handleNameChange}
                        className="border-2 border-blue-200 rounded-md w-full p-2 focus:border-blue-600 focus:outline-none"
                        placeholder="Enter file name"
                    />
                </div>

                {/* Download Button */}
                <div
                    onClick={handleDownload}
                    className="hover:cursor-pointer text-white hover:text-stone-300 bg-blue-600 font-semibold p-3 transition-colors duration-200 w-28 text-center mt-6 rounded-md shadow-md"
                >
                    Download
                </div>
            </div>
        </div>
    );
}

export default SaveQuestions;
