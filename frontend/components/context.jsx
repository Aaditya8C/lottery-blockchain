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
        value: ethers.utils.parseEther("0.0001"),
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
      if (ethereum) {
        const transactionContract = await createEthereumContract();

        // Fetch participants and winner
        const participants = await transactionContract.getParticipants();
        const winner = await transactionContract.getWinner();

        // Format participants data with allotted flag
        const formattedParticipants = participants.map((address) => ({
          address,
          allotted: address.toLowerCase() === winner.toLowerCase(), // Check if the participant is the winner
          claimStatus:
            address.toLowerCase() === winner.toLowerCase()
              ? "Claim"
              : "Not Claimed", // Set claim status based on winner
        }));

        setParticipants(formattedParticipants);
      }
    } catch (error) {
      console.log("Error fetching participants", error);
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
      }}
    >
      {children}
    </TransactionContext.Provider>
  );
};
