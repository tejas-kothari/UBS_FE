import React from "react";
import { Box, Typography } from "@material-ui/core";
import "./App.css";
import ChartWrapper from "./chart/ChartWrapper";
import TestChart from "./chart/TestChart";
import TestChart2 from "./chart/TestChart2";

function App() {
  return (
    <Box display="flex" width="100vw" alignItems="center" justifyContent="center" flexWrap="wrap">
      {ChartWrapper<TestChart>(TestChart)}
      {ChartWrapper<TestChart2>(TestChart2)}
      {ChartWrapper<TestChart>(TestChart)}
      {ChartWrapper<TestChart>(TestChart)}
      {ChartWrapper<TestChart>(TestChart)}
      {ChartWrapper<TestChart>(TestChart)}
      {/* <Typography variant="h2" gutterBottom>
        Funding by Year
      </Typography> */}
    </Box>
  );
}

export default App;
