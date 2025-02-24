import { useNavigate } from "react-router-dom";

function CardEditorTopMenu() {
    const navigate = useNavigate();

    return (
        <div className="flex flex-row justify-between bg-blue-600 text-white shadow-lg rounded-lg p-4">
            <div
                className="hover:cursor-pointer mx-4 text-lg font-semibold hover:text-blue-200 transition-colors duration-200"
                onClick={() => navigate("/")}
            >
                Home
            </div>
            <div className="flex flex-row justify-between">
                <div
                    className="hover:cursor-pointer mx-4 text-lg font-semibold hover:text-blue-200 transition-colors duration-200"
                    onClick={() => navigate("/edit-cards/load")}
                >
                    Upload Questions
                </div>
                <div
                    className="hover:cursor-pointer mx-4 text-lg font-semibold hover:text-blue-200 transition-colors duration-200"
                    onClick={() => navigate("/edit-cards/ai")}
                >
                    Genarete with AI
                </div>
            </div>
        </div>
    );
}

export default CardEditorTopMenu;