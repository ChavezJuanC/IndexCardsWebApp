import React, { useState } from "react";
import {
    PostNewQuestion,
    QuestionAnswerType,
    UpdateQuestionsList,
} from "../../../HelperFunctions/ApiCalls";

// Define the type for the form data
interface FormData {
    questionField: string;
    answerField: string;
}

interface CardFormProps {
    setQuestionList: Function;
}

const NewCardForm = ({ setQuestionList }: CardFormProps) => {
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
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const data: QuestionAnswerType = {
            id: 0, // its okay to use 0, becuase the backend asigns the actual Id, for sure there is a better way to do this.. but this works now XD
            question: formData.questionField,
            answer: formData.answerField,
            status: "unanswered",
        };
        PostNewQuestion(data);
        console.log("Form Data Submitted:", formData);
        const updatedQuestions = await UpdateQuestionsList();
        setQuestionList(updatedQuestions);
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
