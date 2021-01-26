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
    // marginBottom: theme.spacing(3)
  }
}));

function CompanyView() {
  const classes = useStyles();

  const { companyId } = useParams();
  const [company, setCompany] = useState<Company>();
  const [companyFunding, setCompanyFunding] = useState<CompanyFunding[]>();
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

  // console.log(companyFunding);

  return (
    <Page title={company && company.name} className={classes.root}>
      {company && companyFunding ? (
        <Grid container spacing={3}>
          <Grid item xs={12} className={classes.companyCard}>
            <CompanyCard company={company} showRank={false} addLink={false} />
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
          l
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
