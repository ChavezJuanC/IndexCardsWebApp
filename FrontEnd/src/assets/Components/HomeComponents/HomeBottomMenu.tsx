interface HommeBottomMenuProps {
    nextCard: Function;
    previousCard: Function;
    setCorrectness: Function;
}

function HomeBottomMenu({
    nextCard,
    previousCard,
    setCorrectness,
}: HommeBottomMenuProps) {
    return (
        <div className="flex flex-row justify-between border-3 border-black h-10 rounded-md">
            <div className="flex">
                <div
                    className="hover:cursor-pointer mx-8 text-xl font-semibold"
                    onClick={() => setCorrectness(true)}
                >
                    Correct
                </div>
                <div
                    className="hover:cursor-pointer mx-8 text-xl font-semibold"
                    onClick={() => setCorrectness(false)}
                >
                    Incorrect
                </div>
            </div>
            <div className="flex">
                <div
                    className="hover:cursor-pointer mx-8 text-xl font-semibold"
                    onClick={() => previousCard()}
                >
                    Previous
                </div>
                <div
                    className="hover:cursor-pointer mx-8 text-xl font-semibold"
                    onClick={() => nextCard()}
                >
                    Next
                </div>
            </div>
        </div>
    );
}

export default HomeBottomMenu;
