"use client";
import React, { createContext, useState, useEffect } from "react";
import { contractAbi, contractAddress } from "./utils/constants";
import toast from "react-hot-toast";
import { ethers } from "ethers";
import { useWinnerStore } from "@/store/winnerStore";

export const TransactionContext = createContext();

export const TransactionProvider = ({ children }) => {
  const [currentAccount, setCurrentAccount] = useState("");
  const [participants, setParticipants] = useState([]);
  const [isOwner, setIsOwner] = useState(false);
  const [isLotteryOpen, setIsLotteryOpen] = useState(false);
  const { setWinners } = useWinnerStore();

  const connectWallet = async () => {
    if (typeof window !== "undefined" && window.ethereum) {
      try {
        const { ethereum } = window;
        if (!ethereum) return alert("Please install MetaMask!");

        const accounts = await ethereum.request({
          method: "eth_requestAccounts",
        });
        setCurrentAccount(accounts[0]);
      } catch (error) {
        console.error("Wallet connection failed", error);
        throw new Error("No Ethereum account found");
      }
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
      const { ethereum } = window;
      if (!ethereum)
        return alert("MetaMask is required to complete this action.");

      const provider = new ethers.providers.Web3Provider(ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(
        contractAddress,
        contractAbi,
        signer
      );

      const name = localStorage.getItem("userName");
      const tx = await contract.buyTicket(name, {
        value: ethers.utils.parseEther("0.005"),
      });
      await tx.wait();
      toast.success("Ticket purchased successfully!");
    } catch (error) {
      toast.error("Transaction failed");
      console.error("Transaction error:", error);
    }
  };

  const createEthereumContract = () => {
    const { ethereum } = window;
    if (ethereum) {
      const provider = new ethers.providers.Web3Provider(ethereum);
      const signer = provider.getSigner();
      return new ethers.Contract(contractAddress, contractAbi, signer);
    }
    return null;
  };

  const fetchParticipants = async () => {
    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(
        contractAddress,
        contractAbi,
        signer
      );

      const participantData = await contract.getParticipants();

      setParticipants(
        participantData[0].map((address, index) => ({
          address,
          name: participantData[1][index],
          amountSpent: ethers.utils.formatEther(participantData[2][index]),
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
      toast.success("Lottery opened successfully!");
    } catch (error) {
      console.error("Failed to open the lottery:", error);
      toast.error("Failed to open the lottery.");
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

      const {
        0: first,
        1: firstName,
        2: firstAmount,
        3: second,
        4: secondName,
        5: secondAmount,
        6: third,
        7: thirdName,
        8: thirdAmount,
      } = await contract.getWinnerDetails();

      const firstAmountInEth = ethers.utils.formatEther(firstAmount);
      const secondAmountInEth = ethers.utils.formatEther(secondAmount);
      const thirdAmountInEth = ethers.utils.formatEther(thirdAmount);

      setWinners({
        first: { address: first, name: firstName, amount: firstAmountInEth },
        second: {
          address: second,
          name: secondName,
          amount: secondAmountInEth,
        },
        third: { address: third, name: thirdName, amount: thirdAmountInEth },
      });

      fetchParticipants();
      toast.success("Winners revealed successfully!");
    } catch (error) {
      console.error("Failed to reveal winners:", error);
      toast.error("Failed to reveal winners.");
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
      toast.success("Lottery closed successfully!");
    } catch (error) {
      console.error("Failed to close the lottery:", error);
      toast.error("Failed to close the lottery.");
    }
  };

  useEffect(() => {
    const init = async () => {
      const { ethereum } = window;
      if (ethereum) {
        window.ethereum.on("chainChanged", () => {
          window.location.reload();
        });

        window.ethereum.on("accountsChanged", () => {
          window.location.reload();
        });
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
        fetchContractDetails,
        isOwner,
        isLotteryOpen,
        setIsLotteryOpen,
        setIsOwner,
        setParticipants,
        openLottery,
        revealWinners,
        closeLottery,
      }}
    >
      {children}
    </TransactionContext.Provider>
  );
};
