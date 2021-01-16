import { makeStyles } from '@material-ui/core';
import React, { useEffect, useReducer, useRef, useState } from 'react';
import { CompanyBenchmarkState } from '../CompanyBenchmark';
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
  state: CompanyBenchmarkState;
  setState: React.Dispatch<React.SetStateAction<CompanyBenchmarkState>>;
};

const PivotChartWrapper = function({
  state,
  setState
}: PivotChartWrapperProps) {
  const chartArea = useRef<HTMLDivElement>(null);
  const [chart, setChart] = useState<PivotChart | null>(null);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [ignored, forceUpdate] = useReducer(x => x + 1, 0);

  const classes = useStyles();

  useEffect(() => {
    if (!chart) {
      if (!chartArea.current) {
        return;
      }
      setChart(
        new PivotChart(chartArea.current, classes, setState, forceUpdate)
      );
    } else {
      chart.updateState(state);
    }
  }, [chart, classes, setState, state, ignored]);

  return (
    <>
      <div className={classes.chartArea} ref={chartArea}></div>
      <div id="tooltip" className={classes.tooltip}></div>
    </>
  );
};

export default PivotChartWrapper;
