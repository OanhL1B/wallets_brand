import React from "react";
import Sidebar from "./SideBar";
import Header from "./Header";
import Body from "./Body";

const AdminHome = () => {
  return (
    <div className="flex">
      <div className="h-screen overflow-y-hidden bg-[#fff] sticky top-0 overflow-auto">
        <Sidebar />
      </div>
      <div className="flex flex-col flex-auto overflow-auto bg-lite">
        <Header />
        <Body />
      </div>
    </div>
  );
};

export default AdminHome;
