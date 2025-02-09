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
        <div className="flex flex-row justify-between border-black border-3 h-10 rounded-md">
            <div
                onClick={() => navigate("/edit-cards/home")}
                className="hover:cursor-pointer mx-20 text-xl font-semibold"
            >
                Edit Cards
            </div>
            <div
                onClick={() => {
                    handleResetQuestionsStatus();
                    setTrigerReset(true);
                }}
                className="hover:cursor-pointer mx-20 text-xl font-semibold"
            >
                Restart
            </div>
        </div>
    );
}

export default HomeTopMenu;
