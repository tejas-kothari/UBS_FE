import { Grid, makeStyles } from '@material-ui/core';
import React from 'react';
import ChartWrapper from '../../chart/ChartWrapper';
import RingChart from '../../chart/RingChart';
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
          {ChartWrapper<RingChart>(RingChart)}
        </Grid>
      </Grid>
    </Page>
  );
}

export default ChartView;
