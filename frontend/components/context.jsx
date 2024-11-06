"use client";
import React, { createContext, useState, useEffect } from "react";
import { contractAbi, contractAddress } from "./utils/constants";
import toast from "react-hot-toast";
import { ethers } from "ethers";
import { useWinnerStore } from "@/store/winnerStore";
import useParticipantsStore from "@/store/participantStore";

export const TransactionContext = createContext();

export const TransactionProvider = ({ children }) => {
  const [currentAccount, setCurrentAccount] = useState("");
  // const [participants, setParticipants] = useState([]);
  const [isOwner, setIsOwner] = useState(false);
  const [isLotteryOpen, setIsLotteryOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false); // New isLoading state
  const [participantCount, setParticipantCount] = useState("0");
  const [amountInvested, setamountInvested] = useState(0);
  const { setWinners } = useWinnerStore();
  const { participants, setParticipants } = useParticipantsStore();

  const connectWallet = async () => {
    setIsLoading(true); // Set loading true
    if (typeof window !== "undefined" && window.ethereum) {
      try {
        const { ethereum } = window;
        if (!ethereum) return alert("Please install MetaMask!");

        const accounts = await ethereum.request({
          method: "eth_requestAccounts",
        });
        setCurrentAccount(accounts[0]);
        toast.success("Wallet Connected Successfully");
      } catch (error) {
        console.error("Wallet connection failed", error);
        toast.error("Unable to connect the wallet");
        throw new Error("No Ethereum account found");
      } finally {
        setIsLoading(false); // Set loading false
      }
    }
  };

  const fetchContractDetails = async () => {
    setIsLoading(true); // Set loading true
    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(
        contractAddress,
        contractAbi,
        signer
      );

      const contractOwner = await contract.owner();
      setIsOwner(contractOwner.toLowerCase() === currentAccount.toLowerCase());

      const lotteryStatus = await contract.isLotteryOpen();
      setIsLotteryOpen(lotteryStatus);
    } catch (error) {
      console.error("Error fetching contract details:", error);
      toast.error("Failed to fetch contract details");
    } finally {
      setIsLoading(false); // Set loading false
    }
  };

  const sendTransaction = async () => {
    // setIsLoading(true); // Set loading true
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
      getParticipantCount();
      // setIsLoading(false); // Set loading false
      toast.success("Ticket purchased successfully!");
    } catch (error) {
      toast.error("Transaction failed");
      console.error("Transaction error:", error);
    }
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

      // setParticipants(
      //   participantData[0].map((address, index) => ({
      //     address,
      //     name: participantData[1][index],
      //     amountSpent: ethers.utils.formatEther(participantData[2][index]),
      //     allotted: false,
      //     claimStatus: "Not Claimed",
      //   }))
      // );
      setParticipants(participantData);
      // toast.success("Participants fetched successfully!");
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
  const getParticipantCount = async () => {
    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(
        contractAddress,
        contractAbi,
        signer
      );

      const count = await contract.getParticipantsCount();
      console.log("Count of participants:", count.toString());

      setParticipantCount(count.toString());
    } catch (error) {
      console.error("Failed to get the count of participants:", error);
      toast.error("Failed to get the count of participants.");
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

      setIsLoading(true); // Set loading true

      const tx = await contract.revealWinners();
      await tx.wait();
      setIsLoading(false); // Set loading false

      // const {
      //   0: first,
      //   1: firstName,
      //   2: firstAmount,
      //   3: second,
      //   4: secondName,
      //   5: secondAmount,
      //   6: third,
      //   7: thirdName,
      //   8: thirdAmount,
      // } = await contract.getWinnerDetails();

      // const firstAmountInEth = ethers.utils.formatEther(firstAmount);
      // const secondAmountInEth = ethers.utils.formatEther(secondAmount);
      // const thirdAmountInEth = ethers.utils.formatEther(thirdAmount);

      // setWinners({
      //   first: { address: first, name: firstName, amount: firstAmountInEth },
      //   second: {
      //     address: second,
      //     name: secondName,
      //     amount: secondAmountInEth,
      //   },
      //   third: { address: third, name: thirdName, amount: thirdAmountInEth },
      // });

      // fetchParticipants();
      toast.success("Winners revealed successfully!");
    } catch (error) {
      console.error("Failed to reveal winners:", error);
      toast.error("Failed to reveal winners.");
    }
  };

  const getWinner = async () => {
    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(
        contractAddress,
        contractAbi,
        signer
      );

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
    } catch (error) {
      console.error("Failed to fetch winners:", error);
      toast.error("Failed to fetch winners.");
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
      localStorage.removeItem("userName");
      localStorage.removeItem("timeLeft");
      localStorage.removeItem("winners-storage");
      localStorage.removeItem("participants-store");

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

  const getAmount = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(contractAddress, contractAbi, signer);
    const amount = await contract.getTotalAmountInvested();
    setamountInvested(ethers.utils.formatEther(amount));
  };

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
        participantCount,
        getParticipantCount,
        amountInvested,
        getWinner,
        isLoading,
        getAmount, // Include isLoading in context value
      }}
    >
      {children}
    </TransactionContext.Provider>
  );
};
