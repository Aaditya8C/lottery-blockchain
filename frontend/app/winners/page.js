import DashboardComp from "@/components/DashboardComp";
import Landing from "@/components/Landing";
import Navbar from "@/components/Navbar";
import Winners from "@/components/Winners";
import React from "react";

const page = () => {
  return (
    <div>
      <Navbar />
      <Winners />
    </div>
  );
};

export default page;
