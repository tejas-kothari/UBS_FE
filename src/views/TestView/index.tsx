import { makeStyles, TextField } from '@material-ui/core';
import React, { useState } from 'react';
import Page from '../../components/Page';
import PivotChartWrapper from '../CompanyView/PivotChart/PivotChartWrapper';

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.background.default,
    minHeight: '100%',
    padding: theme.spacing(3)
  },
  chart: {
    width: '100%',
    height: '100%'
  }
}));

function PageBody({ value, setValue, classes } : {
  value: any,
  setValue: any,
  classes: any
}) {
  return (
    <>
      <TextField
        value={value}
        onChange={event => setValue(event.target.value)}
      />
      <div className={classes.chart}>
        {/* <PivotChartWrapper
          data={{
            value
          }}
        /> */}
      </div>
    </>
  );
}

function TestView() {
  const classes = useStyles();

  const [value, setValue] = useState('');

  return (
    <Page title="Test" className={classes.root}>
      <PageBody value={value} setValue={setValue} classes={classes} />
    </Page>
  );
}

export default TestView;
