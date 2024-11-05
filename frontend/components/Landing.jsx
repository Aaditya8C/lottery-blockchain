"use client";
import React from "react";
import animationData from "../public/lottery.json";
import Lottie from "react-lottie";

const Landing = () => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: { preserveAspectRatio: "xMidYMid slice" },
  };
  return (
    <div className="flex flex-col justify-center items-center ">
      <div>
        <Lottie options={defaultOptions} height={400} width={400} />
      </div>
      <div className="text-white">
        <button className="px-8 py-3 bg-cyan-700 rounded-full">
          Connect Wallet
        </button>
      </div>
    </div>
  );
};

export default Landing;
