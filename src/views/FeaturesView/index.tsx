import { Grid, makeStyles, Typography } from '@material-ui/core';
//import { Timeline } from '@material-ui/lab';
import React from 'react';
//import BarChart from '../../chart/BarChart';
import ChartWrapper from '../../chart/ChartWrapper';
import RingChart from '../../chart/RingChart';

import Page from '../../components/Page';

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

function FeaturesView() {
  const classes = useStyles();

  return (
    <Page title="Charts" className={classes.root}>
      <Typography variant="h1" className={classes.title}>
        Features Identified
      </Typography>
      <Grid container>

       {/* <Grid item xs={12} md={4}>
          
            {ChartWrapper<BarChart>(BarChart)}
          
        </Grid> */}

        <Grid item xs={12} md={12}>
          
            {ChartWrapper<RingChart>(RingChart)}
          
        </Grid>
      </Grid>
    </Page>
  );
}

export default FeaturesView;