import { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Catalog from "./components/catalog/Catalog";
import "./reset.css";
import CreateQuiz from "./components/createQuiz/CreateQuiz";
import Login from "./components/login/Login";
import Register from "./components/register/Register";

const PrivateRoute = ({ element }) => {
  const isAuthenticated = localStorage.getItem("token");
  return isAuthenticated ? element : <Navigate to="/login" />;
};

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<PrivateRoute element={<Catalog />} />} />
        <Route path="/create-quiz" element={<PrivateRoute element={<CreateQuiz />} />} />
      </Routes>
    </Router>
  );
}

export default App;



