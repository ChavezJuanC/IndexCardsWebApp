import React, { useEffect, useState } from "react";
import { generateQuestions } from "../../../../HelperFunctions/AICalls";
import {
    QuestionAnswerType,
    ReplaceAllQuestions,
} from "../../../../HelperFunctions/ApiCalls";
import { useNavigate } from "react-router-dom";

interface QuestionGenerationForm {
    theme: string;
    difficulty: number;
    questionCount: number;
    language: string;
}

function AIQuestions() {
    const [formData, setFormData] = useState<QuestionGenerationForm>({
        theme: "",
        difficulty: 1,
        questionCount: 1,
        language: "",
    });

    const [isGenerating, setIsGenerating] = useState<boolean>(false);

    const navigate = useNavigate();

    useEffect(() => {
        console.log("Page Reload");
    }, [isGenerating]);

    async function handleQuestionsFileUpdate(questions: QuestionAnswerType[]) {
        try {
            await ReplaceAllQuestions(questions);
        } catch (error) {
            console.error("Error updating questions file:", error);
            setIsGenerating(false);
        }
    }

    async function handleGenerateQuestions(
        e: React.FormEvent<HTMLFormElement>
    ) {
        e.preventDefault();
        setIsGenerating(true);
        console.log("Generating Questions...");
        const questions: QuestionAnswerType[] = await generateQuestions(
            formData.theme,
            formData.difficulty,
            formData.questionCount,
            formData.language
        );
        await handleQuestionsFileUpdate(questions);
        setIsGenerating(false);
        navigate("/edit-cards/home");
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    return (
        <div className="min-h-screen bg-blue-50 p-6">
            {/* Back Button */}
            <button
                onClick={() => navigate("/edit-cards/home")}
                className={
                    "hover:cursor-pointer text-white hover:text-stone-300 bg-blue-600 font-semibold p-3 transition-colors duration-200 w-28 text-center rounded-md shadow-md mb-6 disabled:bg-blue-400 disabled:hover:bg-blue-400"
                }
                disabled={isGenerating}
            >
                Back
            </button>

            {/* Main Content */}
            <div className="bg-white shadow-lg rounded-lg p-6 max-w-2xl mx-auto">
                {/* Title */}
                <div className="text-blue-800 text-2xl font-bold mb-6 text-center">
                    Generate Questions
                </div>

                {/* Form */}
                <form onSubmit={handleGenerateQuestions} className="space-y-6">
                    {/* Theme Input */}
                    <div>
                        <label
                            htmlFor="theme"
                            className="block text-blue-800 font-semibold mb-2"
                        >
                            Theme:
                        </label>
                        <input
                            type="text"
                            id="theme"
                            name="theme"
                            value={formData.theme}
                            onChange={handleChange}
                            className="border-2 border-blue-200 rounded-md w-full p-2 focus:border-blue-600 focus:outline-none"
                            placeholder="Enter a theme"
                            required
                        />
                    </div>

                    {/* Difficulty Input */}
                    <div>
                        <label
                            htmlFor="difficulty"
                            className="block text-blue-800 font-semibold mb-2"
                        >
                            Difficulty (1-5):
                        </label>
                        <input
                            type="number"
                            id="difficulty"
                            name="difficulty"
                            value={formData.difficulty}
                            onChange={handleChange}
                            min="1"
                            max="5"
                            className="border-2 border-blue-200 rounded-md w-full p-2 focus:border-blue-600 focus:outline-none"
                            required
                        />
                    </div>

                    {/* Number of Questions Input */}
                    <div>
                        <label
                            htmlFor="questionCount"
                            className="block text-blue-800 font-semibold mb-2"
                        >
                            Number of Questions (1-25):
                        </label>
                        <input
                            type="number"
                            id="questionCount"
                            name="questionCount"
                            value={formData.questionCount}
                            onChange={handleChange}
                            min="1"
                            max="25"
                            className="border-2 border-blue-200 rounded-md w-full p-2 focus:border-blue-600 focus:outline-none"
                            required
                        />
                    </div>

                    {/* Language Input */}
                    <div>
                        <label
                            htmlFor="language"
                            className="block text-blue-800 font-semibold mb-2"
                        >
                            Language:
                        </label>
                        <input
                            type="text"
                            id="language"
                            name="language"
                            value={formData.language}
                            onChange={handleChange}
                            className="border-2 border-blue-200 rounded-md w-full p-2 focus:border-blue-600 focus:outline-none"
                            placeholder="Enter a language"
                            required
                        />
                    </div>

                    {/* Generate Button */}
                    <div className="flex justify-center">
                        <button
                            disabled={isGenerating}
                            id="generateButton"
                            type="submit"
                            className="bg-blue-600 text-white font-semibold px-6 py-2 rounded-md hover:bg-blue-700 transition-colors duration-200 shadow-md disabled:bg-blue-400 disabled:hover:bg-blue-400"
                        >
                            {isGenerating ? <>Generating...</> : <>Generate</>}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default AIQuestions;
