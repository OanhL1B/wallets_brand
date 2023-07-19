import { Route, Routes } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import AdminHome from "./pages/adminPage/AdminHome";
import "./index.css";
import Profile from "./pages/adminPage/profile/Profile";
import Category from "./pages/adminPage/category/Category";
import AddCategory from "./pages/adminPage/addcategory/AddCategory";
function App() {
  return (
    <Routes>
      <Route exact path="/" element={<LoginPage />} />
      <Route path="/dashboard" element={<AdminHome />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/manage-category" element={<Category />} />
      <Route path="/add-category" element={<AddCategory />} />
    </Routes>
  );
}

export default App;
