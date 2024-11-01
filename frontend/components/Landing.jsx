"use client";
import React, { useContext, useEffect } from "react";
import animationData from "../public/lottery.json";
import Lottie from "react-lottie";
import WinnerList from "./Participants";
import { TransactionContext } from "./context";
import { ethers } from "ethers";
import { contractAddress, contractAbi } from "./utils/constants";
import Participants from "./Participants";
import Winners from "./Winners";
import { useWinnerStore } from "@/store/winnerStore";

const Landing = () => {
  const context = useContext(TransactionContext);

  const {
    connectWallet,
    currentAccount,
    sendTransaction,
    fetchParticipants,
    participants,
    fetchContractDetails,
    isOwner,
    isLotteryOpen,
    revealWinners,
    openLottery,
    closeLottery,
  } = context;

  // Lottie animation settings
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: { preserveAspectRatio: "xMidYMid slice" },
  };

  // Fetch contract owner and lottery status
  useEffect(() => {
    if (currentAccount) {
      fetchContractDetails();
    }
  }, [currentAccount]);

  useEffect(() => {
    fetchParticipants();
  }, [participants]);
  useEffect(() => {}, [isLotteryOpen]);
  const { winners, setWinners } = useWinnerStore();
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
        {isOwner && !isLotteryOpen && (
          <button
            onClick={openLottery}
            className="text-white bg-green-500 font-semibold px-10 py-3 rounded-md hover:bg-green-600 transition-all duration-200"
          >
            Open Lottery
          </button>
        )}

        {!isLotteryOpen && !isOwner && (
          <p className="text-lg font-semibold">
            Wait for the lottery to be opened
          </p>
        )}

        {isLotteryOpen && (
          <>
            <button
              onClick={sendTransaction}
              className="text-white bg-blue-500 font-semibold px-10 py-3 rounded-md hover:bg-blue-600 transition-all duration-200"
            >
              Buy Lottery
            </button>

            {isOwner && (
              <button
                onClick={revealWinners}
                className="text-white bg-red-500 font-semibold px-10 py-3 rounded-md hover:bg-red-600 transition-all duration-200"
              >
                Reveal Winners
              </button>
            )}
            {isOwner && (
              <button
                onClick={() => {
                  closeLottery();
                  setWinners({ first: "", second: "", third: "" });
                }} // Close lottery button
                className="text-white bg-yellow-500 font-semibold px-10 py-3 rounded-md hover:bg-yellow-600 transition-all duration-200"
              >
                Close Lottery
              </button>
            )}
          </>
        )}
      </div>

      {isLotteryOpen && (
        <>
          <p className="text-xl font-semibold text-center">Participants</p>
          <Participants participants={participants} />
          <div className="mt-6 text-center">
            <Winners winners={winners} />
          </div>
        </>
      )}
    </div>
  );
};

export default Landing;
