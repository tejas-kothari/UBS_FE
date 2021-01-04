import React from "react";
import { Box, Button } from "@material-ui/core";
import "./App.css";
import ChartWrapper from "./chart/ChartWrapper";

function App() {
  return (
    <Box display="flex" width="100vw" height="100vh" alignItems="center" justifyContent="center">
      <ChartWrapper />
    </Box>
  );
}

export default App;
