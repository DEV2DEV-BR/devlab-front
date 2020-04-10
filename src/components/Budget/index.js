import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import { Card, CardContent, Grid, Typography } from '@material-ui/core';
import firebase from 'firebase';
import CircularProgress from '@material-ui/core/CircularProgress';

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100%',
  },
  content: {
    alignItems: 'center',
    display: 'flex',
  },
  title: {
    fontWeight: 700,
  },
}));

const Budget = (props) => {
  const classes = useStyles();
  const [userData, setUserData] = useState([]);
  const [progress, setProgress] = useState(false);

  useEffect(() => {
    setProgress(true);
    const db = firebase.firestore();

    const usersRef = db.collection('users');

    firebase.auth().onAuthStateChanged(function (user) {
      if (user) {
        usersRef
          .where('uid', '==', user.uid)
          .get()
          .then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
              setUserData(doc.data());
              setProgress(false);
            });
          });
      }
    });
  }, []);

  useEffect(() => {
    return () => {
      setUserData('');
    };
  }, []);

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
      }}
    >
      {userData.userType === 'student' ? (
        <>
          <Card style={{ margin: '30px 0px 0px 10px' }}>
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
              <Link to="/all-new-activitys" style={{ textDecoration: 'none' }}>
                <Button
                  variant="contained"
                  size="small"
                  style={{
                    backgroundColor: '#318F6B',
                    color: '#fff',
                    width: '100%',
                  }}
                >
                  VER
                </Button>
              </Link>
            </CardContent>
          </Card>
          <Card style={{ margin: '30px 0px 0px 10px' }}>
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
              <Link to="/send-school-work" style={{ textDecoration: 'none' }}>
                <Button
                  variant="contained"
                  size="small"
                  style={{
                    backgroundColor: '#318F6B',
                    color: '#fff',
                    width: '100%',
                  }}
                >
                  ENVIAR
                </Button>
              </Link>
            </CardContent>
          </Card>
        </>
      ) : (
        ''
      )}
      {progress ? (
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            width: '100%',
            justifyContent: 'center',
            padding: 20,
          }}
        >
          <CircularProgress />
          <p style={{ margin: 10 }}>Carregando...</p>
        </div>
      ) : userData.userType === 'admin' ||
        userData.userType === 'management' ? (
        <>
          <Card style={{ margin: '30px 0px 0px 10px' }}>
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
              <Link to="/list-home-work" style={{ textDecoration: 'none' }}>
                <Button
                  variant="contained"
                  size="small"
                  style={{
                    backgroundColor: '#318F6B',
                    color: '#fff',
                    width: '100%',
                  }}
                >
                  VER
                </Button>
              </Link>
            </CardContent>
          </Card>
          <Card style={{ margin: '30px 0px 0px 10px' }}>
            <CardContent>
              <Grid container>
                <Grid item>
                  <Typography
                    className={classes.title}
                    color="textSecondary"
                    gutterBottom
                    variant="body2"
                  >
                    LIBERAÇÃO DE PROFESSORES
                  </Typography>
                </Grid>
              </Grid>
              <Link to="/teachers" style={{ textDecoration: 'none' }}>
                <Button
                  variant="contained"
                  size="small"
                  style={{
                    backgroundColor: '#318F6B',
                    color: '#fff',
                    width: '100%',
                  }}
                >
                  LIBERAR
                </Button>
              </Link>
            </CardContent>
          </Card>
          {userData.userType === 'admin' ? (
            <Card style={{ margin: '30px 0px 0px 10px' }}>
              <CardContent>
                <Grid container>
                  <Grid item>
                    <Typography
                      className={classes.title}
                      color="textSecondary"
                      gutterBottom
                      variant="body2"
                    >
                      CADASTRO DE UNIDADES
                    </Typography>
                  </Grid>
                </Grid>
                <Link to="/schools" style={{ textDecoration: 'none' }}>
                  <Button
                    variant="contained"
                    size="small"
                    style={{
                      backgroundColor: '#318F6B',
                      color: '#fff',
                      width: '100%',
                    }}
                  >
                    CADASTRAR
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ) : (
            ''
          )}
        </>
      ) : userData.userType === 'teacher' && userData.confirmed ? (
        <Card style={{ margin: '30px 0px 0px 10px' }}>
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
            <Link to="/list-home-work" style={{ textDecoration: 'none' }}>
              <Button
                variant="contained"
                size="small"
                style={{
                  backgroundColor: '#318F6B',
                  color: '#fff',
                  width: '100%',
                }}
              >
                VER
              </Button>
            </Link>
          </CardContent>
        </Card>
      ) : (
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '100%',
            height: '100%',
            backgroundColor: '#318F6B',
            color: '#fff',
            padding: 10,
            fontSize: '15px',
            borderRadius: 4,
          }}
        >
          <p>
            Seu Cadastro está em processo de liberação! Assim que a Gestão
            aprová-lo, as respectivas funções estarão disponíveis.
          </p>
        </div>
      )}
    </div>
  );
};

Budget.propTypes = {
  className: PropTypes.string,
};

export default Budget;
