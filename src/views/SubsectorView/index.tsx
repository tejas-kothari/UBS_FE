import { makeStyles, createStyles, Theme } from '@material-ui/core';
import React from 'react';
import Page from '../../components/Page';
import Typography from '@material-ui/core/Typography';
import 'fontsource-roboto';
import Grid, { GridSpacing } from '@material-ui/core/Grid';
import FormLabel from '@material-ui/core/FormLabel';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import RadioGroup from '@material-ui/core/RadioGroup';
import Radio from '@material-ui/core/Radio';
import Paper from '@material-ui/core/Paper';
import { csvFormatRow } from 'd3';

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
    },
    paper: {
      padding: theme.spacing(2),
      textAlign: 'center',
      color: theme.palette.text.secondary,
    },
  }),
);

function FullWidthGrid() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Grid container spacing={3}
      direction="row"
      justify="flex-start"
      alignItems="flex-start">
        
        <Grid item xs={12} sm={6}>
          <Paper>Subsectors</Paper>
          <Paper>Subsectors Subsectors</Paper>
          <Paper>Subsectors Subsectors</Paper>
        </Grid>       
        <Grid item xs={12} sm={6}>
          <Paper>Subsectors</Paper>
          <Paper>Subsectors Subsectors</Paper>
          <Paper>Subsectors Subsectors</Paper>
        </Grid>

        <Grid item xs={12} sm={6}>
          <Paper>Subsectors</Paper>
          <Paper>Subsectors Subsectors</Paper>
          <Paper>Subsectors Subsectors</Paper>
        </Grid>

        <Grid item xs={12} sm={6}>
          <Paper>Subsectors</Paper>
          <Paper>Subsectors Subsectors</Paper>
          <Paper>Subsectors Subsectors</Paper>
        </Grid>

        <Grid item xs={12} sm={6}>
          <Paper>Subsectors</Paper>
          <Paper>Subsectors Subsectors</Paper>
          <Paper>Subsectors Subsectors</Paper>
        </Grid>

      </Grid>
    </div>
  );
}

function SubsectorView() {
  const classes = useStyles();

  return (
    <Page title="Subsectors" className={classes.root}>

          <Typography variant="h1" >
            Subsectors
      </Typography>
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