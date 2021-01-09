import { Box, makeStyles } from '@material-ui/core';
import React from 'react';
import ChartWrapper from '../../chart/ChartWrapper';
import TestChart from '../../chart/TestChart';
import TestChart2 from '../../chart/TestChart2';
import TestChart3 from '../../chart/TestChart3';
import TestChart4 from '../../chart/TestChart4';
//import TestChart5 from '../../chart/TestChart5';
import Page from '../../components/Page';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.default,
    minHeight: '100%',
    padding: theme.spacing(3)
  }
}));

function ChartView() {
  const classes = useStyles();
  
  return (
    <Page title="Charts" className={classes.root}>
      <Box
        display="flex"
        alignItems="center"
        justifyContent="center"
        flexWrap="wrap"
      >
        {ChartWrapper<TestChart>(TestChart)}
        {ChartWrapper<TestChart2>(TestChart2)}
        {ChartWrapper<TestChart3>(TestChart3)}
        {ChartWrapper<TestChart4>(TestChart4)}
        {/*ChartWrapper<TestChart5>(TestChart5)}
        {/* <Typography variant="h2" gutterBottom>
          Funding by Year
        </Typography> */}
      </Box>
    </Page>
  );
}

export default ChartView;
