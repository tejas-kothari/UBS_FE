import { makeStyles } from '@material-ui/core';
import React from 'react';
import Page from '../../components/Page';
import Typography from '@material-ui/core/Typography';
import 'fontsource-roboto';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.default,
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  }
}));

function PortfolioView() {
  const classes = useStyles();

  return (
    <Page title="Portfolio" className={classes.root}>
      
      <Typography variant="h1" >
      Portfolio Allocation
      </Typography>
      

    </Page>
  );
}

export default PortfolioView;