"use client";
import React, { createContext, useState, useEffect } from "react";
import { ethers } from "ethers";
import { contractAbi, contractAddress } from "./utils/constants";
import toast from "react-hot-toast";

export const TransactionContext = createContext();

const { ethereum } = window;

export const TransactionProvider = ({ children }) => {
  const [currentAccount, setCurrentAccount] = useState("");
  const [participants, setParticipants] = useState([]);
  const [isOwner, setIsOwner] = useState(false);
  const [isLotteryOpen, setIsLotteryOpen] = useState(false);
  const [winners, setWinners] = useState({ first: "", second: "", third: "" });

  const connectWallet = async () => {
    try {
      if (!ethereum) return alert("Please install MetaMask!");
      const accounts = await ethereum.request({
        method: "eth_requestAccounts",
      });
      setCurrentAccount(accounts[0]);
    } catch (error) {
      console.error("Wallet connection failed", error);
      throw new Error("No ethereum account found");
    }
  };

  const fetchContractDetails = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(contractAddress, contractAbi, signer);

    const contractOwner = await contract.owner();
    setIsOwner(contractOwner.toLowerCase() === currentAccount.toLowerCase());

    const lotteryStatus = await contract.isLotteryOpen();
    setIsLotteryOpen(lotteryStatus);
  };

  if (currentAccount) {
    fetchContractDetails();
  }

  const sendTransaction = async () => {
    try {
      const provider = new ethers.providers.Web3Provider(ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(
        contractAddress,
        contractAbi,
        signer
      );
      const tx = await contract.buyTicket({
        value: ethers.utils.parseEther("0.005"),
      });
      await tx.wait();
      toast.success("Ticket purchased successfully!");
    } catch (error) {
      toast.error("Transaction failed");
      console.error("Transaction error:", error);
    }
  };

  const fetchParticipants = async () => {
    try {
      const provider = new ethers.providers.Web3Provider(ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(
        contractAddress,
        contractAbi,
        signer
      );

      const participants = await contract.getParticipants();

      setParticipants(
        participants.map((address) => ({
          address,
          allotted: false,
          claimStatus: "Not Claimed",
        }))
      );
      toast.success("Participants fetched successfully!");
    } catch (error) {
      toast.error("Failed to fetch participants");
      console.error("Error fetching participants:", error);
    }
  };

  // Open lottery function for the owner
  const openLottery = async () => {
    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(
        contractAddress,
        contractAbi,
        signer
      );

      const tx = await contract.openLottery();
      await tx.wait();

      setIsLotteryOpen(true);
    } catch (error) {
      console.error("Failed to open the lottery:", error);
    }
  };

  const revealWinners = async () => {
    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(
        contractAddress,
        contractAbi,
        signer
      );

      const tx = await contract.revealWinners();
      await tx.wait();

      const first = await contract.firstWinner();
      const second = await contract.secondWinner();
      const third = await contract.thirdWinner();

      console.log(first, second, third);

      setWinners({ first, second, third });

      fetchParticipants();
    } catch (error) {
      console.error("Failed to reveal winners:", error);
    }
  };

  const closeLottery = async () => {
    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(
        contractAddress,
        contractAbi,
        signer
      );

      const tx = await contract.closeLottery();
      await tx.wait();

      setIsLotteryOpen(false);
    } catch (error) {
      console.error("Failed to close the lottery:", error);
    }
  };

  useEffect(() => {
    const init = async () => {
      if (ethereum) {
        const accounts = await ethereum.request({ method: "eth_accounts" });
        if (accounts.length) setCurrentAccount(accounts[0]);
      }
    };
    init();
  }, []);

  return (
    <TransactionContext.Provider
      value={{
        connectWallet,
        sendTransaction,
        currentAccount,
        participants,
        fetchParticipants,
        participants,
        fetchContractDetails,
        isOwner,
        isLotteryOpen,
        setIsLotteryOpen,
        setIsOwner,
        setParticipants,
        openLottery,
        winners,
        setWinners,
        revealWinners,
        closeLottery,
      }}
    >
      {children}
    </TransactionContext.Provider>
  );
};
