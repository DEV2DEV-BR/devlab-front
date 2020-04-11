import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import IconButton from '@material-ui/core/IconButton';
import { makeStyles } from '@material-ui/core/styles';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import clsx from 'clsx';
import firebase from 'firebase';
import React, { useEffect, useState } from 'react';
import Admin from './admin';
import ChildishOne from './childishOne';
import ChildishTwo from './childishTwo';
import FundamentalOne from './fundamentalOne';
import FundamentalTwo from './fundamentalTwo';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  toolbar: {
    paddingRight: 24, // keep right padding when drawer closed
  },
  toolbarIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  menuButtonHidden: {
    display: 'none',
  },
  title: {
    flexGrow: 1,
  },
  drawerPaper: {
    position: 'relative',
    whiteSpace: 'nowrap',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    overflowX: 'hidden',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing(7),
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9),
    },
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: '100vh',
    overflow: 'auto',
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  },
  fixedHeight: {
    height: 240,
  },
}));

export default function MenuLeft(props) {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [userData, setuserData] = useState([]);

  useEffect(() => {
    const db = firebase.firestore();

    const usersRef = db.collection('users');

    firebase.auth().onAuthStateChanged(function (user) {
      if (user) {
        usersRef
          .where('uid', '==', user.uid)
          .get()
          .then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
              setuserData(doc.data());
            });
          });
      }
    });
  }, []);

  useEffect(() => {
    return () => {
      setuserData('');
    };
  }, []);

  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <Drawer
      variant="permanent"
      classes={{
        paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose),
      }}
      open={open}
      style={{ marginTop: 40 }}
    >
      <div className={classes.toolbarIcon}>
        <IconButton onClick={open ? handleDrawerClose : handleDrawerOpen}>
          {open ? (
            <>
              <p style={{ fontSize: 12 }}>Menu</p>
              <ChevronLeftIcon />
            </>
          ) : (
            <ChevronRightIcon />
          )}
        </IconButton>
      </div>

      {userData.userType === 'student' && userData.grade === 0 ? (
        <ChildishOne props={props} />
      ) : (
        ''
      )}
      {userData.userType === 'student' && userData.grade === 10 ? (
        <ChildishTwo props={props} />
      ) : (
        ''
      )}
      {userData.userType === 'student' &&
      userData.grade > 0 &&
      userData.grade <= 5 ? (
        <FundamentalOne props={props} />
      ) : (
        ''
      )}
      {userData.userType === 'student' && userData.grade > 5 ? (
        <FundamentalTwo props={props} />
      ) : (
        ''
      )}

      {userData.userType === 'admin' || userData.userType === 'management' ? (
        <>
          <Divider />
          <Admin props={props} />
        </>
      ) : (
        ''
      )}

      {userData.userType === 'teacher' && userData.confirmed ? (
        <>
          <Divider />
          <Admin props={props} />
        </>
      ) : (
        ''
      )}

      <Divider />
    </Drawer>
  );
}
