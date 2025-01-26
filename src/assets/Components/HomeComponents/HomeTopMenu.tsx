function HomeTopMenu() {
    return (
        <div className="flex flex-row justify-between border-black border-3 h-10 rounded-md">
            <div
                onClick={() => console.log("Clicked")}
                className="hover:cursor-pointer mx-20 text-xl font-semibold"
            >
                Edit Cards
            </div>
            <div
                onClick={() => console.log("Restarting..")}
                className="hover:cursor-pointer mx-20 text-xl font-semibold"
            >
                Restart
            </div>
        </div>
    );
}

export default HomeTopMenu;
