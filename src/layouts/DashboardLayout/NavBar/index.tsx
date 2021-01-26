import {
  Box,
  Drawer,
  Hidden,
  List,
  makeStyles,
  Typography
} from '@material-ui/core';
import React, { useEffect } from 'react';
import {
  Globe as WorldIcon,
  
  Star as StarIcon, 
  RefreshCcw as RoundIcon
} from 'react-feather';
import { useLocation } from 'react-router-dom';
import NavItem from './NavItem';

const navData = [
  {
    name: 'Companies',
    items: [
      {
        href: '/companies/list',
        icon: StarIcon,
        title: 'Featured'
      }
      // {
      //   href: '/companies/list',
      //   icon: ListIcon,
      //   title: 'Full List'
      // }
    ]
  },
  {
    name: 'Analysis',
    items: [
      {
        href: '/subsectors',
        icon: WorldIcon,
        title: 'By Country'
      },
      /*{
        href: '/features',
        icon: KeyIcon,
        title: 'By Feature'
      },*/
      {
        href: '/rounds',
        icon: RoundIcon,
        title: 'By Round'
      }
    ]
  }
];

const useStyles = makeStyles(() => ({
  mobileDrawer: {
    width: 256
  },
  desktopDrawer: {
    width: 256,
    top: 64,
    height: 'calc(100% - 64px)'
  },
  avatar: {
    cursor: 'pointer',
    width: 64,
    height: 64
  }
}));

type NavBarProps = {
  onMobileClose: (
    event?: {},
    reason?: 'backdropClick' | 'escapeKeyDown'
  ) => void;
  openMobile: boolean;
};

const NavBar = ({ onMobileClose, openMobile }: NavBarProps) => {
  const classes = useStyles();
  const location = useLocation();

  useEffect(() => {
    if (openMobile && onMobileClose) {
      onMobileClose();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname]);

  const content = (
    <Box height="100%" display="flex" flexDirection="column">
      {/* <Box alignItems="center" display="flex" flexDirection="column" p={2}>
        <Avatar
          className={classes.avatar}
          component={RouterLink}
          src={user.avatar}
          to="/app/account"
        />
        <Typography color="textPrimary" variant="h5">
          {user.name}
        </Typography>
        <Typography color="textSecondary" variant="body2">
          {user.jobTitle}
        </Typography>
      </Box>
      <Divider /> */}
      <Box p={2}>
        <List>
          {navData.map(nav => (
            <React.Fragment key={nav.name}>
              <Typography component="div">{nav.name}</Typography>
              <List>
                {nav.items.map(item => (
                  <NavItem
                    href={item.href}
                    key={item.title}
                    title={item.title}
                    icon={item.icon}
                  />
                ))}
              </List>
            </React.Fragment>
          ))}
        </List>
      </Box>
    </Box>
  );

  return (
    <>
      <Hidden lgUp>
        <Drawer
          anchor="left"
          classes={{ paper: classes.mobileDrawer }}
          onClose={onMobileClose}
          open={openMobile}
          variant="temporary"
        >
          {content}
        </Drawer>
      </Hidden>
      <Hidden mdDown>
        <Drawer
          anchor="left"
          classes={{ paper: classes.desktopDrawer }}
          open
          variant="persistent"
        >
          {content}
        </Drawer>
      </Hidden>
    </>
  );
};

NavBar.defaultProps = {
  onMobileClose: () => {},
  openMobile: false
};

export default NavBar;
