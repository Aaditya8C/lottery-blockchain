"use client";
import Link from "next/link";
import React, { useContext } from "react";
import { TransactionContext } from "./context";
import { textShortner } from "./textShortener";

const Navbar = () => {
  const { currentAccount, revealWinners } = useContext(TransactionContext);
  return (
    <div className="p-6 flex items-center justify-between shadow-xl shadow-cyan-900 px-28 bg-cyan-950">
      <Link className="text-cyan-500 font-bold text-xl" href="/dashboard">
        EtherRaja
      </Link>
      <Link className="text-cyan-500 font-bold text-xl" href="/participants">
        Participants
      </Link>
      <Link className="text-cyan-500 font-bold text-xl" href="/winners">
        Winners
      </Link>
      {!currentAccount ? (
        <>
          <button
            onClick={() => setIsModalOpen(true)}
            className="text-white bg-cyan-600 font-semibold px-6 py-3 rounded-md hover:bg-cyan-700 transition-all duration-200"
          >
            Login With Metamask
          </button>
        </>
      ) : (
        <p className="font-semibold text-cyan-500 text-xl">
          Welcome:{" "}
          <span className="text-[#E2F1E7]">
            {localStorage.getItem("userName")}
          </span>
        </p>
      )}
    </div>
  );
};

export default Navbar;
