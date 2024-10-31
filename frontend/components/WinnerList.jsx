"use client";
import React, { useContext, useEffect } from "react";
import { TransactionContext } from "./context";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Check, X } from "lucide-react";

const WinnerList = ({ participants }) => {
  const handleClaim = async (address) => {
    // Logic to handle claiming the prize
    // This might involve calling a contract function to transfer the winnings
    // For example: await contract.claimPrize(address);
  };

  return (
    <TableContainer
      component={Paper}
      style={{
        display: "flex",
        justifyContent: "center",
        padding: "30px 0",
      }}
    >
      <Table sx={{ minWidth: 650, maxWidth: 1000 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Account Address</TableCell>
            <TableCell align="center">Allotted</TableCell>
            <TableCell align="center">Claim</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {participants.map((participant) => (
            <TableRow key={participant.address}>
              <TableCell component="th" scope="row">
                {participant.address}
              </TableCell>
              <TableCell align="center">
                {" "}
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  {participant.allotted ? (
                    <Check color="green" />
                  ) : (
                    <X color="red" />
                  )}
                </div>
              </TableCell>
              <TableCell align="center">
                {participant.claimStatus === "Claim" ? (
                  <button
                    onClick={() => handleClaim(participant.address)}
                    className="text-blue-600"
                  >
                    Claim Prize
                  </button>
                ) : (
                  "Not Claimed"
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default WinnerList;
