import "./index.scss";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import ProductDetail from "./pages/ProductDetail";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
function App() {
  return (
    <Routes>
      <Route exact path="/" element={<Home />} />
      {/* <Route path="/products/:category"><ProductList /></Route> */}
      <Route path="/product/:productId" element={<ProductDetail />}></Route>
      {/* <Route path="/cart"><Cart /></Route> */}
      {/* <Route path="/success"><Success /></Route> */}
      {/* <Route path="/login">{user ? <Redirect to="/" /> : <Login />}</Route> */}
      <Route path="/login" element={<LoginPage />}></Route>
      <Route path="/sign-up" element={<SignUpPage />}></Route>

      {/* <Route path="/register">
        {user ? <Redirect to="/" /> : <Register />}
      </Route> */}
    </Routes>
  );
}

export default App;
