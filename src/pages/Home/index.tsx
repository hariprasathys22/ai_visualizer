import React, { useState } from "react";
import Sidebar from "../../sections/Sidebar";
import "./index.css";
import RightSection from "../../sections/RightSection";

const Home:React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  return (
    <div className="w-full h-screen bg-layout flex">
      <div className={`${collapsed ? "md:w-auto" : "md:w-[270px]"} w-full h-full`}>
        <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} />
      </div>
      <div className={`w-full h-full py-4 ${collapsed ? "pl-2 pr-4" : "px-4"}`}>
        <RightSection />
      </div>
    </div>
  );
};

export default Home;
