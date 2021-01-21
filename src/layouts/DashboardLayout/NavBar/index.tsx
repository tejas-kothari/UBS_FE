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
  BarChart as BarChartIcon,
  PieChart as PieChartIcon,
  Star as StarIcon
  
} from 'react-feather';
import { useLocation } from 'react-router-dom';
import NavItem from './NavItem';

// const user = {
//   avatar: '/static/images/avatars/avatar_6.png',
//   jobTitle: 'Senior Developer',
//   name: 'Katarina Smith'
// };

const navData = [
  {
    name: 'Companies',
    items: [
      
      {
        href: '/companies/featured',
        icon: StarIcon,
        title: 'Featured'
      },
      {
        href: '/portfolio',
        icon: PieChartIcon,
        title: 'Portfolio Allocation'
      }
    ]
  },
  {
    name: 'Trends',
    items: [
      {
        href: '/subsectors',
        icon: PieChartIcon,
        title: 'Subsectors'
      },
      {
        href: '/features',
        icon: PieChartIcon,
        title: 'Features'
      }
    ]
  },
  {
    name: 'Demo',
    items: [
      {
        href: '/chart',
        icon: BarChartIcon,
        title: 'Chart Demo'
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
