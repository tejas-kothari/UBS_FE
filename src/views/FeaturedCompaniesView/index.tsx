import { Grid, makeStyles } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import 'fontsource-roboto';
import React from 'react';
import Page from '../../components/Page';
import CompanyCard from './CompanyCard';
import CustomSelect from './CustomSelect';

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

  return (
    <Page title="Featured Companies" className={classes.root}>
      <Typography variant="h1" className={classes.title}>
        Featured Companies
      </Typography>
      <Grid container spacing={2} className={classes.selects}>
        <CustomSelect label="Category" />
        <CustomSelect label="Country" />
        <CustomSelect label="Phase" />
        <CustomSelect label="Size" />
        <CustomSelect label="Investors" />
      </Grid>
      <Grid
        container
        spacing={2}
        direction="column"
        className={classes.companyCards}
      >
        <CompanyCard />
        <CompanyCard />
        <CompanyCard />
      </Grid>
    </Page>
  );
}

export default FeaturedCompaniesView;
