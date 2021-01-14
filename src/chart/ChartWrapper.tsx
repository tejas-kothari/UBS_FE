import { makeStyles } from '@material-ui/core';
import React, { useEffect, useRef, useState } from 'react';
import { D3Chart } from './D3Chart';

const useStyles = makeStyles(theme => ({
  chartArea: {
    width: '100%'
  },
  tooltip: {
    width: 'auto',
    position: 'absolute',
    color: 'black',
    cursor: 'default',
    border: ' 1px solid',
    borderRadius: 5,
    padding: 10,
    shapeRendering: 'crispEdges',
    pointerEvents: 'none',
    backgroundColor: "white",
  }
}));

const ChartWrapper = function<T extends D3Chart>(type: {
  new (el: any, classes: any): T;
}) {
  const chartArea = useRef(null);
  const [chart, setChart] = useState<T | null>(null);

  const classes = useStyles();

  useEffect(() => {
    if (!chart) {
      setChart(new type(chartArea.current, classes));
    } else {
      chart.update();
    }
  }, [chart, classes, type]);

  return <div className={classes.chartArea} ref={chartArea}></div>;
};

export default ChartWrapper;
