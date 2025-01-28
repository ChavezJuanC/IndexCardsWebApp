import React, { useState } from "react";

// Define the type for the form data
type FormData = {
    questionField: string;
    answerField: string;
};

const NewCardForm: React.FC = () => {
    const [formData, setFormData] = useState<FormData>({
        questionField: "",
        answerField: "",
    });

    const handletextareaChange = (
        e: React.ChangeEvent<HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    // Handle form submission
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log("Form Data Submitted:", formData);
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label htmlFor="questionField">Question:</label>
                <textarea
                    id="questionField"
                    name="questionField"
                    value={formData.questionField}
                    onChange={handletextareaChange}
                    className="border-1 border-black w-full resize-none"
                    rows={2}
                    required
                />
            </div>
            <div>
                <label htmlFor="answerField">Answer:</label>
                <textarea
                    id="answerField"
                    name="answerField"
                    value={formData.answerField}
                    onChange={handletextareaChange}
                    className="border-1 border-black w-full resize-none"
                    rows={2}
                    required
                />
            </div>
            <div className="flex justify-end mt-2">
                <button type="submit" className="border-2 rounded-md px-2">
                    New Question
                </button>
            </div>
        </form>
    );
};

export default NewCardForm;
