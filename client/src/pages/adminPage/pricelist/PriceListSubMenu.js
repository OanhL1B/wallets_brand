// CategorySubMenu.js
import React from "react";
import { NavLink } from "react-router-dom";
import AddIcon from "@mui/icons-material/Add";
import LibraryBooksIcon from "@mui/icons-material/LibraryBooks";

const isNotActiveStyle =
  "flex items-center px-5 gap-3 text-icon-color hover:text-primary transition-all duration-200 ease-in-out capitalize  py-2 mx-7";
const isActiveStyle =
  "svg: flex items-center  px-5 gap-3 text-primary font-bold hover:text-primary  transition-all duration-200 ease-in-out capitalize hover:bg-gray-200  py-2 my-1 mx-7";

const PriceListSubMenu = () => {
  return (
    <div className="" style={{ marginTop: 0 }}>
      <NavLink
        to="/add-pricelist"
        className={({ isActive }) =>
          isActive ? isActiveStyle : isNotActiveStyle
        }
      >
        <AddIcon />
        <h1 className="font-normal">Add PriceList</h1>
      </NavLink>
      <NavLink
        to="/manage-pricelist"
        className={({ isActive }) =>
          isActive ? isActiveStyle : isNotActiveStyle
        }
      >
        <LibraryBooksIcon />
        <h1 className="font-normal">Manager PriceList</h1>
      </NavLink>
    </div>
  );
};

export default PriceListSubMenu;