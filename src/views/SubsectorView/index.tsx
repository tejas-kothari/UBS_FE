import { makeStyles } from '@material-ui/core';
import React from 'react';
import Page from '../../components/Page';
import Typography from '@material-ui/core/Typography';
import 'fontsource-roboto';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.default,
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  }
}));

function SubsectorView() {
  const classes = useStyles();

  return (
    <Page title="Subsectors" className={classes.root}>
      
      <Typography variant="h1" >
      Subsectors
      </Typography>
      

    </Page>
  );
}

export default SubsectorView;