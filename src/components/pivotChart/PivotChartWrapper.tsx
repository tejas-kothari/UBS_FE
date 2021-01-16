import { makeStyles } from '@material-ui/core';
import React, { useEffect, useRef, useState } from 'react';
import PivotChart from './PivotChart';

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
    backgroundColor: 'white'
  }
}));

type PivotChartWrapperProps = {
  data: any;
};

const PivotChartWrapper = function({ data } : PivotChartWrapperProps) {
  const chartArea = useRef<HTMLDivElement>(null);
  const [chart, setChart] = useState<PivotChart | null>(null);

  const classes = useStyles();

  useEffect(() => {
    if (!chart) {
      if (!chartArea.current) {
        return;
      }
      console.log('init');
      setChart(new PivotChart(chartArea.current, classes));
    } else {
      console.log('update');
      chart.updateState(data);
    }
  }, [chart, classes, data]);

  return <div className={classes.chartArea} ref={chartArea}></div>;
};

export default PivotChartWrapper;
