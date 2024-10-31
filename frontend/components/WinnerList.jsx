import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData("Frozen yoghurt", 1, 2),
  createData("Ice cream sandwich", 2, 2),
  createData("Eclair", 2, 2),
  createData("Cupcake", 3, 3),
  createData("Gingerbread", 3, 3),
];
const WinnerList = () => {
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
            <TableCell align="right">Allotted</TableCell>
            <TableCell align="right">Claim</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.name}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="right">{row.calories}</TableCell>
              <TableCell align="right">{row.fat}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default WinnerList;