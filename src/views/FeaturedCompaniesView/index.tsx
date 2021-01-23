import { makeStyles, Typography } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
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
  }
}));

function FeaturedCompaniesView() {
  const classes = useStyles();
  const [companies, setCompanies] = useState<Company[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    setLoading(true);
    fetch(`https://ubs-be.herokuapp.com/get_startup_list?page=1&rowsPerPage=50`)
      .then(res => res.json())
      .then(data => {
        setCompanies(Object.values<Company>(data.filteredStartups));
        setLoading(false);
      });
  }, []);

  return (
    <Page title="Featured Companies" className={classes.root}>
      <Typography variant="h1" className={classes.title}>
        Featured Companies
      </Typography>

      {loading ? (
        <Typography>Loading companies...</Typography>
      ) : companies.length ? (
        <CompanyList companies={companies} />
      ) : (
        <Typography>Companies Not Found!</Typography>
      )}
    </Page>
  );
}

export default FeaturedCompaniesView;
