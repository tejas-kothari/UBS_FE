import { Button, Grid, makeStyles, Paper, Typography } from '@material-ui/core';
import React, { useState } from 'react';
import StatefulChartWrappper from '../../chart/new/StatefulChartWrapper';
import Page from '../../components/Page';
import data from './data.json';
import FeaturesRingChart from './FeaturesRingChart';

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
  companyCards: {},
  paper: {
    padding: theme.spacing(3),
    textAlign: 'center',
    color: theme.palette.text.primary
  }
}));

export type FeaturesViewState = {
  selectedModel: string;
  data: any;
};

function FeaturesView() {
  const classes = useStyles();

  const [state, setState] = useState<FeaturesViewState>({
    selectedModel: 'model2',
    data
  });

  return (
    <Page title="Charts" className={classes.root}>
      <Typography variant="h1" className={classes.title}>
        Features Identified
      </Typography>
      <Paper variant="outlined" className={classes.paper}>
        <Grid container>
          <Grid item xs={12} md={12}>
            <Typography variant="h5" className={classes.title} align={'left'}>
              Relative importance of Features
            </Typography>
            <Grid>
              <StatefulChartWrappper
                type={FeaturesRingChart}
                state={state}
                setState={setState}
              />
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Button
              onClick={() =>
                setState(state => {
                  return { ...state, selectedModel: 'model1' };
                })
              }
            >
              Model 1
            </Button>
            <Button
              onClick={() =>
                setState(state => {
                  return { ...state, selectedModel: 'model2' };
                })
              }
            >
              Model 2
            </Button>
            <Button
              onClick={() =>
                setState(state => {
                  return { ...state, selectedModel: 'model3' };
                })
              }
            >
              Model 3
            </Button>
          </Grid>
        </Grid>
      </Paper>
    </Page>
  );
}

export default FeaturesView;
