"use client";
import React, { useContext, useEffect, useState } from "react";
import { TransactionContext } from "./context";
import { useWinnerStore } from "@/store/winnerStore";
import Navbar from "./Navbar";
import { timeStore } from "@/store/timeStore";

const CountdownTimer = ({ initialTime }) => {
  const { timeLeft, setTimeLeft } = timeStore();

  useEffect(() => {
    if (timeLeft <= 0) return;
    const timer = setInterval(() => setTimeLeft(timeLeft - 1), 1000);
    return () => clearInterval(timer);
  }, [timeLeft]);

  const formatTime = (time) => String(time).padStart(2, "0");
  const hours = formatTime(Math.floor(timeLeft / 3600));
  const minutes = formatTime(Math.floor((timeLeft % 3600) / 60));
  const seconds = formatTime(timeLeft % 60);

  return (
    <div className="bg-cyan-950 shadow-lg shadow-cyan-950 border-2 border-cyan-700 w-fit h-fit p-8 rounded-md grid gap-4">
      <div className="bg-transparent shadow-lg shadow-cyan-900 w-fit h-fit p-10 border-2 border-cyan-700 grid gap-6 rounded-md">
        <p className="text-white text-xl">Buy fast clock is running!!</p>
        <p className="text-white italic">Time Remaining: </p>
        <div className="flex gap-4 text-white">
          <div className="p-4 bg-cyan-700 rounded-md flex flex-col items-center h-fit">
            <span className="text-2xl font-semibold">{hours}</span>
            <span className="text-sm">Hours</span>
          </div>
          <div className="p-4 bg-cyan-700 rounded-md flex flex-col items-center h-fit">
            <span className="text-2xl font-semibold">{minutes}</span>
            <span className="text-sm">Minutes</span>
          </div>
          <div className="p-4 bg-cyan-700 rounded-md flex flex-col items-center h-fit">
            <span className="text-2xl font-semibold">{seconds}</span>
            <span className="text-sm">Seconds</span>
          </div>
        </div>
      </div>
    </div>
  );
};

const DashboardComp = () => {
  const {
    currentAccount,
    sendTransaction,
    fetchContractDetails,
    isOwner,
    isLotteryOpen,
    revealWinners,
    openLottery,
    closeLottery,
    participantCount,
  } = useContext(TransactionContext);

  const { setWinners } = useWinnerStore();
  const initialTime = 15 * 60; // 15 minutes in seconds

  useEffect(() => {
    if (currentAccount) {
      fetchContractDetails();
    }
  }, [currentAccount, fetchContractDetails]);

  return (
    <div>
      <Navbar />
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
          <p className="text-2xl font-semibold text-cyan-500">
            Wait for the lottery to be opened
          </p>
        )}

        {isLotteryOpen && (
          <div className="flex gap-8">
            <CountdownTimer initialTime={initialTime} />
            <div className="bg-cyan-950 shadow-lg shadow-cyan-950 border-2 border-cyan-700 w-fit h-fit p-8 rounded-md">
              <div className="bg-transparent shadow-lg shadow-cyan-900 w-fit h-fit p-10 border-2 border-cyan-700 grid gap-6 rounded-md">
                <div className="bg-cyan-800 rounded-md p-4">
                  <div className="flex justify-between gap-10 text-white font-semibold">
                    <p>Price Per Ticket:</p>
                    <p>0.005 eth</p>
                  </div>
                  <div className="flex justify-between gap-10 text-white font-semibold">
                    <p>Total Participants:</p>
                    <p>{participantCount}</p>
                  </div>
                </div>

                <div className="grid items-center gap-4">
                  <button
                    className="px-6 py-2 bg-gradient-to-r from-cyan-400 to-blue-500 hover:from-cyan-500 hover:to-blue-600 rounded-md w-full font-semibold text-white transition-all duration-300"
                    onClick={sendTransaction}
                  >
                    Buy Lottery
                  </button>

                  {isOwner && (
                    <button
                      onClick={revealWinners}
                      className="px-6 py-2 bg-gradient-to-r from-green-400 to-green-700 hover:from-green-500 hover:to-green-800 rounded-md w-full font-semibold text-white transition-all duration-300"
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
                      className="px-6 py-2 bg-gradient-to-r from-orange-500 to-red-700 hover:from-orange-600 hover:to-red-800 rounded-md w-full font-semibold text-white transition-all duration-300"
                    >
                      Close Lottery
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DashboardComp;
