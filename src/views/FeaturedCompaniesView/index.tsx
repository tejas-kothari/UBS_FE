import { Grid, makeStyles } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import 'fontsource-roboto';
import React, { useState } from 'react';
import Page from '../../components/Page';
import CompanyCard from './CompanyCard';
import CustomSelect from './CustomSelect';
import companiesData from '../../tmp_data/companies_data.json';

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.background.default,
    minHeight: '100%',
    padding: theme.spacing(3)
  },
  formControl: {
    minWidth: 150,
    backgroundColor: theme.palette.background.paper
  },
  title: {
    marginBottom: theme.spacing(1)
  },
  selects: {
    marginBottom: theme.spacing(3)
  },
  companyCards: {}
}));

function FeaturedCompaniesView() {
  const classes = useStyles();

  const selects = {
    category: ['Test'],
    country: ['Test'],
    phase: ['Test'],
    size: ['Test'],
    investor: ['Test']
  };

  const [category, setCategory] = useState<string>('');
  const [country, setCountry] = useState<string>('');
  const [phase, setPhase] = useState<string>('');
  const [size, setSize] = useState<string>('');
  const [investor, setInvestor] = useState<string>('');

  return (
    <Page title="Featured Companies" className={classes.root}>
      <Typography variant="h1" className={classes.title}>
        Featured Companies
      </Typography>
      <Grid container spacing={2} className={classes.selects}>
        <CustomSelect
          label="Category"
          id="category"
          value={category}
          handleChange={setCategory}
          values={selects.category}
        />
        <CustomSelect
          label="Country"
          id="country"
          value={country}
          handleChange={setCountry}
          values={selects.country}
        />
        <CustomSelect
          label="Phase"
          id="phase"
          value={phase}
          handleChange={setPhase}
          values={selects.phase}
        />
        <CustomSelect
          label="Size"
          id="size"
          value={size}
          handleChange={setSize}
          values={selects.size}
        />
        <CustomSelect
          label="Investors"
          id="investors"
          value={investor}
          handleChange={setInvestor}
          values={selects.investor}
        />
      </Grid>
      <Grid
        container
        spacing={2}
        direction="column"
        className={classes.companyCards}
      >
        {companiesData.map(company => (
          <CompanyCard company={company} />
        ))}
      </Grid>
    </Page>
  );
}

export default FeaturedCompaniesView;
