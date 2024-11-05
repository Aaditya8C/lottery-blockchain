"use client";
import React from "react";
import { Medal, Trophy } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import { useWinnerStore } from "@/store/winnerStore";
import { isEmpty } from "lodash";

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
  const { winners = parseWinnersData(blockchainResponse) } = useWinnerStore();

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
      <h2 className="text-2xl font-bold text-center mb-6 text-orange-200">
        Top 3 Winners
      </h2>
      <TableContainer component={Paper} className="shadow-lg rounded-lg ">
        <Table className="bg-[#04364A]">
          <TableHead>
            <TableRow className="bg-cyan-700">
              <TableCell align="center" className="font-semibold">
                <span className="text-cyan-400 font-semibold text-lg">
                  Position
                </span>
              </TableCell>
              <TableCell align="center" className="font-semibold">
                <span className="text-cyan-400 font-semibold text-lg">
                  Name
                </span>
              </TableCell>
              <TableCell align="center" className="font-semibold">
                <span className="text-cyan-400 font-semibold text-lg">
                  Address
                </span>
              </TableCell>
              <TableCell align="center" className="font-semibold">
                <span className="text-cyan-400 font-semibold text-lg">
                  Amount (Eth)
                </span>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {!isEmpty(winners) ? (
              positions.map((position, index) => (
                <TableRow
                  key={index}
                  className="hover:bg-cyan-600 transition duration-300"
                >
                  <TableCell
                    align="center"
                    className="flex justify-center items-center gap-2 "
                  >
                    <span className="animate-pulse">{position.icon} </span>
                    <span className="font-semibold text-orange-200 text-lg">
                      {position.place}
                    </span>
                  </TableCell>
                  <TableCell
                    align="center"
                    className="text-orange-200 font-medium text-lg"
                  >
                    {position.details.name}
                  </TableCell>
                  <TableCell align="center">
                    <span className="text-orange-200 text-lg">
                      {position.details.address}
                    </span>
                  </TableCell>
                  <TableCell
                    align="center"
                    className="text-blue-200 font-medium text-lg"
                  >
                    {position.details.amount} ETH
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <p>Winners not revealed yet</p>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default Winners;
