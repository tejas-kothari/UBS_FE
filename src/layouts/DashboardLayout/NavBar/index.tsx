import {
  Box,
  Drawer,
  Hidden,
  List,
  makeStyles,
  Typography
} from '@material-ui/core';
import CompareArrowsIcon from '@material-ui/icons/CompareArrows';
import LanguageIcon from '@material-ui/icons/Language';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import VpnKeyIcon from '@material-ui/icons/VpnKey';
import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import NavItem from './NavItem';

const navData = [
  {
    name: 'Companies',
    items: [
      {
        href: '/companies/list',
        icon: <StarBorderIcon />,
        title: 'Featured'
      },
      {
        href: '/companies/compare',
        icon: <CompareArrowsIcon />,
        title: 'Comparison'
      }
    ]
  },
  {
    name: 'Analysis',
    items: [
      {
        href: '/subsectors',
        icon: <LanguageIcon />,
        title: 'By Country'
      },
      {
        href: '/features',
        icon: <VpnKeyIcon />,
        title: 'By Feature'
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
