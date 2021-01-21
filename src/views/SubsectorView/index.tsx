import { createStyles, makeStyles, Theme } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
//import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import 'fontsource-roboto';
import React, { useState } from 'react';
import ChartWrapper from '../../chart/ChartWrapper';
import Page from '../../components/Page';
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
    paper: {
      padding: theme.spacing(3),
      textAlign: 'center',
      color: theme.palette.text.secondary
    }
  })
);

/*function FullWidthGrid() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Grid
        container
        spacing={3}
        direction="row"
        justify="flex-start"
        alignItems="flex-start"
      >
        <Grid item xs={3}>
          <Paper>
            <Typography variant="h3" gutterBottom>
              Subsectors
            </Typography>
            <Typography variant="body1" gutterBottom>
              &nbsp;
            </Typography>
            <Typography variant="h5" gutterBottom>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;$$$
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              $$$
            </Typography>
            <Typography variant="h6" gutterBottom>
              Total Investments &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;YOY
              Increase
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={3}>
          <Paper>
            <Typography variant="h3" gutterBottom>
              Subsectors
            </Typography>
            <Typography variant="body1" gutterBottom>
              &nbsp;
            </Typography>
            <Typography variant="h5" gutterBottom>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;$$$
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              $$$
            </Typography>
            <Typography variant="h6" gutterBottom>
              Total Investments &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;YOY
              Increase
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={6} />

        <Grid item xs={3}>
          <Paper>
            <Typography variant="h3" gutterBottom>
              Subsectors
            </Typography>
            <Typography variant="body1" gutterBottom>
              &nbsp;
            </Typography>
            <Typography variant="h5" gutterBottom>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;$$$
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              $$$
            </Typography>
            <Typography variant="h6" gutterBottom>
              Total Investments &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;YOY
              Increase
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={3}>
          <Paper>
            <Typography variant="h3" gutterBottom>
              Subsectors
            </Typography>
            <Typography variant="body1" gutterBottom>
              &nbsp;
            </Typography>
            <Typography variant="h5" gutterBottom>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;$$$
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              $$$
            </Typography>
            <Typography variant="h6" gutterBottom>
              Total Investments &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;YOY
              Increase
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={6} />

        <Grid item xs={3}>
          <Paper>
            <Typography variant="h3" gutterBottom>
              Subsectors
            </Typography>
            <Typography variant="body1" gutterBottom>
              &nbsp;
            </Typography>
            <Typography variant="h5" gutterBottom>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;$$$
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              $$$
            </Typography>
            <Typography variant="h6" gutterBottom>
              Total Investments &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;YOY
              Increase
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={3}>
          <Paper>
            <Typography variant="h3" gutterBottom>
              Subsectors
            </Typography>
            <Typography variant="body1" gutterBottom>
              &nbsp;
            </Typography>
            <Typography variant="h5" gutterBottom>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;$$$
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              $$$
            </Typography>
            <Typography variant="h6" gutterBottom>
              Total Investments &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;YOY
              Increase
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={6} />
      </Grid>
    </div>
  );
}*/

type SubsectorViewState = {
  country: string;
}

function SubsectorView() {
  const classes = useStyles();

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [state, setState] = useState<SubsectorViewState>({
    country: "Unknown"
  });

  return (
    <Page title="Subsectors" className={classes.root}>
      <Typography variant="h1">Subsectors</Typography>
      {/*<Grid
        container
        direction="row"
        justify="flex-start"
        alignItems="flex-start"
      />*/}
      <Grid container>
        <Grid item xs={12}>
          {ChartWrapper<WorldMapChart>(WorldMapChart)}
        </Grid>
        <Grid item xs={12}>
          <Typography>{state.country}</Typography>
        </Grid>
      </Grid>
    </Page>
  );
}

export default SubsectorView;
