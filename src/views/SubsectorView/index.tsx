import {
  Card,
  CardContent,
  CardHeader,
  createStyles,
  makeStyles,
  Paper,
  Theme
} from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
//import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import 'fontsource-roboto';
import React, { useState } from 'react';
import StatefulChartWrappper from '../../chart/new/StatefulChartWrapper';
import Page from '../../components/Page';
import FundingBarChart from './FundingBarChart';
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
    }
  })
);

export type SubsectorViewState = {
  country: string;
};

function SubsectorView() {
  const classes = useStyles();

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [state, setState] = useState<SubsectorViewState>({
    country: 'Unknown'
  });

  return (
    <Page title="Charts" className={classes.root}>
      <Typography variant="h1" className={classes.title}>
        Analysis by country
      </Typography>

      <Paper variant="outlined" className={classes.paper}>
        <Grid container alignItems="stretch" justify="center">
          <Grid item xs={12} lg={8}>
            <StatefulChartWrappper
              type={WorldMapChart}
              state={state}
              setState={setState}
            />
          </Grid>
          <Grid item xs={12} lg={4}>
            <Card>
              <CardHeader title={state.country} />
              <CardContent>
                <Typography>
                  Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                  Error eum itaque iste libero optio cumque velit animi, quasi
                  voluptatem provident deleniti, architecto quas! Illo nesciunt
                  nobis possimus ducimus assumenda incidunt?
                </Typography>
                <StatefulChartWrappper
                  type={FundingBarChart}
                  state={state}
                  setState={setState}
                />
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Paper>
    </Page>
  );
}

export default SubsectorView;
