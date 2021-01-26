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
    minWidth: 150,
   
  },
});

function createData(key: string, value: any) {
  return { key, value};
}

const rows = [
  createData('Age at Funding - Seed', 0.0/12 + 'years'),
  createData('Age at Funding - Series A', 29.0/12 + 'years'),
  createData('Age at Funding - Series B', 52.5/12 + 'years'),
  createData('Age at Funding - Series Unknown', 0.0/12 + 'years'),
  createData('Average organization age at events', 65.22351588328303/12 + 'years'),
  createData('Funding Raised (USD) - Debt Financing', '$'+ 0.0),
  createData('Funding Raised (USD) - Seed', '$'+ 0.0),
  createData('Funding Raised (USD) - Series A', '$'+ 6000000.0),
  createData('Funding Raised (USD) - Series B', '$'+ 42500000.0),
  createData('Funding Raised (USD) - Series Unknown', '$'+ 0.0),
  createData('Funding received from organisations founded previously by current Founders', '$'+ 0.0),
  createData('Funding received from previously held jobs by current Founders', '$'+ 0.0),
  createData('Number of Bachelors', 0.0),
  createData('Number of Founders', 2.0),
  createData('Number of Funding Rounds from previously held jobs by current Founders', 0.0),
  createData('Number of Investors - Seed', 0.0),
  createData('Number of Investors - Series A', 1.0),
  createData('Number of executive jobs held by Founders previously', 2.0),
  createData('Number of organisations founded previously by current Founders', 0.0),
  createData('Number of previous funding rounds', 5.0),
  createData('Organization Age', 108.28969794040944/12 + 'years'),
  createData('Predicted Funding', '$'+ 161456031.26083332),
  createData('Total Funding Received', '$'+ 161500000.0),
  createData('University Rankings from Founders’ degrees', 1.0),

];

export default function BasicTable() {
  const classes = useStyles();

  return (
    <TableContainer component={Paper} style={{ maxHeight: 657  }}>
      <Table className={classes.table} aria-label="simple table" stickyHeader>
        <TableHead >
          <TableRow>
            <TableCell>Features</TableCell>
            <TableCell align="right"></TableCell>
            
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.key}>
              <TableCell component="th" scope="row">
                {row.key}
              </TableCell>
              <TableCell align="right">{row.value}</TableCell>
              
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}