import { makeStyles } from '@material-ui/core';
import React, { useEffect, useReducer, useRef, useState } from 'react';
import StatefulD3Chart from './StatefulD3Chart';

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
    backgroundColor: 'white',
    zIndex: 1500
  }
}));

const StatefulChartWrappper = function<
  State,
  T extends StatefulD3Chart<State>
>({
  state,
  setState,
  type
}: {
  type: {
    new (el: any, setState: any, forceUpdate: any): T;
  };
  state: State;
  setState: React.Dispatch<React.SetStateAction<State>>;
}) {
  const chartArea = useRef(null);
  const [chart, setChart] = useState<T | null>(null);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [ignored, forceUpdate] = useReducer(x => x + 1, 0);

  const classes = useStyles();

  useEffect(() => {
    if (!chart) {
      setChart(new type(chartArea.current, setState, forceUpdate));
    } else {
      chart.updateState(state);
    }
  }, [chart, classes, setState, state, ignored, type]);

  return (
    <>
      <div className={classes.chartArea} ref={chartArea}></div>
      <div id="tooltip" className={classes.tooltip}></div>
    </>
  );
};

export default StatefulChartWrappper;
