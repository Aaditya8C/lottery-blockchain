"use client";
import Link from "next/link";
import React, { useContext } from "react";
import { TransactionContext } from "./context";
import { textShortner } from "./textShortener";

const Navbar = () => {
  const { currentAccount, revealWinners } = useContext(TransactionContext);
  return (
    <div className="p-6 flex items-center justify-between shadow-xl shadow-purple-900 px-28 bg-purple-900 border-b-4 border-cyan-700">
      <Link className="text-purple-300 font-bold text-xl" href="/dashboard">
        Maal ka Mela
      </Link>
      <Link className="text-purple-300 font-bold text-xl" href="/participants">
        Participants
      </Link>
      <Link className="text-purple-300 font-bold text-xl" href="/winners">
        Winners
      </Link>
      {!currentAccount ? (
        <button
          onClick={() => setIsModalOpen(true)}
          className="text-white bg-purple-700 font-semibold px-6 py-3 rounded-md hover:bg-purple-800 transition-all duration-200"
        >
          Login With Metamask
        </button>
      ) : (
        <p className="font-semibold text-purple-300 text-xl">
          Welcome:{" "}
          <span className="text-white">{localStorage.getItem("userName")}</span>
        </p>
      )}
    </div>
  );
};

export default Navbar;
