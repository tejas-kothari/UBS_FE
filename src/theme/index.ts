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
      main: '#E60100'
    },
    secondary: {
      main: '#E60100'
    },
    text: {
      primary: colors.blueGrey[900],
      secondary: colors.blueGrey[600]
    }
  },
  shadows: ShadowTheme,
  typography: TypgoraphyTheme,
  overrides: {
    MuiSelect: {
      select: {
        '&:focus': {
          backgroundColor: colors.common.white
        }
      }
    }
  }
});

export default theme;
