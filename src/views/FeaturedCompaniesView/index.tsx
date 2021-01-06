import { makeStyles } from '@material-ui/core';
import React from 'react';
import Page from '../../components/Page';
import Typography from '@material-ui/core/Typography';
import 'fontsource-roboto';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.default,
    minHeight: '100%',
    padding: theme.spacing(3)
  }
}));

function FeaturedCompaniesView() {
  const classes = useStyles();

  return (
    <Page title="Featured Companies" className={classes.root}>
      
      <Typography variant="h1" >
      Featured Companies
      </Typography>
      

    </Page>
  );
}

export default FeaturedCompaniesView;
