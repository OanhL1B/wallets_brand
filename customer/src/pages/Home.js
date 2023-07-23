import React, { Fragment } from "react";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import Status from "../components/Status";
import Footer from "../components/Footer";
import IngNar from "../components/IngNar";

const Home = () => {
  return (
    <div className="">
      <Header />
      {/* <IconBar /> */}
      <Sidebar />
      <Status />
      <IngNar />
      <Footer />
    </div>
  );
};

export default Home;
