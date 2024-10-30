"use client";
import React from "react";
import animationData from "../public/lottery.json";
import Lottie from "react-lottie";
import WinnerList from "./WinnerList";

const Landing = () => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  return (
    <div>
      <div className="p-6 flex items-center justify-between shadow-xl px-28">
        <p className="text-blue-900 font-bold text-2xl">Lottery Dapp</p>

        {/* <p className="font-semibold">
          Hey User, {textShortner(currentAccount)}
        </p> */}
        <button
          // onClick={connectWallet}
          className="text-white bg-blue-500 font-semibold px-6 py-3 rounded-full hover:bg-blue-600 transition-all duration-200"
        >
          Connect Wallet
        </button>
      </div>
      <div>
        <Lottie options={defaultOptions} height={300} width={300} />
      </div>
      <div className="flex justify-center items-center h-full py-10 gap-10">
        <button
          // onClick={connectWallet}
          className="text-white bg-blue-500 font-semibold px-10 py-3 rounded-md hover:bg-blue-600 transition-all duration-200"
        >
          Buy Lottery
        </button>
        <button
          // onClick={connectWallet}
          className="text-white bg-blue-500 font-semibold px-10 py-3 rounded-md hover:bg-blue-600 transition-all duration-200"
        >
          Check Results
        </button>
      </div>
      <WinnerList />
    </div>
  );
};

export default Landing;
