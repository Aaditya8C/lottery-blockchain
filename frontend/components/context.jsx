"use client";
import React, { createContext, useState, useEffect } from "react";
import { contractAbi, contractAddress } from "./utils/constants";
import toast from "react-hot-toast";
import { ethers } from "ethers";

export const TransactionContext = createContext();

export const TransactionProvider = ({ children }) => {
  const [currentAccount, setCurrentAccount] = useState("");
  const [participants, setParticipants] = useState([]);

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

  const sendTransaction = async () => {
    try {
      const { ethereum } = window;
      if (!ethereum)
        return alert("MetaMask is required to complete this action.");

      const provider = new ethers.BrowserProvider(ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(
        contractAddress,
        contractAbi,
        signer
      );

      const tx = await contract.buyTicket({
        value: ethers.utils.parseEther("0.0001"),
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
      const provider = new ethers.BrowserProvider(ethereum);
      const signer = provider.getSigner();
      return new ethers.Contract(contractAddress, contractAbi, signer);
    }
    return null;
  };

  const fetchParticipants = async () => {
    try {
      const { ethereum } = window;
      if (!ethereum) return;

      const transactionContract = createEthereumContract();
      if (!transactionContract) return;

      const participants = await transactionContract.getParticipants();
      const winner = await transactionContract.getWinner();

      const formattedParticipants = participants.map((address) => ({
        address,
        allotted: address.toLowerCase() === winner.toLowerCase(),
        claimStatus:
          address.toLowerCase() === winner.toLowerCase()
            ? "Claim"
            : "Not Claimed",
      }));

      setParticipants(formattedParticipants);
    } catch (error) {
      console.log("Error fetching participants", error);
    }
  };

  useEffect(() => {
    const init = async () => {
      const { ethereum } = window;
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
      }}
    >
      {children}
    </TransactionContext.Provider>
  );
};
