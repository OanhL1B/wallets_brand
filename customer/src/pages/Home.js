import React from "react";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import Status from "../components/Status";
import Footer from "../components/Footer";
import IngNar from "../components/IngNar";
import Products from "../components/Products";

const Home = () => {
  return (
    <div>
      <Header />
      <Sidebar />
      <Status />
      <Products />
      <IngNar />
      <Footer />
    </div>
  );
};

export default Home;
