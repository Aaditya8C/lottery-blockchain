"use client";
import React, { useContext, useState } from "react";
import animationData from "../public/lottery.json";
import Lottie from "react-lottie";
import WinnerList from "./WinnerList";
import { TransactionContext } from "./context"; // import context

const Landing = () => {
  const context = useContext(TransactionContext);
  const [showWinners, setShowWinners] = useState(true);
  const [participants, setParticipants] = useState([
    {
      address: "0x1234567890abcdef1234567890abcdef12345678",
      allotted: true,
      claimStatus: "Claim",
    },
    {
      address: "0xabcdef1234567890abcdef1234567890abcdef12",
      allotted: false,
      claimStatus: "Not Claimed",
    },
    {
      address: "0x7890abcdef1234567890abcdef1234567890abcd",
      allotted: false,
      claimStatus: "Not Claimed",
    },
    {
      address: "0xabcdefabcdefabcdefabcdefabcdefabcdefabcd",
      allotted: true,
      claimStatus: "Claim",
    },
    {
      address: "0x0000000000000000000000000000000000000000",
      allotted: false,
      claimStatus: "Not Claimed",
    },
  ]);

  if (!context) {
    return <div>Error: Context not available</div>;
  }
  const {
    connectWallet,
    currentAccount,
    sendTransaction,
    fetchParticipants,
    // participants,
  } = context;

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: { preserveAspectRatio: "xMidYMid slice" },
  };

  return (
    <div>
      <div className="p-6 flex items-center justify-between shadow-xl px-28">
        <p className="text-blue-900 font-bold text-2xl">Lottery Dapp</p>
        {!currentAccount ? (
          <button
            onClick={connectWallet}
            className="text-white bg-blue-500 font-semibold px-6 py-3 rounded-full hover:bg-blue-600 transition-all duration-200"
          >
            Connect Wallet
          </button>
        ) : (
          <p className="font-semibold">Connected: {currentAccount}</p>
        )}
      </div>
      <div>
        <Lottie options={defaultOptions} height={300} width={300} />
      </div>
      <div className="flex justify-center items-center h-full py-10 gap-10">
        <button
          onClick={sendTransaction} // Buy Lottery
          className="text-white bg-blue-500 font-semibold px-10 py-3 rounded-md hover:bg-blue-600 transition-all duration-200"
        >
          Buy Lottery
        </button>
        <button
          onClick={() => {
            fetchParticipants();
            setShowWinners(true);
          }}
          className="text-white bg-blue-500 font-semibold px-10 py-3 rounded-md hover:bg-blue-600 transition-all duration-200"
        >
          Check Results
        </button>
      </div>
      {showWinners && <WinnerList participants={participants} />}
    </div>
  );
};

export default Landing;
