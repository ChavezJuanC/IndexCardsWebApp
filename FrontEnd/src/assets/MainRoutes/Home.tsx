import { useEffect, useState } from "react";
import HomeTopMenu from "../Components/HomeComponents/HomeTopMenu";
import {
    QuestionAnswerType,
    UpdateQuestionsList,
    ResetQuestionsStatus,
} from "../../HelperFunctions/ApiCalls";
import IndexCardsArea from "../Components/HomeComponents/IndexCardsArea";

function Home() {
    const [questionList, setQuestionList] = useState<QuestionAnswerType[]>([]);
    const [trigerReset, setTrigerReset] = useState<boolean>(false);

    useEffect(() => {
        async function getLatestQuestions() {
            const questoions = await UpdateQuestionsList();
            setQuestionList(questoions);
        }
        getLatestQuestions();
    }, []);

    async function handleResetQuestionsStatus() {
        const questions = await ResetQuestionsStatus();
        setQuestionList(questions);
    }

    return (
        <>
            <div className="hidden xl:flex flex-col mt-22 h-full">
                <div className="mx-auto w-3/4">
                    <HomeTopMenu
                        handleResetQuestionsStatus={handleResetQuestionsStatus}
                        setTrigerReset={setTrigerReset}
                    />
                </div>
                <IndexCardsArea
                    questions={questionList}
                    setQuestionList={setQuestionList}
                    trigerReset={trigerReset}
                    setTrigerReset={setTrigerReset}
                />
            </div>
            <div className="block xl:hidden">Please Extend Browser Size</div>
        </>
    );
}

export default Home;
