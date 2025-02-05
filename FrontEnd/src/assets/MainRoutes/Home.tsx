import { useEffect, useState } from "react";
import HomeTopMenu from "../Components/HomeComponents/HomeTopMenu";
import {
    QuestionAnswerType,
    UpdateQuestionsList,
} from "../../HelperFunctions/ApiCalls";

function Home() {
    const [questionList, setQuestionList] = useState<QuestionAnswerType[]>();

    useEffect(() => {
        async function getLatestQuestions() {
            const questoions = await UpdateQuestionsList();
            setQuestionList(questoions);
        }

        getLatestQuestions();
        console.log(questionList);
    }, []);
    return (
        <>
            <div className="hidden xl:flex flex-col mt-22 h-full">
                <div className="mx-auto w-3/4">
                    <HomeTopMenu />
                </div>
                {/* Index card space 
                --fetch cards from home....DONE
                --create index card area component with props for QuestionAnswerType.. + state + controls comp
                --feed the index cards area the list of cards... 
                --cycle through the cards.. keeping track of current index..
                --when the state changes.. send a post request by id -> questionBody .. and set stateful var to new status.. use returned body and update stateful list at question index.. 
                */}
            </div>
            <div className="block xl:hidden">Please Extend Browser Size</div>
        </>
    );
}

export default Home;
