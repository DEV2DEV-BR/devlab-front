import React, { useState, useEffect } from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Badge from "@material-ui/core/Badge";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import { toast } from "react-toastify";
import { logout } from "../../services/auth";
import firebase from "firebase";
import clsx from "clsx";
import Logo from "../../assets/logo.png";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  toolbar: {
    paddingRight: 24, // keep right padding when drawer closed
  },
  toolbarIcon: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: "0 8px",
    ...theme.mixins.toolbar,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  menuButtonHidden: {
    display: "none",
  },
  title: {
    flexGrow: 1,
  },

  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: "100vh",
    overflow: "auto",
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(2),
    display: "flex",
    overflow: "auto",
    flexDirection: "column",
  },
  fixedHeight: {
    height: 240,
  },
}));

export default function NavBarDashboard(props) {
  const classes = useStyles();

  const [userDate, setUserDate] = useState([]);

  useEffect(() => {
    const db = firebase.firestore();

    const usersRef = db.collection("users");

    firebase.auth().onAuthStateChanged(function (user) {
      if (user) {
        usersRef
          .where("uid", "==", user.uid)
          .get()
          .then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
              setUserDate(doc.data());
            });
          });
      }
    });
  }, []);

  useEffect(() => {
    return () => {
      setUserDate(false);
    };
  }, []);

  const notifyError = (message) => {
    toast.error(message, {
      position: "top-right",
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
    notifyError("Até logo!");
    props.history.push("/");
  };

  return (
    <AppBar
      position="absolute"
      className={clsx(classes.appBar)}
      style={{ backgroundColor: "#7e4090" }}
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
            style={{ textDecoration: "none", color: "#fff" }}
            to="/dashboard"
          >
            <img
              src={Logo}
              style={{ maxHeight: 90, padding: 0, margin: 0 }}
              alt="Logo"
            />
          </Link>
        </Typography>

        <div style={{ display: "flex", flexDirection: "column", fontSize: 12 }}>
          <p style={{ padding: 0, margin: 0 }}>
            <b>Bem vindo:</b> {userDate.name}
          </p>
          <p style={{ padding: 0, margin: 0 }}>
            <b>Perfil atual:</b> {userDate.userType}
          </p>
        </div>

        <IconButton color="inherit" onClick={handleLogout}>
          <Badge color="secondary">
            <ExitToAppIcon />
          </Badge>
          <p style={{ fontSize: 15, margin: 5 }}>Sair</p>
        </IconButton>
      </Toolbar>
    </AppBar>
  );
}
