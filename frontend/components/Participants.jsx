"use client";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

const Participants = ({ participants }) => {
  console.log(participants);
  return (
    <TableContainer
      component={Paper}
      style={{
        display: "flex",
        justifyContent: "center",
        padding: "30px 0",
      }}
    >
      <Table
        sx={{ minWidth: 650, maxWidth: 1000 }}
        aria-label="participants table"
      >
        <TableHead>
          <TableRow>
            <TableCell>Account Address</TableCell>
            <TableCell align="center">Name</TableCell>
            <TableCell align="center">Amount Spent (ETH)</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {participants && participants.length > 0 ? (
            participants.map((participant) => (
              <TableRow key={participant.address}>
                <TableCell component="th" scope="row">
                  {participant.address}
                </TableCell>
                <TableCell align="center">{participant.name}</TableCell>
                <TableCell align="center">{participant.amountSpent}</TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={5} align="center">
                No participants found
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default Participants;
