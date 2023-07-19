import React from "react";
import Sidebar from "./SideBar";
import Header from "./Header";
import Body from "./Body";

const AdminHome = () => {
  return (
    <div className="flex">
      <div className="h-screen overflow-y-hidden bg-[#ffffff] shadow-[10px_10px_20px_rgba(218,_213,_213,_0.15)]">
        <Sidebar></Sidebar>
      </div>
      <div className="flex flex-col flex-auto bg-lite">
        <Header />
        <Body />
      </div>
    </div>
  );
};

export default AdminHome;
