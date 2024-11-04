"use client";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
const Participants = ({ participants }) => {
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
            <TableCell align="center">Price</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {participants.map((participant) => (
            <TableRow key={participant.address}>
              <TableCell component="th" scope="row">
                {participant.address}
              </TableCell>
              <TableCell align="center">0.005 ETH</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default Participants;
