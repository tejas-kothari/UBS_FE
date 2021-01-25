import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles({
  table: {
    minWidth: 180,
   
  },
});

function createData(name: string, calories: number) {
  return { name, calories};
}

const rows = [
  createData('Age at Funding - Seed', 0.0),
  createData('Age at Funding - Series A', 237),
  createData('Age at Funding - Series B', 262),
  createData('Age at Funding - Series Unknown', 305),
  createData('Average organization age at events', 356),
  createData('Funding Raised (USD) - Debt Financing', 356),
  createData('Funding Raised (USD) - Seed', 356),
  createData('Funding Raised (USD) - Series A', 356),
  createData('Funding Raised (USD) - Series B', 356),
  createData('Funding Raised (USD) - Series Unknown', 356),
  createData('Funding received from organisations founded previously by current Founders', 356),
  createData('Funding received from previously held jobs by current Founders', 356),
  createData('Number of Bachelors', 356),
  createData('Number of Founders', 356),
  createData('Number of Funding Rounds from previously held jobs by current Founders', 356),
  createData('Number of Investors - Seed', 356),
  createData('Number of Investors - Series A', 356),
  createData('Number of executive jobs held by Founders previously', 356),
  createData('Number of organisations founded previously by current Founders', 356),
  createData('Number of previous funding rounds', 356),
  createData('Organization Age', 356),
  createData('Predicted Funding', 356),
  createData('Total Funding Received', 356),
  createData('University Rankings from Founders’ degrees', 356),

];

export default function BasicTable() {
  const classes = useStyles();

  return (
    <TableContainer component={Paper} style={{ maxHeight: 657 }}>
      <Table className={classes.table} aria-label="simple table" stickyHeader>
        <TableHead >
          <TableRow>
            <TableCell>Features</TableCell>
            <TableCell align="right"></TableCell>
            
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.name}>
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="right">{row.calories}</TableCell>
              
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}