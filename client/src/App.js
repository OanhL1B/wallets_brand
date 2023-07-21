import { Route, Routes } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import AdminHome from "./pages/adminPage/AdminHome";
import "./index.scss";
import Profile from "./pages/adminPage/profile/Profile";
import Category from "./pages/adminPage/category/Category";
import AddCategory from "./pages/adminPage/addcategory/AddCategory";
import AddPriceList from "./pages/adminPage/addpricelist/AddPriceList";
import PriceList from "./pages/adminPage/pricelist/PriceList";
import AddProduct from "./pages/adminPage/addproduct/AddProduct";
function App() {
  return (
    <Routes>
      <Route exact path="/" element={<LoginPage />} />
      <Route path="/dashboard" element={<AdminHome />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/manage-category" element={<Category />} />
      <Route path="/manage-pricelist" element={<PriceList />} />
      <Route path="/add-category" element={<AddCategory />} />
      <Route path="/add-pricelist" element={<AddPriceList />} />
      <Route path="/add-product" element={<AddProduct />} />
    </Routes>
  );
}

export default App;
