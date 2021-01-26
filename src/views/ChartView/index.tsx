import { makeStyles } from '@material-ui/core';
import React from 'react';
import Page from '../../components/Page';

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.background.default,
    minHeight: '100%',
    padding: theme.spacing(3)
  }
}));

function ChartView() {
  const classes = useStyles();

  return <Page title="Charts" className={classes.root}></Page>;
}

export default ChartView;
