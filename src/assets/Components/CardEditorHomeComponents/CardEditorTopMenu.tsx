import { useNavigate } from "react-router-dom";

function CardEditorTopMenu() {
    const navigate = useNavigate();

    return (
        <div>
            <div className="flex flex-row justify-between border-black border-3 h-10 rounded-md">
                <div
                    className="hover:cursor-pointer mx-10 text-xl font-semibold"
                    onClick={() => navigate("/")}
                >
                    Home
                </div>
                <div className="flex flex-row justify-between">
                    <div className="hover:cursor-pointer mx-10 text-xl font-semibold">
                        BYOQ
                    </div>
                    <div className="hover:cursor-pointer mx-10 text-xl font-semibold">
                        Load
                    </div>
                    <div className="hover:cursor-pointer mx-10 text-xl font-semibold">
                        AI
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CardEditorTopMenu;
