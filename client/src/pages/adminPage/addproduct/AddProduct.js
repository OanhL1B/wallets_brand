import React, { useEffect } from "react";
import Sidebar from "../SideBar";
import Header from "../Header";
import Body from "./Body";
import { useDispatch } from "react-redux";
import { getCategories } from "../../../redux/actions/adminActions";

const AddProduct = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getCategories());
  }, [dispatch]);
  return (
    <div className="flex">
      <div className="h-screen overflow-y-hidden bg-white shadow-2xl">
        <Sidebar></Sidebar>
      </div>
      <div className="flex flex-col flex-auto bg-lite">
        <Header />
        <Body />
      </div>
    </div>
  );
};

export default AddProduct;
