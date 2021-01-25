import {
  Card,
  CardContent,
  CardHeader,
  createStyles,
  makeStyles,
  Theme
} from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
//import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import 'fontsource-roboto';
import React, { useEffect, useState } from 'react';
import StatefulChartWrappper from '../../chart/new/StatefulChartWrapper';
import Page from '../../components/Page';
import FundingBarChart from './FundingBarChart';
import StartupRingChart from './StartupRingChart';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
      backgroundColor: theme.palette.background.default,
      minHeight: '100%',
      padding: theme.spacing(3)
    },
    title: {
      marginBottom: theme.spacing(1)
    },
    paper: {
      padding: theme.spacing(3),
      color: theme.palette.text.secondary
    },
    chartTitle: {
      textAlign: 'center',
      fontWeight: 'bold'
    },
    round: {
      fontSize: '1.25rem'
    }
  })
);

type RoundFunding = {
  round: string;
  mean_funding: number;
  num: number;
};

export type RoundViewState = {
  round: string;
  roundFunding: RoundFunding[];
  cntAllFunding: number;
  meanAllFunding: number;
};

function RoundView() {
  const classes = useStyles();

  const [state, setState] = useState<RoundViewState>({
    round: 'Unknown',
    roundFunding: [],
    cntAllFunding: 0,
    meanAllFunding: 0
  });

  useEffect(() => {
    fetch(`https://ubs-be.herokuapp.com/get_round_data`)
      .then(res => res.json())
      .then(data => {
        const roundFunding = Object.keys(data).map(round => {
          return {
            round,
            ...data[round]
          };
        }) as RoundFunding[];

        const cntAllFunding = roundFunding.reduce(
          (prev, cur) => (prev += cur.num),
          0
        );
        const meanAllFunding = roundFunding.reduce(
          (prev, cur) => (prev += (cur.mean_funding * cur.num) / cntAllFunding),
          0
        );

        setState(state => {
          return {
            ...state,
            roundFunding,
            cntAllFunding,
            meanAllFunding
          };
        });
      });
  }, []);

  const selectedround = state.roundFunding.find(
    funding => funding.round === state.round
  );

  return (
    <Page title="Charts" className={classes.root}>
      <Typography variant="h1" className={classes.title}>
        Analysis by Round
      </Typography>

      <Grid container alignItems="center" justify="center">
        <Grid item xs={12} md={8}>
          <Typography className={classes.chartTitle}>
            Number of startups by Round
          </Typography>
          <StatefulChartWrappper
            type={StartupRingChart}
            state={state}
            setState={setState}
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <Card>
            <CardHeader
              titleTypographyProps={{ variant: 'h3' }}
              title={state.round + (!selectedround ? ' (Data not found!)' : '')}
            />
            <CardContent>
              <Grid container>
                <Grid item xs={12} md={12} xl={12}>
                  <Typography className={classes.chartTitle}>
                    Mean Funding by Round
                  </Typography>
                  <StatefulChartWrappper
                    type={FundingBarChart}
                    state={state}
                    setState={setState}
                  />
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Page>
  );
}

export default RoundView;
