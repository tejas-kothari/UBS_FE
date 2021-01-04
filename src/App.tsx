import React from "react";
import { Box, Typography } from "@material-ui/core";
import "./App.css";
import ChartWrapper from "./chart/ChartWrapper";
import TestChart from "./chart/TestChart";
import TestChart2 from "./chart/TestChart2";
import TestChart3 from "./chart/TestChart3";
import TestChart4 from "./chart/TestChart4";

function App() {
  return (
    <Box display="flex" width="100vw" alignItems="center" justifyContent="center" flexWrap="wrap">
      {ChartWrapper<TestChart>(TestChart)}
      {ChartWrapper<TestChart2>(TestChart2)}
      {ChartWrapper<TestChart3>(TestChart3)}
      {ChartWrapper<TestChart4>(TestChart4)}
      {/* <Typography variant="h2" gutterBottom>
        Funding by Year
      </Typography> */}
    </Box>
  );
}

export default App;
