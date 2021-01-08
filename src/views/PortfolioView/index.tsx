import { Box, makeStyles } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import 'fontsource-roboto';
import React from 'react';
import ChartWrapper from '../../chart/ChartWrapper';
import TestChart3 from '../../chart/TestChart3';
import Page from '../../components/Page';

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.background.default,
    minHeight: '100%',
    padding: theme.spacing(3)
  },
  paper: {
    padding: theme.spacing(3),
    textAlign: 'center',
    color: theme.palette.text.secondary
  }
}));

function FullWidthGrid() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Grid
        container
        spacing={1}
        direction="row"
        justify="flex-start"
        alignItems="flex-start"
      >
        <Grid item xs={6}>
          <Paper>
            <Typography variant="body1" gutterBottom align="left">
              &nbsp;&nbsp;&nbsp;Series-wise Investment
            </Typography>
            <Box
              display="flex"
              alignItems="center"
              justifyContent="center"
              flexWrap="wrap"
            >
              {ChartWrapper<TestChart3>(TestChart3)}
            </Box>
          </Paper>
        </Grid>

        <Grid item xs={6}>
          <Paper>
            <Typography variant="body1" gutterBottom align="left">
              Portfolio Growth
            </Typography>
            <Box
              display="flex"
              alignItems="center"
              justifyContent="center"
              flexWrap="wrap"
            >
              {ChartWrapper<TestChart3>(TestChart3)}
            </Box>
          </Paper>
        </Grid>

        <Grid item xs={3}>
          <Paper>
            <Typography variant="h2" gutterBottom align="center">
              US$ 50M
            </Typography>
            <Typography variant="caption" gutterBottom align="center">
              &nbsp;
            </Typography>
            <Typography variant="body1" gutterBottom align="center">
              Total Investment
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={3}>
          <Paper>
            <Typography variant="h2" gutterBottom align="center">
              43
            </Typography>
            <Typography variant="caption" gutterBottom align="center">
              &nbsp;
            </Typography>
            <Typography variant="body1" gutterBottom align="center">
              No. Investment
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={3}>
          <Paper>
            <Typography variant="h2" gutterBottom align="center">
              ??
            </Typography>
            <Typography variant="caption" gutterBottom align="center">
              &nbsp;
            </Typography>
            <Typography variant="body1" gutterBottom align="center">
              ???
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={3}>
          <Paper>
            <Typography variant="h2" gutterBottom align="center">
              ??
            </Typography>
            <Typography variant="caption" gutterBottom align="center">
              &nbsp;
            </Typography>
            <Typography variant="body1" gutterBottom align="center">
              ???
            </Typography>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
}
function PortfolioView() {
  const classes = useStyles();

  return (
    <Page title="Portfolio" className={classes.root}>
      <Typography variant="h1">Portfolio Allocation</Typography>

      <FullWidthGrid />
    </Page>
  );
}

export default PortfolioView;
