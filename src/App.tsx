import { ThemeProvider } from '@material-ui/core';
import React from 'react';
import 'react-perfect-scrollbar/dist/css/styles.css';
import { useRoutes } from 'react-router-dom';
import GlobalStyles from './components/GlobalStyles';
import routes from './routes';
import theme from './theme';

const App = () => {
  const routing = useRoutes(routes);

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      {routing}
    </ThemeProvider>
  );
};

export default App;
