import { makeStyles } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import 'fontsource-roboto';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import CompanyCard from '../../components/CompanyCard';
import Page from '../../components/Page';
import Company from '../../interfaces/company';
import CompanyBenchmark from './CompanyBenchmark';

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.background.default,
    minHeight: '100%',
    padding: theme.spacing(3)
  },
  paper: {
    padding: theme.spacing(3),
    textAlign: 'center',
    color: theme.palette.text.primary
  },
  checkboxLabel: {
    textAlign: 'left'
  },
  title: {
    fontSize: '1.25rem',
    fontWeight: 'bold',
    marginBottom: theme.spacing(1)
  },
  companyCard: {
    marginBottom: theme.spacing(3),
    pointerEvents: 'none'
  }
}));

function CompanyView() {
  const classes = useStyles();

  const { companyId } = useParams();
  const [company, setCompany] = useState<Company>();

  useEffect(() => {
    fetch('https://ubs-be.herokuapp.com/get_startup/' + companyId)
      .then(res => res.json())
      .then(data => setCompany(data as Company));
  }, [companyId]);

  return (
    <Page title={company && company.name} className={classes.root}>
      <Typography variant="h1">Company View </Typography>
      <Typography variant="body1">&nbsp;</Typography>
      {company ? (
        <Grid container spacing={1}>
          <Grid item xs={12} className={classes.companyCard}>
            <CompanyCard company={company} showRank={false} />
          </Grid>
          <Grid item xs={12}>
            <CompanyBenchmark company={company} />
          </Grid>
        </Grid>
      ) : (
        <Typography>Loading company...</Typography>
      )}
    </Page>
  );
}

export default CompanyView;
