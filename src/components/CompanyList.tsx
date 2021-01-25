import { Grid } from '@material-ui/core';
import React from 'react';
import Company from '../interfaces/company';
import CompanyCard from './CompanyCard';

function CompanyList({ companies }: { companies: Company[] }) {
  return (
    <Grid container spacing={2} direction="column">
      {companies.map(company => (
        <Grid item xs={12} key={company.uuid}>
          <CompanyCard company={company} showRank={true} addLink={true} />
        </Grid>
      ))}
    </Grid>
  );
}

export default CompanyList;
