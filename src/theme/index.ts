import { createMuiTheme, colors } from '@material-ui/core';
import ShadowTheme from './shadows';
import TypgoraphyTheme from './typography';

const theme = createMuiTheme({
  palette: {
    background: {
      paper: colors.common.white,
      default: '#F4F6F8'
    },
    primary: {
      main: colors.indigo[500]
    },
    secondary: {
      main: colors.indigo[500]
    },
    text: {
      primary: colors.blueGrey[900],
      secondary: colors.blueGrey[600]
    }
  },
  shadows: ShadowTheme,
  typography: TypgoraphyTheme
});

export default theme;
