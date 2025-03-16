import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Catalog from "./components/catalog/Catalog";
import "./reset.css";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Catalog />} />
      </Routes>
    </Router>
  );
}

export default App;

