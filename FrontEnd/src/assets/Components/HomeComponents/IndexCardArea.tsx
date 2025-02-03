import IndexCard from "./IndexCard";
import { QuestionAnswerType } from "../../../HelperFunctions/ApiCalls";

interface IndexCardAreaProps {
    currentCard: QuestionAnswerType;
}

//use this are to feed the index card values....
function IndexCardArea({ currentCard }: IndexCardAreaProps) {
    return (
        <div className="border-2 border-black w-2/5 h-96 mx-auto rounded-md">
            <IndexCard
                question={currentCard.question}
                answer={currentCard.question}
            />
        </div>
    );
}

export default IndexCardArea;
