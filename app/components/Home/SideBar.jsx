import React from "react";
import Icon from "./partials/Icon";
import { LogoSideBar } from "@/app/utils/constants";

function SideBar() {
  return (
    <div className="w-24 border-r-2 border-[#F8F0E5] h-screen py-3 hidden md:block ">
      <div className=" flex flex-col gap-5 items-center justify-center cursor-pointer h-full">
        {LogoSideBar.map((item, index) => (
          <Icon key={index} svg={item.image} path={item.path} />
        ))}
      </div>
    </div>
  );
}

export default SideBar;
