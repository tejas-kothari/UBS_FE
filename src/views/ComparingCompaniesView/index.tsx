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

  // Get the comparison list in local storage
  const companies = Object.values<Company>(
    JSON.parse(window.localStorage.getItem('comparison') || '{}')
  );

  return (
    <Page title="Companies Comparison" className={classes.root}>
      <Typography variant="h1" className={classes.title}>
        Companies Comparison
      </Typography>
      <Button
        variant="contained"
        className={classes.button}
        onClick={() => {
          // Reset the comparison list in local storage
          window.localStorage.setItem('comparison', '{}');
          // Reload the page to reflect the changes
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
