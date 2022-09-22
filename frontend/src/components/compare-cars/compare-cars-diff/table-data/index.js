import React from 'react';
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import TableHead from '@mui/material/TableHead';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import Paper from "@mui/material/Paper";
import styled from 'styled-components';
// import { TableCell } from '@mui/material';

const StyledTableCell = styled(TableCell)`
  background-color: black;
  color: white;
  text-align: center;
`;

const StyledTableRow = styled(TableRow)`
  :last-child td, :last-child th {
    border: 0
  }
`;

// a table component to show the compare data of different cars
const TableData = ({ data, values, tableHeaders }) => {
  console.log(data, values);
  return data.length && (
    <TableContainer component={Paper}>
      <Table aria-label="customized table">
        <TableHead>
          <TableRow>
            <TableCell style={{background: 'black'}}></TableCell>
            {tableHeaders?.map((item) => (
              <StyledTableCell align="right">{item}</StyledTableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {data?.map((row, index) => (console.log(row), (
            <StyledTableRow key={row?.key}>
              <TableCell component="th" scope="row" sx={{ fontWeight: 500, background: 'cadetblue', fontWeight: 700 }}>{row?.key}</TableCell>
              {values?.[index]?.[row?.key].map((val, index) => (
                <TableCell align="center" key={`value${index}`} sx={{ color: '#6f6f6f', fontWeight: 500 }}>{val}</TableCell>
              ))}
            </StyledTableRow>
          )))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default TableData;