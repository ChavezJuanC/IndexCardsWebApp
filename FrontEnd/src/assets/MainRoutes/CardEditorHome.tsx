import CardEditorTopMenu from "../Components/CardEditorHomeComponents/CardEditorTopMenu";
import CardLogs from "../Components/CardEditorHomeComponents/CardLogs";
import NewCardForm from "../Components/CardEditorHomeComponents/NewCardForm";
import { useState, useEffect } from "react";

function CardEditorHome() {
    const [questionsList, setQuestionsList] = useState([]);

    const server: string = "http://127.0.0.1:8000";

    async function fetchQuestions() {
        const res = await fetch(`${server}/all-local-questions`);

        try {
            if (!res.ok) {
                throw new Error("Network Error Fetching Quesions");
            }
            const questions = await res.json();
            setQuestionsList(questions);
            console.log(questions);
        } catch (error) {
            console.log(`Error: ${error}`);
        }
    }

    useEffect(() => {
        fetchQuestions();
    }, []);

    return (
        <>
            <div className="hidden xl:flex flex-col mt-22 h-full">
                <div className="mx-auto w-3/4">
                    <CardEditorTopMenu />
                </div>
                <div className="mx-auto w-1/2 mt-10">
                    <NewCardForm />
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

/*
NEXT STEPS

-start implementing actual question creation and write to local file (temp)???
-use local file to populate question cards
-load questions from saved file....

*/
