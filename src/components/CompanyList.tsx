import { Grid } from '@material-ui/core';
import React from 'react';
import { NavLink } from 'react-router-dom';
import CompanyCard from './CompanyCard';
import Company from '../interfaces/company';

function CompanyList({ companies }: { companies: Company[] }) {
  return (
    <Grid container spacing={2} direction="column">
      {companies.map(company => (
        <Grid item xs={12} key={company.uuid}>
          <NavLink to={`/companies/${company.uuid}`}>
            <CompanyCard company={company} showRank={true} addLink={false} />
          </NavLink>
        </Grid>
      ))}
    </Grid>
  );
}

export default CompanyList;
