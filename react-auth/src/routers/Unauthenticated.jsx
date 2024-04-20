import { Routes, Route } from "react-router-dom";

import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import Car from "../pages/Car";

function Unauthenticated() {
    return (
        <div className="App">
            <Routes>
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="*" element={<LoginPage />} />
                <Route path="/car" element={<Car />} />
            </Routes>
        </div>
    );
}

export default Unauthenticated;