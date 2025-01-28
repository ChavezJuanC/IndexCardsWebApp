import IndexCard from "./IndexCard";

function IndexCardArea() {
    return (
        //after we have a list of questions to feed, use this space to update from default card message to actual cards..
        //using next and previous buttons cycle through cards..
        //on restart go to index 0 maybe add a shuffle feature later..
        //using correct or incorrect keep track of question index and correctness

        <div className="border-2 border-black w-2/5 h-96 mx-auto rounded-md">
            <IndexCard
                question="Please Select or Include a set of questions.."
                answer="Please Select or Include a set of questions.."
            />
        </div>
    );
}

export default IndexCardArea;
