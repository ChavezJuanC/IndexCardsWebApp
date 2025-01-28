import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./assets/MainRoutes/Home";
import CardEditorHome from "./assets/MainRoutes/CardEditorHome";

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/edit-cards/home" element={<CardEditorHome />} />
            </Routes>
        </Router>
    );
}

export default App;
