import { createStyles, makeStyles, Theme } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import 'fontsource-roboto';
import React from 'react';
import Page from '../../components/Page';

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

function FullWidthGrid() {
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
            <Typography variant="body1" gutterBottom>
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
            <Typography variant="body2" gutterBottom>
              Total Investments &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;YOY
              Increase
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={3}>
          <Paper>
            <Typography variant="body1" gutterBottom>
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
            <Typography variant="body2" gutterBottom>
              Total Investments &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;YOY
              Increase
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={6} />

        <Grid item xs={3}>
          <Paper>
            <Typography variant="body1" gutterBottom>
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
            <Typography variant="body2" gutterBottom>
              Total Investments &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;YOY
              Increase
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={3}>
          <Paper>
            <Typography variant="body1" gutterBottom>
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
            <Typography variant="body2" gutterBottom>
              Total Investments &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;YOY
              Increase
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={6} />

        <Grid item xs={3}>
          <Paper>
            <Typography variant="body1" gutterBottom>
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
            <Typography variant="body2" gutterBottom>
              Total Investments &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;YOY
              Increase
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={3}>
          <Paper>
            <Typography variant="body1" gutterBottom>
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
            <Typography variant="body2" gutterBottom>
              Total Investments &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;YOY
              Increase
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={6} />
      </Grid>
    </div>
  );
}

function SubsectorView() {
  const classes = useStyles();

  return (
    <Page title="Subsectors" className={classes.root}>
      <Typography variant="h1">Subsectors</Typography>
      {/*<Grid
        container
        direction="row"
        justify="flex-start"
        alignItems="flex-start"
      />*/}
      <FullWidthGrid />
    </Page>
  );
}

export default SubsectorView;
