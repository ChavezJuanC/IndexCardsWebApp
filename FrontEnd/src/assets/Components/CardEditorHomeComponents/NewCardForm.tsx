import React, { useState } from "react";
import {
    PostNewQuestion,
    QuestionAnswerType,
    UpdateQuestionsList,
} from "../../../HelperFunctions/ApiCalls";

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

    const [formKey, setFormKey] = useState<number>(0);

    const handletextareaChange = (
        e: React.ChangeEvent<HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const data: QuestionAnswerType = {
            id: 0,
            question: formData.questionField,
            answer: formData.answerField,
            status: "unanswered",
        };
        await PostNewQuestion(data);
        console.log("Form Data Submitted:", formData);
        const updatedQuestions = await UpdateQuestionsList();
        setQuestionList(updatedQuestions);
        setFormData({
            questionField: "",
            answerField: "",
        });
        setFormKey(formKey + 1);
    };

    return (
        <form onSubmit={handleSubmit} key={formKey} className="bg-white shadow-lg rounded-lg p-6">
            <div className="mb-4">
                <label htmlFor="questionField" className="block text-blue-800 font-semibold mb-2">
                    Question:
                </label>
                <textarea
                    id="questionField"
                    name="questionField"
                    value={formData.questionField}
                    onChange={handletextareaChange}
                    className="border-2 border-blue-200 rounded-md w-full resize-y p-2 focus:border-blue-600 focus:outline-none"
                    rows={4}
                    required
                />
            </div>
            <div className="mb-4">
                <label htmlFor="answerField" className="block text-blue-800 font-semibold mb-2">
                    Answer:
                </label>
                <textarea
                    id="answerField"
                    name="answerField"
                    value={formData.answerField}
                    onChange={handletextareaChange}
                    className="border-2 border-blue-200 rounded-md w-full resize-y p-2 focus:border-blue-600 focus:outline-none"
                    rows={4}
                    required
                />
            </div>
            <div className="flex justify-end mt-2">
                <button
                    type="submit"
                    className="border-2 border-blue-600 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors duration-200"
                >
                    New Question
                </button>
            </div>
        </form>
    );
};

export default NewCardForm;