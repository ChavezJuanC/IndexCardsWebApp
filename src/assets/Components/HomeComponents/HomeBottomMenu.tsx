function HomeBottomMenu() {
    return (
        <div className="flex flex-row justify-between border-2 border-black h-10 rounded-md">
            <div className="flex">
                <div className="hover:cursor-pointer mx-8 text-xl font-semibold">
                    Correct
                </div>
                <div className="hover:cursor-pointer mx-8 text-xl font-semibold">
                    Incorrect
                </div>
            </div>
            <div className="flex">
                <div className="hover:cursor-pointer mx-8 text-xl font-semibold">
                    Next
                </div>
                <div className="hover:cursor-pointer mx-8 text-xl font-semibold">
                    Previous
                </div>
            </div>
        </div>
    );
}

export default HomeBottomMenu;
