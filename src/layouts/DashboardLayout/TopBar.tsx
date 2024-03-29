import {
  AppBar,
  Box,
  Hidden,
  IconButton,
  makeStyles,
  Toolbar
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import clsx from 'clsx';
import React from 'react';
import { Link as RouterLink } from 'react-router-dom';

const useStyles = makeStyles(theme => ({
  root: {
    zIndex: theme.zIndex.drawer + 1,
    backgroundColor: 'white'
  },
  toolbar: {
    minHeight: 64
  },
  avatar: {
    width: 60,
    height: 60
  },
  menuBtn: {
    color: theme.palette.text.secondary
  }
}));

type TopBarProps = {
  className: string;
  onMobileNavOpen:
    | ((event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void)
    | undefined;
  [x: string]: any;
};

const TopBar = ({ className, onMobileNavOpen, ...rest }: TopBarProps) => {
  const classes = useStyles();
  // const [notifications] = useState([]);

  return (
    <AppBar className={clsx(classes.root, className)} elevation={2} {...rest}>
      <Toolbar className={classes.toolbar}>
        <RouterLink to="/">
          <img src="/static/ubs-logo-svg.svg" alt="UBS Team 1" height="50px" />
        </RouterLink>
        <Box flexGrow={1} />
        <Hidden lgUp>
          <IconButton color="secondary" onClick={onMobileNavOpen} className={classes.menuBtn}>
            <MenuIcon />
          </IconButton>
        </Hidden>
      </Toolbar>
    </AppBar>
  );
};

export default TopBar;
