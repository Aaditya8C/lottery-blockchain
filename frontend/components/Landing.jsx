"use client";
import React, { useContext, useEffect, useState } from "react";
import animationData from "../public/lottery.json";
import Lottie from "react-lottie";
import Participants from "./Participants";
import Winners from "./Winners";
import { TransactionContext } from "./context";
import { useWinnerStore } from "@/store/winnerStore";
import Modal from "./Modal";

const Landing = () => {
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
  } = useContext(TransactionContext);

  const { winners, setWinners } = useWinnerStore();

  const [isModalOpen, setIsModalOpen] = useState(false);
  // Lottie animation settings
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: { preserveAspectRatio: "xMidYMid slice" },
  };

  useEffect(() => {
    if (currentAccount) {
      fetchContractDetails();
    }
  }, [currentAccount, fetchContractDetails]);

  useEffect(() => {
    if (isLotteryOpen) {
      fetchParticipants();
    }
  }, [isLotteryOpen, fetchParticipants]);

  return (
    <div>
      <div className="p-6 flex items-center justify-between shadow-xl px-28">
        <p className="text-blue-900 font-bold text-2xl">Maal ka Mela</p>
        {!currentAccount ? (
          <>
            <button
              onClick={() => setIsModalOpen(true)}
              className="text-white bg-blue-500 font-semibold px-6 py-3 rounded-full hover:bg-blue-600 transition-all duration-200"
            >
              Open Modal
            </button>
            {isModalOpen && (
              <Modal
                onClose={() => setIsModalOpen(false)}
                connectWallet={connectWallet}
              />
            )}
          </>
        ) : (
          <p className="font-semibold">Connected: {currentAccount}</p>
        )}
      </div>

      <div>
        {/* <Lottie options={defaultOptions} height={300} width={300} /> */}
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
                }}
                className="text-white bg-yellow-500 font-semibold px-10 py-3 rounded-md hover:bg-yellow-600 transition-all duration-200"
              >
                Close Lottery
              </button>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Landing;
