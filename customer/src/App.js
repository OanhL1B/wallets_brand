import "./index.scss";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
function App() {
  return (
    <Routes>
      <Route exact path="/" element={<Home />} />
      {/* <Route path="/products/:category"><ProductList /></Route>
      <Route path="/product/:id"><Product /></Route>
      <Route path="/cart"><Cart /></Route>
      <Route path="/success"><Success /></Route>
      <Route path="/login">{user ? <Redirect to="/" /> : <Login />}</Route>
      <Route path="/register">
        {user ? <Redirect to="/" /> : <Register />}
      </Route> */}
    </Routes>
  );
}

export default App;
