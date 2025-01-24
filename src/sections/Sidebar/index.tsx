import React from "react";
import { APPCONSTANTS } from "../../utilities/AppConstants";
import { VscThreeBars } from "react-icons/vsc";

const Sidebar = () => {
  return (
    <div className="w-full h-screen py-8 px-6">
      <div className="flex flex-col justify-between h-full">
        <div className="text-secondary">
          <div className="flex justify-between w-full items-center">
            <div className="flex items-center gap-3">
              <img
                src={APPCONSTANTS.HOME.logo}
                className="w-8 h-8 rounded-full"
                alt="logo"
              />
              <p className="font-[600] text-[18px]">QueryGenius</p>
            </div>
            <VscThreeBars className="text-[20px] mt-1" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
