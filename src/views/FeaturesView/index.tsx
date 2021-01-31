import { Button, Grid, makeStyles, Paper, Typography } from '@material-ui/core';
import React, { useState } from 'react';
import StatefulChartWrappper from '../../chart/StatefulChartWrapper';
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
  },
  button: {
    marginRight: theme.spacing(1)
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
    <Page title="Analysis by Feature" className={classes.root}>
      <Typography variant="h1" className={classes.title}>
        Features Importance
      </Typography>
      <Paper variant="outlined" className={classes.paper}>
        <Grid container>
          <Grid item xs={12} md={12}>
            {/* <Typography variant="h5" className={classes.title} align={'left'}>
              Relative importance of Features
            </Typography> */}
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
              variant="contained"
              className={classes.button}
              color={state.selectedModel === 'model1' ? 'primary' : 'default'} //add buttons
              onClick={() =>
                setState(state => {
                  return { ...state, selectedModel: 'model1' };
                })
              }
            >
              Model 1<br />
              700-1M
            </Button>
            <Button
              variant="contained"
              className={classes.button}
              color={state.selectedModel === 'model2' ? 'primary' : 'default'}
              onClick={() =>
                setState(state => {
                  return { ...state, selectedModel: 'model2' };
                })
              }
            >
              Model 2<br />
              1M-6.5M
            </Button>
            <Button
              variant="contained"
              className={classes.button}
              color={state.selectedModel === 'model3' ? 'primary' : 'default'}
              onClick={() =>
                setState(state => {
                  return { ...state, selectedModel: 'model3' };
                })
              }
            >
              Model 3<br />
              6.5M-1.7B
            </Button>
          </Grid>
        </Grid>
      </Paper>
    </Page>
  );
}

export default FeaturesView;
