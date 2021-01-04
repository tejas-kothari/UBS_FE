import React from "react";
import { Box, Typography } from "@material-ui/core";
import "./App.css";
import ChartWrapper from "./chart/ChartWrapper";

function App() {
  return (
    <Box display="flex" width="100vw" height="100vh" alignItems="center" justifyContent="center" flexDirection="column">
      <ChartWrapper />
      {/* <Typography variant="h2" gutterBottom>
        Funding by Year
      </Typography> */}
    </Box>
  );
}

export default App;
