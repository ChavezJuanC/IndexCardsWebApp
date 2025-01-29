import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./assets/MainRoutes/Home";
import CardEditorHome from "./assets/MainRoutes/CardEditorHome";
import BYOQ from "./assets/Components/CardEditorHomeComponents/SubRoutes/BYOQ";
import LoadQuestion from "./assets/Components/CardEditorHomeComponents/SubRoutes/LoadQuestion";
import AIQuestions from "./assets/Components/CardEditorHomeComponents/SubRoutes/AIQuestions";

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/edit-cards/home" element={<CardEditorHome />} />
                <Route path="/edit-cards/byoq" element={<BYOQ />} />
                <Route path="/edit-cards/load" element={<LoadQuestion />} />
                <Route path="/edit-cards/ai" element={<AIQuestions />} />
            </Routes>
        </Router>
    );
}

export default App;
