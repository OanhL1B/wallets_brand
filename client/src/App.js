import { Route, Routes } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import AdminHome from "./pages/adminPage/AdminHome";
import "./index.css";
function App() {
  return (
    <Routes>
      <Route exact path="/" element={<LoginPage />} />
      <Route path="/dashboard" element={<AdminHome />} />
    </Routes>
  );
}

export default App;
