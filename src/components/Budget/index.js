import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Button from "@material-ui/core/Button";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/styles";
import { Card, CardContent, Grid, Typography } from "@material-ui/core";
import firebase from "firebase";

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100%",
  },
  content: {
    alignItems: "center",
    display: "flex",
  },
  title: {
    fontWeight: 700,
  },
}));

const Budget = (props) => {
  //   const { className, ...rest } = props;

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
      setUserDate("");
    };
  }, []);

  return (
    <>
      {userDate.userType === "student" ? (
        <>
          <Card style={{ margin: "30px 0px 0px 10px" }}>
            <CardContent>
              <Grid container>
                <Grid item>
                  <Typography
                    className={classes.title}
                    color="textSecondary"
                    gutterBottom
                    variant="body2"
                  >
                    NOVOS MATERIAIS
                  </Typography>
                </Grid>
              </Grid>
              <Link to="/all-new-activitys" style={{ textDecoration: "none" }}>
                <Button
                  variant="contained"
                  size="small"
                  style={{
                    backgroundColor: "#318F6B",
                    color: "#fff",
                    width: "100%",
                  }}
                >
                  VER
                </Button>
              </Link>
            </CardContent>
          </Card>
          <Card style={{ margin: "30px 0px 0px 10px" }}>
            <CardContent>
              <Grid container>
                <Grid item>
                  <Typography
                    className={classes.title}
                    color="textSecondary"
                    gutterBottom
                    variant="body2"
                  >
                    ENVIAR ATIVIDADES REALIZADAS
                  </Typography>
                </Grid>
              </Grid>
              <Link to="/send-school-work" style={{ textDecoration: "none" }}>
                <Button
                  variant="contained"
                  size="small"
                  style={{
                    backgroundColor: "#318F6B",
                    color: "#fff",
                    width: "100%",
                  }}
                >
                  ENVIAR
                </Button>
              </Link>
            </CardContent>
          </Card>
        </>
      ) : (
        ""
      )}

      {userDate.userType === "admin" ? (
        <>
          <Card style={{ margin: "30px 0px 0px 10px" }}>
            <CardContent>
              <Grid container>
                <Grid item>
                  <Typography
                    className={classes.title}
                    color="textSecondary"
                    gutterBottom
                    variant="body2"
                  >
                    ENTREGA DE ATIVIDADES
                  </Typography>
                </Grid>
              </Grid>
              <Link to="/list-home-work" style={{ textDecoration: "none" }}>
                <Button
                  variant="contained"
                  size="small"
                  style={{
                    backgroundColor: "#318F6B",
                    color: "#fff",
                    width: "100%",
                  }}
                >
                  VER
                </Button>
              </Link>
            </CardContent>
          </Card>
        </>
      ) : (
        ""
      )}
    </>
  );
};

Budget.propTypes = {
  className: PropTypes.string,
};

export default Budget;
