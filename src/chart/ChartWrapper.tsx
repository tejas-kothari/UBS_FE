import { makeStyles } from '@material-ui/core';
import React, { useEffect, useRef, useState } from 'react';
import { D3Chart } from './D3Chart';

const useStyles = makeStyles(theme => ({
  chartArea: {
    width: '100%'
  }
}));

const ChartWrapper = function<T extends D3Chart>(type: { new (el: any): T }) {
  const chartArea = useRef(null);
  const [chart, setChart] = useState<T | null>(null);

  const classes = useStyles();

  useEffect(() => {
    if (!chart) {
      setChart(new type(chartArea.current));
    } else {
      chart.update();
    }
  }, [chart, type]);

  return <div className={classes.chartArea} ref={chartArea}></div>;
};

export default ChartWrapper;
