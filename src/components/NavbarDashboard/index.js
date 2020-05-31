import AppBar from '@material-ui/core/AppBar';
import Badge from '@material-ui/core/Badge';
import IconButton from '@material-ui/core/IconButton';
import { makeStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import clsx from 'clsx';
import firebase from 'firebase';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { logout } from '../../services/auth';

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

export default function NavBarDashboard(props) {
  const classes = useStyles();

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
      setuserData(false);
    };
  }, []);

  const notifyError = (message) => {
    toast.error(message, {
      position: 'top-right',
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });
  };

  const handleLogout = () => {
    logout();
    firebase.auth().signOut();
    localStorage.clear();
    notifyError('Até logo!');
    props.history.push('/');
  };

  const handleShop = () => {
    props.history.push('/');
  };

  return (
    <AppBar
      position="absolute"
      className={clsx(classes.appBar)}
      style={{ backgroundColor: '#7e4090' }}
    >
      <Toolbar className={classes.toolbar}>
        <Typography
          component="h1"
          variant="h6"
          color="inherit"
          noWrap
          className={classes.title}
        >
          <Link
            style={{ textDecoration: 'none', color: '#fff' }}
            to="/dashboard"
          >
            {/* <img
              src={Logo}
              style={{ height: '50px', padding: 0, margin: 0 }}
              alt="Logo"
            /> */}
            <b>{`<JACODE/> XD`}</b>
          </Link>
        </Typography>

        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            fontSize: 9,
            margin: 0,
          }}
        >
          <div>
            <IconButton
              color="inherit"
              onClick={handleShop}
              style={{ marginRight: 15, padding: 0 }}
            >
              <Badge color="secondary">
                <ShoppingCartIcon />
              </Badge>
              <p style={{ fontSize: 12, margin: 2 }}>Loja</p>
            </IconButton>
            <IconButton
              color="inherit"
              onClick={handleLogout}
              style={{ margin: 0, padding: 0 }}
            >
              <Badge color="secondary">
                <ExitToAppIcon />
              </Badge>
              <p style={{ fontSize: 12, margin: 2 }}>Sair</p>
            </IconButton>
          </div>

          <p style={{ padding: 0, margin: '10px 0px 0px 6px' }}>
            <b>Bem vindo:</b> {userData.name}
          </p>
        </div>
      </Toolbar>
    </AppBar>
  );
}
