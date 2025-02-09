import CardEditorTopMenu from "../Components/CardEditorHomeComponents/CardEditorTopMenu";
import CardLogs from "../Components/CardEditorHomeComponents/CardLogs";
import NewCardForm from "../Components/CardEditorHomeComponents/NewCardForm";
import { useState, useEffect } from "react";
import {
    UpdateQuestionsList,
    QuestionAnswerType,
} from "../../HelperFunctions/ApiCalls";

function CardEditorHome() {
    const [questionsList, setQuestionsList] = useState<QuestionAnswerType[]>(
        []
    );

    useEffect(() => {
        async function setQuestions() {
            const updatedQuestions: QuestionAnswerType[] =
                await UpdateQuestionsList();
            setQuestionsList(updatedQuestions);
        }
        setQuestions();
    }, [questionsList.length]);

    return (
        <>
            <div className="hidden xl:flex flex-col mt-18 h-full">
                <div className="mx-auto w-3/4">
                    <CardEditorTopMenu />
                </div>
                <div className="mx-auto w-1/2 mt-10">
                    <NewCardForm setQuestionList={setQuestionsList} />
                </div>
                <div className="mt-10 mx-auto w-3/4">
                    <CardLogs
                        questions={questionsList}
                        setQuestionList={setQuestionsList}
                    />
                </div>
                <div className="h-12">{/*Spacer */}</div>
            </div>
            <div className="block xl:hidden">Please Extend Browser Size</div>
        </>
    );
}

export default CardEditorHome;
