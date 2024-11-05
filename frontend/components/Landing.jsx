"use client";
import React, { useContext, useEffect, useState } from "react";
import animationData from "../public/lottery.json";
import Lottie from "react-lottie";
import { TransactionContext } from "./context";
import Modal from "./Modal";

const Landing = () => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: { preserveAspectRatio: "xMidYMid slice" },
  };
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { connectWallet, currentAccount, fetchContractDetails } =
    useContext(TransactionContext);
  useEffect(() => {
    if (currentAccount) {
      fetchContractDetails();
    }
  }, [currentAccount, fetchContractDetails]);

  return (
    <div className="flex flex-col justify-center items-center py-20">
      <p className="text-gray-400 text-4xl font-semibold animate-pulse">
        The Maal ka <span className="text-cyan-300">Mela</span>
      </p>
      <div>
        <Lottie options={defaultOptions} height={400} width={400} />
      </div>
      <div className="text-white">
        <button
          className="px-8 py-3 bg-cyan-700 rounded-md text-xl font-semibold"
          onClick={() => setIsModalOpen(true)}
        >
          Login With Metamask
        </button>
        {isModalOpen && (
          <Modal
            setIsModalOpen={setIsModalOpen}
            connectWallet={connectWallet}
          />
        )}
      </div>
    </div>
  );
};

export default Landing;
