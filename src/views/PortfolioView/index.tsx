import { makeStyles, createStyles, Theme } from '@material-ui/core';
import React from 'react';
import Page from '../../components/Page';
import Typography from '@material-ui/core/Typography';
import 'fontsource-roboto';
import Grid, { GridSpacing } from '@material-ui/core/Grid';
import FormLabel from '@material-ui/core/FormLabel';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import RadioGroup from '@material-ui/core/RadioGroup';
import Radio from '@material-ui/core/Radio';
import Paper from '@material-ui/core/Paper';
import { csvFormatRow } from 'd3';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.default,
    minHeight: '100%',
    padding: theme.spacing(3)
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
}));

function PortfolioView() {
  const classes = useStyles();

  return (
    <Page title="Portfolio" className={classes.root}>
      
      <Typography variant="h1" >Portfolio Allocation</Typography>
      

    </Page>
  );
}

export default PortfolioView;
