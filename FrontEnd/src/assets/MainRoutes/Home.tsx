import { useEffect, useState } from "react";
import HomeTopMenu from "../Components/HomeComponents/HomeTopMenu";
import {
    QuestionAnswerType,
    UpdateQuestionsList,
} from "../../HelperFunctions/ApiCalls";
import IndexCardsArea from "../Components/HomeComponents/IndexCardsArea";

function Home() {
    const [questionList, setQuestionList] = useState<QuestionAnswerType[]>([]);

    useEffect(() => {
        async function getLatestQuestions() {
            const questoions = await UpdateQuestionsList();
            setQuestionList(questoions);
        }
        getLatestQuestions();
    }, []);
    
    return (
        <>
            <div className="hidden xl:flex flex-col mt-22 h-full">
                <div className="mx-auto w-3/4">
                    <HomeTopMenu />
                </div>
                {/* Index card space 
                --fetch cards from home....DONE
                */}
                <IndexCardsArea
                    questions={questionList}
                    setQuestionList={setQuestionList}
                />
            </div>
            <div className="block xl:hidden">Please Extend Browser Size</div>
        </>
    );
}

export default Home;
