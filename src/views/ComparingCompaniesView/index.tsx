import { Button, makeStyles, Typography } from '@material-ui/core';
import React from 'react';
import CompanyList from '../../components/CompanyList';
import Page from '../../components/Page';
import Company from '../../interfaces/company';

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.background.default,
    minHeight: '100%',
    padding: theme.spacing(3)
  },
  title: {
    marginBottom: theme.spacing(1)
  },
  button: {
    marginBottom: theme.spacing(3),
  }
}));

function ComparingCompaniesView() {
  const classes = useStyles();
  const companies = Object.values<Company>(
    JSON.parse(window.localStorage.getItem('comparison') || '{}')
  );

  return (
    <Page title="Featured Companies" className={classes.root}>
      <Typography variant="h1" className={classes.title}>
        Companies comparison
      </Typography>
      <Button
        variant="contained"
        className={classes.button}
        onClick={() => {
          window.localStorage.setItem('comparison', '{}');
          window.location.reload();
        }}
      >
        Reset comparison
      </Button>

      <CompanyList companies={companies} />
    </Page>
  );
}

export default ComparingCompaniesView;
