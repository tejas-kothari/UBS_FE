import { makeStyles } from '@material-ui/core';
import React from 'react';
import Page from '../../components/Page';
import Typography from '@material-ui/core/Typography';
import 'fontsource-roboto';
import { useParams } from 'react-router-dom';
import companiesData from '../../tmp_data/companies_data.json';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.default,
    minHeight: '100%',
    padding: theme.spacing(3)
  }
}));

function CompanyView() {
  const classes = useStyles();

  const { companyId } = useParams();
  const company = companiesData.find(company => company.uuid === companyId);

  return (
    <Page title="Portfolio" className={classes.root}>
      
      <Typography variant="h1" >
        Company: {company?.name}
      </Typography>
      

    </Page>
  );
}

export default CompanyView;
