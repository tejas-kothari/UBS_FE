import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import React from 'react';
import CompanyFeatures from '../../interfaces/company_features';

const useStyles = makeStyles({
  table: {
    minWidth: 150
  }
});

export default function BasicTable({
  companyFeatures
}: {
  companyFeatures: CompanyFeatures;
}) {
  const classes = useStyles();

  return (
    <TableContainer component={Paper} style={{ maxHeight: 657 }}>
      <Table className={classes.table} aria-label="simple table" stickyHeader>
        <TableHead>
          <TableRow>
            <TableCell>Data Features</TableCell>
            <TableCell align="right"></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {Object.entries(companyFeatures)
            .filter(([key, value]) => key !== 'name' && key !== 'org_uuid')
            .sort(([key1, value1], [key2, value2]) => value2 - value1)
            .map(([key, value]) => (
              <TableRow key={key}>
                <TableCell component="th" scope="row">
                  {key}
                </TableCell>
                <TableCell align="right">
                  {(value as number).toFixed(2)}
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
