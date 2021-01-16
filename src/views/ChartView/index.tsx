import { Grid, makeStyles } from '@material-ui/core';
//import { Timeline } from '@material-ui/lab';
import React from 'react';
import ChartWrapper from '../../chart/ChartWrapper';
import TestChart2 from '../../chart/TestChart2';
import TestChart3 from '../../chart/TestChart3';
import TestChart5 from '../../chart/TestChart5';
import TimelineChart from '../../chart/TimelineChart';
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

  return (
    <Page title="Charts" className={classes.root}>
      <Grid container>
        <Grid item xs={12} md={4}>
          {ChartWrapper<TestChart2>(TestChart2)}
        </Grid>
        <Grid item xs={12} md={4}>
          {ChartWrapper<TestChart3>(TestChart3)}
        </Grid>
        <Grid item xs={12} md={4}>
          {ChartWrapper<TestChart5>(TestChart5)}
        </Grid>
        <Grid item xs={12} md={4}>
          {ChartWrapper<TimelineChart>(TimelineChart)}
        </Grid>
      </Grid>
    </Page>
  );
}

export default ChartView;
