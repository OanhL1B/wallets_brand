import "./index.scss";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import ProductDetail from "./pages/ProductDetail";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import Cart from "./pages/CartPage";
import Checkout from "./pages/Checkout";
import UserOrder from "./pages/UserOrder";
import SuccessPage from "./pages/SuccessPage";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import ProfilePage from "./pages/ProfilePage";
import Payment from "./pages/Payment";
import Product_Category from "./pages/Product_Category";
import SuccessOnline from "./pages/SuccessOnline";
function App() {
  return (
    <Routes>
      <Route exact path="/" element={<Home />} />
      <Route path="/product/:productId" element={<ProductDetail />}></Route>
      <Route path="/cart" element={<Cart />}></Route>
      <Route path="/checkout" element={<Checkout />}></Route>
      <Route path="/user-order" element={<UserOrder />}></Route>
      <Route path="/success" element={<SuccessPage />}></Route>
      <Route path="/login" element={<LoginPage />}></Route>
      <Route path="/sign-up" element={<SignUpPage />}></Route>
      <Route path="/forgot-password" element={<ForgotPassword />}></Route>
      <Route
        path="/forgot-password/api/user/reset-password/:token"
        element={<ResetPassword />}
      ></Route>
      <Route path="/profile" element={<ProfilePage />}></Route>
      <Route path="/payment" element={<Payment />}></Route>
      <Route
        path="/collections/:categoryId"
        element={<Product_Category />}
      ></Route>
      <Route path="/success_online" element={<SuccessOnline />}></Route>
    </Routes>
  );
}

export default App;
