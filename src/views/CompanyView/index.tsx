import { makeStyles } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import 'fontsource-roboto';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import CompanyCard from '../../components/CompanyCard';
import Page from '../../components/Page';
import Company from '../../interfaces/company';
import CompanyFeatures from '../../interfaces/company_features';
import CompanyFunding from '../../interfaces/company_funding';
import BasicTable from './BasicTable';
import CompanyBenchmark from './CompanyBenchmark';
import ComapnyFundingTimeline from './CompanyFundingCard';
import CompanyShap from './CompanyShap';

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
  }
}));

function CompanyView() {
  const classes = useStyles();

  // Get company id from the params
  const { companyId } = useParams();
  // Stateful value of the company object
  const [company, setCompany] = useState<Company>();
  // Stateful value of the company funding object
  const [companyFunding, setCompanyFunding] = useState<CompanyFunding[]>();
  // Stateful value of the company features object
  const [companyFeatures, setCompanyFeatures] = useState<CompanyFeatures>();

  useEffect(() => {
    fetch('https://ubs-be.herokuapp.com/get_startup?uuid=' + companyId)
      .then(res => res.json())
      .then(data => setCompany(data as Company));

    fetch('https://ubs-be.herokuapp.com/get_startup_funding?uuid=' + companyId)
      .then(res => res.json())
      .then(data => setCompanyFunding(Object.values(data) as CompanyFunding[]));

    fetch(`https://ubs-be.herokuapp.com/get_startup_features?uuid=${companyId}`)
      .then(res => res.json())
      .then(data => setCompanyFeatures(data as CompanyFeatures));
  }, [companyId]);

  return (
    <Page title={company && company.name} className={classes.root}>
      {company && companyFunding && companyFeatures ? (
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <CompanyCard company={company} showRank={true} addLink={false} />
          </Grid>
          <Grid item xs={12} lg={8}>
            <ComapnyFundingTimeline
              company={company}
              companyFunding={companyFunding}
            />
          </Grid>
          <Grid item xs={12} lg={4}>
            {companyFeatures && (
              <BasicTable companyFeatures={companyFeatures} />
            )}
          </Grid>
          <Grid item xs={12}>
            <CompanyShap company={company} companyFeatures={companyFeatures} />
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
