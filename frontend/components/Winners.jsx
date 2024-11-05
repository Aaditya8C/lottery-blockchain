"use client";
import React, { useContext, useEffect } from "react";
import { Medal } from "lucide-react";
import { useWinnerStore } from "@/store/winnerStore";
import { isEmpty } from "lodash";
import { TransactionContext } from "./context";

// Sample response data from the blockchain
const blockchainResponse = [
  { address: "0xD9CE35963D62FBa81478a2789B7DFfC0E5272Daf" },
  { string: "Aaditya" },
  { uint256: "7500000000000000" },
  { address: "0xdb159108EBE9A4857FA4ea88D87991dE0D374b1d" },
  { string: "Vedhas" },
  { uint256: "4500000000000000" },
  { address: "0x4ea1bb5633e03bAf4930185cf7E7601c90Bd0605" },
  { string: "Manav" },
  { uint256: "3000000000000000" },
];

// Helper function to parse blockchain data
const parseWinnersData = (data) => {
  return {
    first: {
      address: data[0].address,
      name: data[1].string,
      amount: data[2].uint256,
    },
    second: {
      address: data[3].address,
      name: data[4].string,
      amount: data[5].uint256,
    },
    third: {
      address: data[6].address,
      name: data[7].string,
      amount: data[8].uint256,
    },
  };
};

const Winners = () => {
  const { winners } = useWinnerStore();
  const { getWinner } = useContext(TransactionContext);
  useEffect(() => {
    getWinner();
  }, []);

  const positions = [
    {
      place: "1st",
      details: winners.first,
      icon: <Medal className="text-yellow-600" />,
    },
    {
      place: "2nd",
      details: winners.second,
      icon: <Medal className="text-gray-600" />,
    },
    {
      place: "3rd",
      details: winners.third,
      icon: <Medal className="text-red-400" />,
    },
  ];

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold text-center mb-6 text-orange-200 mt-20">
        Top 3 Winners
      </h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-purple-900 text-white border border-cyan-800 rounded-lg shadow-lg">
          <thead>
            <tr className="bg-purple-800">
              <th className="px-6 py-3 text-center border-b border-cyan-800 text-cyan-400 font-semibold text-lg">
                Position
              </th>
              <th className="px-6 py-3 text-center border-b border-cyan-800 text-cyan-400 font-semibold text-lg">
                Name
              </th>
              <th className="px-6 py-3 text-center border-b border-cyan-800 text-cyan-400 font-semibold text-lg">
                Address
              </th>
              <th className="px-6 py-3 text-center border-b border-cyan-800 text-cyan-400 font-semibold text-lg">
                Amount (Eth)
              </th>
            </tr>
          </thead>
          <tbody>
            {!isEmpty(winners) ? (
              positions.map((position, index) => (
                <tr
                  key={index}
                  className="hover:bg-purple-700 transition duration-300 border-b border-cyan-800"
                >
                  <td className="px-6 py-4 text-center flex justify-center items-center gap-2 font-semibold text-lg text-orange-200">
                    <span className="animate-pulse">{position.icon}</span>
                    {position.place}
                  </td>
                  <td className="px-6 py-4 text-center text-lg font-medium text-orange-200">
                    {position.details.name}
                  </td>
                  <td className="px-6 py-4 text-center text-lg text-orange-200">
                    {position.details.address}
                  </td>
                  <td className="px-6 py-4 text-center text-lg font-medium text-blue-200">
                    {position.details.amount} ETH
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="4"
                  className="px-6 py-4 text-center text-lg text-orange-200"
                >
                  Winners not revealed yet
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Winners;
