import React, { Fragment, useState } from "react";
import CAMELIA from "./logo.png";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { NavLink } from "react-router-dom";
import { adminSidebar } from "../../utils/menu/Menu";

const isNotActiveStyle =
  "flex items-center px-5 gap-3 text-text2 hover:text-primary transition-all duration-200 ease-in-out capitalize  py-2 my-1";
const isActiveStyle =
  "svg: flex items-center bg-primary bg-opacity-20 px-5 gap-3 text-primary font-bold hover:text-primary  transition-all duration-200 ease-in-out capitalize hover:bg-gray-200  py-2 my-1";

const Sidebar = () => {
  const [actived, setActived] = useState([]);

  const handleShowTabs = (tabID) => {
    if (actived.some((el) => el === tabID))
      setActived((prev) => prev.filter((el) => el !== tabID));
    else setActived((prev) => [...prev, tabID]);
  };

  return (
    <div className="w-[268px]  overflow-auto  bg-[#fff] self-start sticky top-0 shadow-md">
      <div
        className="pt-4 ml-1 space-y-8 bg-[#fff] fixed  "
        style={{ width: "inherit", height: "-webkit-fill-available" }}
      >
        <div>
          <img src={CAMELIA} alt="" className="h-[50px] mx-auto mb-3" />
        </div>

        <div>
          {adminSidebar.map((el) => (
            <Fragment key={el.id}>
              {el.type === "SINGLE" && (
                <NavLink
                  to={el.path}
                  className={({ isActive }) =>
                    isActive ? isActiveStyle : isNotActiveStyle
                  }
                >
                  <span>{el.icon}</span>
                  <span>{el.text}</span>
                </NavLink>
              )}
              {el.type === "PARENT" && (
                <div onClick={() => handleShowTabs(+el.id)}>
                  <div className={`${isNotActiveStyle} justify-between`}>
                    <div className="flex gap-x-3">
                      <span>{el.icon}</span>
                      <span>{el.text}</span>
                    </div>

                    <div>
                      {actived.some((id) => id === +el.id) ? (
                        <ArrowRightIcon />
                      ) : (
                        <ArrowDropDownIcon />
                      )}
                    </div>
                  </div>
                  {actived.some((id) => +id === +el.id) && (
                    <div className="flex flex-col">
                      {el.submenu.map((item) => (
                        <NavLink
                          key={item.text}
                          to={item.path}
                          onClick={(e) => {
                            e.stopPropagation();
                          }}
                          className={({ isActive }) =>
                            isActive
                              ? "svg: flex items-center bg-primary bg-opacity-20 px-5 gap-3 text-primary font-bold hover:text-primary  transition-all duration-200 ease-in-out capitalize hover:bg-gray-200  py-2 my-1 pl-10"
                              : "flex items-center px-5 gap-3 text-icon-color hover:text-primary transition-all duration-200 ease-in-out capitalize  py-2 my-1 pl-10"
                          }
                        >
                          {item.text}
                        </NavLink>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </Fragment>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
