import { useEffect, useState } from "react";
import {
    UpdateQuestionsList,
    QuestionAnswerType,
} from "../../HelperFunctions/ApiCalls";
import HomeBottomMenu from "../Components/HomeComponents/HomeBottomMenu";
import HomeTopMenu from "../Components/HomeComponents/HomeTopMenu";
import IndexCardArea from "../Components/HomeComponents/IndexCardArea";

function Home() {
    const [currentCard, setCurrectCard] = useState<QuestionAnswerType>({
        id: 1,
        question: "Click on Edit Question to edit index cards",
        answer: "Click on Edit Question to edit index cards answers",
    });
    const [questionsList, setQuestionsList] = useState<QuestionAnswerType[]>(
        []
    );
    const [currentIndex, setcurrentIndex] = useState<number>(0); // Make currentIndex part of state

    useEffect(() => {
        async function setQuestions() {
            const updatedQuestions: QuestionAnswerType[] =
                await UpdateQuestionsList();
            setQuestionsList(updatedQuestions);
            setcurrentIndex(0);
            if (updatedQuestions.length > 0) {
                setCurrectCard(updatedQuestions[0]);
            } else
                setCurrectCard({
                    id: 1,
                    question: "Click on Edit Question to edit index cards",
                    answer: "Click on Edit Question to edit index cards answers",
                });
        }
        setQuestions();
    }, []); // Effect runs once on mount

    function previousCard() {
        if (currentIndex > 0) {
            setcurrentIndex(currentIndex - 1);
        }
    }

    function nextCard() {
        if (currentIndex < questionsList.length - 1) {
            setcurrentIndex(currentIndex + 1);
        }
    }

    useEffect(() => {
        if (questionsList.length > 0) {
            setCurrectCard(questionsList[currentIndex]);
        }
    }, [currentIndex, questionsList]);

    return (
        <>
            <div className="hidden xl:flex flex-col mt-22 h-full">
                <div className="mx-auto w-3/4">
                    <HomeTopMenu />
                </div>
                <div className="mt-30 mb-30">
                    <IndexCardArea currentCard={currentCard} />
                </div>
                <div className="mx-auto w-3/4">
                    <HomeBottomMenu
                        nextCard={nextCard}
                        previousCard={previousCard}
                    />
                </div>
            </div>
            <div className="block xl:hidden">Please Extend Browser Size</div>
        </>
    );
}

export default Home;
