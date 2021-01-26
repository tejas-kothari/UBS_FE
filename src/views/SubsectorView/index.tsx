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
import ChartWrapper from '../../chart/ChartWrapper';
import StatefulChartWrappper from '../../chart/new/StatefulChartWrapper';
import Page from '../../components/Page';
import FundingBarChart from './FundingBarChart';
import Legend from './Legend';
import StartupRingChart from './StartupRingChart';
import WorldMapChart from './WorldMapChart';

/*
const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.default,
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  }
}));
*/

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
    country: {
      fontSize: '1.25rem'
    },
    legend: {
      maxWidth: 500,
      width: '100%',
      margin: 'auto'
    }
  })
);

type CountryFunding = {
  country: string;
  mean_funding: number;
  num: number;
};

export type SubsectorViewState = {
  country: string;
  countriesFunding: CountryFunding[];
  cntAllFunding: number;
  meanAllFunding: number;
};

function SubsectorView() {
  const classes = useStyles();

  const [state, setState] = useState<SubsectorViewState>({
    country: 'Unknown',
    countriesFunding: [],
    cntAllFunding: 0,
    meanAllFunding: 0
  });

  useEffect(() => {
    fetch(`https://ubs-be.herokuapp.com/get_country_data`)
      .then(res => res.json())
      .then(data => {
        const countriesFunding = Object.keys(data).map(country => {
          return {
            country,
            ...data[country]
          };
        }) as CountryFunding[];

        const cntAllFunding = countriesFunding.reduce(
          (prev, cur) => (prev += cur.num),
          0
        );
        const meanAllFunding = countriesFunding.reduce(
          (prev, cur) => (prev += (cur.mean_funding * cur.num) / cntAllFunding),
          0
        );

        setState(state => {
          return {
            ...state,
            countriesFunding,
            cntAllFunding,
            meanAllFunding
          };
        });
      });
  }, []);

  const selectedCountry = state.countriesFunding.find(
    funding => funding.country === state.country
  );

  return (
    <Page title="Analysis by Country" className={classes.root}>
      <Typography variant="h1" className={classes.title}>
        Analysis by Country
      </Typography>

      <Grid container alignItems="center" justify="center">
        <Grid item xs={12} lg={8}>
          <StatefulChartWrappper
            type={WorldMapChart}
            state={state}
            setState={setState}
          />
          <div className={classes.legend}>{ChartWrapper<Legend>(Legend)}</div>
        </Grid>

        <Grid item xs={12} xl={4}>
          <Card>
            <CardHeader
              titleTypographyProps={{ variant: 'h3' }}
              title={
                state.country + (!selectedCountry ? ' (Data not found!)' : '')
              }
            />
            <CardContent>
              <Grid container justify="center">
                <Grid item xs={12} md={6} xl={12}>
                  <Typography className={classes.chartTitle}>
                    Mean Funding by Country
                  </Typography>
                  <StatefulChartWrappper
                    type={FundingBarChart}
                    state={state}
                    setState={setState}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Typography className={classes.chartTitle}>
                    Number of startups by Country
                  </Typography>
                  <StatefulChartWrappper
                    type={StartupRingChart}
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

export default SubsectorView;
