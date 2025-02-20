import { useNavigate } from "react-router-dom";

interface HomeTopMenuProps {
    handleResetQuestionsStatus: Function;
    setTrigerReset: Function;
}

function HomeTopMenu({
    handleResetQuestionsStatus,
    setTrigerReset,
}: HomeTopMenuProps) {
    const navigate = useNavigate();
    return (
        <div className="flex flex-row justify-between bg-blue-600 text-white shadow-lg rounded-lg p-4">
            <div
                onClick={() => navigate("/edit-cards/home")}
                className="hover:cursor-pointer mx-4 text-lg font-semibold hover:text-blue-200 transition-colors duration-200"
            >
                Edit Cards
            </div>
            <div
                onClick={() => {
                    handleResetQuestionsStatus();
                    setTrigerReset(true);
                }}
                className="hover:cursor-pointer mx-4 text-lg font-semibold hover:text-blue-200 transition-colors duration-200"
            >
                Restart
            </div>
        </div>
    );
}

export default HomeTopMenu;