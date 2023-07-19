import React from "react";
import { Avatar } from "@mui/material";

const Body = () => {
  return (
    <div className="mx-2 mt-10 item-center ">
      <div className="items-center justify-center space-y-5">
        <div className="w-[1114px] h-[568px] py-8  text-center justify-center bg-primary bg-opacity-10 border rounded-md  shadow-md mx-auto flex   gap-x-10">
          <div className="w-[220px] h-[220px] bg-[#DDDEEE] bg-opacity-50 rounded-full">
            <Avatar
              src="https://t1.gstatic.com/licensed-image?q=tbn:ANd9GcRRv9ICxXjK-LVFv-lKRId6gB45BFoNCLsZ4dk7bZpYGblPLPG-9aYss0Z0wt2PmWDb"
              style={{ width: 220, height: 220 }}
            />
          </div>
          <div
            className="flex flex-row font-sans gap-x-3 "
            style={{ alignItems: "baseline" }}
          >
            <div
              className="flex flex-col font-sans gap-y-5"
              style={{ width: "130px", textAlign: "left" }}
            >
              <span className="font-sans">firstName</span>
              <span className="font-sans">lastName</span>
              <span className="font-sans">email</span>
              <span className="font-sans">SEX</span>
              <span className="font-sans">phoneNumber</span>
              <span className="font-sans">Address</span>
              <span className="font-sans">Email</span>
            </div>
            {/* <div
              className="flex flex-col gap-y-5"
              style={{ width: "250px", textAlign: "left" }}
            >
              <span>{students?.maSv}</span>
              <span>
                {students?.ho} {students?.ten}
              </span>
              <span>{students?.phai}</span>
              <span>{ngaySinh}</span>
              <span>{students?.noiSinh}</span>
              <span>{students?.diaChi}</span>
              <span>{students?.sdt}</span>
              <span>{students?.email}</span>
              <span>{nameUnit}</span>
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Body;
