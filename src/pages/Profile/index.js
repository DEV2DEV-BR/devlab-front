import { Button } from '@material-ui/core';
import Backdrop from '@material-ui/core/Backdrop';
import Box from '@material-ui/core/Box';
import CircularProgress from '@material-ui/core/CircularProgress';
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import FormControl from '@material-ui/core/FormControl';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import firebase from 'firebase';
import React, { useEffect, useState } from 'react';
import Copyright from '../../components/Copyright';
import { customizations } from '../../configs/customizations';
import { notify } from '../../util/toast';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    width: '100%',
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
    display: 'flex',
    justifyContent: 'center',
  },
  table: {
    minWidth: 650,
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
}));

export default function Activitys(props) {
  const classes = useStyles();
  const [inputName, setInputName] = useState('');
  const [inputCellphone, setInputCellphone] = useState('');
  const [inputEmail, setInputEmail] = useState('');
  const [inputPassword, setInputPassword] = useState('');
  const [inputConfirmPassword, setInputConfirmPassword] = useState('');
  const [progress, setProgress] = useState(false);
  const [progressLoad, setProgressLoad] = useState(false);

  const loadData = () => {
    setProgressLoad(true);
    const db = firebase.firestore();

    const usersRef = db.collection('users');

    firebase.auth().onAuthStateChanged(function (user) {
      if (user) {
        usersRef
          .where('uid', '==', user.uid)
          .get()
          .then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
              setInputName(doc.data().name);
              setInputEmail(doc.data().email);
              setInputCellphone(doc.data().cellphone);
              setProgressLoad(false);
            });
          });
      }
    });
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleRegister = () => {
    setProgress(true);
    const db = firebase.firestore();

    var userRef = db.collection('users').doc(localStorage.getItem('user'));

    if (inputName !== '' && inputCellphone !== '') {
      if (inputPassword !== '' && inputConfirmPassword !== '') {
        if (inputPassword === inputConfirmPassword) {
          var user = firebase.auth().currentUser;

          user
            .updatePassword(inputPassword)
            .then(function () {
              // Update successful.
              userRef
                .update({
                  name: inputName,
                  cellphone: inputCellphone,
                })
                .then(function () {
                  notify('Dados atualizados com sucesso!', 1000, 'success');
                  setProgress(false);
                })
                .catch(function (error) {
                  // The document probably doesn't exist.
                  console.error('Error updating document: ', error);
                  notify('Falha ao atualizar os dados!', 1000, 'error');
                  setProgress(false);
                });
            })
            .catch(function (error) {
              // An error happened.
              setProgress(false);
            });
        } else {
          notify('As senhas não conferem!', 1000, 'error');
          setProgress(false);
        }
      } else {
        userRef
          .update({
            name: inputName,
            cellphone: inputCellphone,
          })
          .then(function () {
            setProgress(false);
            notify('Dados atualizados com sucesso!', 1000, 'success');
          })
          .catch(function (error) {
            // The document probably doesn't exist.
            setProgress(false);
            console.error('Error updating document: ', error);
            notify('Falha ao atualizar os dados!', 1000, 'error');
          });
      }
    } else {
      notify('Preencha todos os campos!', 1000, 'error');
      setProgress(false);
    }
  };

  return (
    <div className={classes.root}>
      <CssBaseline />

      <div>
        <div className={classes.appBarSpacer} />
      </div>

      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="lg" className={classes.container}>
          <Grid
            container
            spacing={3}
            style={{
              display: 'flex',
              flexDirection: 'column',
              width: '50%',
            }}
          >
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                margin: 10,
              }}
            >
              <h1>Meu Perfil</h1>

              {progressLoad ? (
                <Backdrop className={classes.backdrop} open={progressLoad}>
                  <CircularProgress color="inherit" />
                  <p style={{ fontSize: 18, marginLeft: 10 }}>Carregando...</p>
                </Backdrop>
              ) : (
                <>
                  {/* <Avatar
                    style={{ width: '150px', height: '150px' }}
                    className={classes.avatar}
                    src={ProfilePicture}
                  ></Avatar>

                  <input type="file" onChange={() => {}} /> */}

                  <FormControl
                    variant="outlined"
                    fullWidth
                    className={classes.formControl}
                  >
                    <Grid item xs={12}>
                      <TextField
                        autoComplete="fname"
                        name="fullName"
                        variant="outlined"
                        required
                        fullWidth
                        id="fullName"
                        value={inputName}
                        onChange={(event) => setInputName(event.target.value)}
                        label="Nome Completo"
                        autoFocus
                      />
                    </Grid>
                  </FormControl>
                  <FormControl
                    variant="outlined"
                    fullWidth
                    className={classes.formControl}
                  >
                    <Grid item xs={12}>
                      <TextField
                        variant="outlined"
                        fullWidth
                        disabled
                        id="email"
                        value={inputEmail}
                        onChange={(event) => setInputEmail(event.target.value)}
                        label="E-mail"
                        name="email"
                        autoComplete="email"
                      />
                    </Grid>
                  </FormControl>

                  <FormControl
                    variant="outlined"
                    fullWidth
                    className={classes.formControl}
                  >
                    <Grid item xs={12}>
                      <TextField
                        variant="outlined"
                        fullWidth
                        disabled
                        id="cellphone"
                        value={inputCellphone}
                        onChange={(event) =>
                          setInputCellphone(event.target.value)
                        }
                        label="Celular"
                        name="cellphone"
                        autoComplete="cellphone"
                      />
                    </Grid>
                  </FormControl>

                  <FormControl
                    variant="outlined"
                    fullWidth
                    className={classes.formControl}
                  >
                    <Grid item xs={12}>
                      <TextField
                        variant="outlined"
                        fullWidth
                        name="password"
                        label="Senha"
                        value={inputPassword}
                        onChange={(event) =>
                          setInputPassword(event.target.value)
                        }
                        type="password"
                        id="password"
                        autoComplete="current-password"
                      />
                    </Grid>
                  </FormControl>
                  <FormControl
                    variant="outlined"
                    fullWidth
                    className={classes.formControl}
                  >
                    <Grid item xs={12}>
                      <TextField
                        variant="outlined"
                        fullWidth
                        name="confirm-password"
                        label="Confirmação de senha"
                        type="password"
                        value={inputConfirmPassword}
                        onChange={(event) =>
                          setInputConfirmPassword(event.target.value)
                        }
                        id="confirm-password"
                        autoComplete="current-password"
                      />
                    </Grid>
                  </FormControl>
                </>
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
                  <p style={{ margin: 10 }}>Atualizando...</p>
                </div>
              ) : (
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    width: '100%',
                    justifyContent: 'space-between',
                  }}
                >
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    onClick={handleRegister}
                    style={{
                      backgroundColor: `${customizations?.secondaryColor}`,
                      color: '#fff',
                      marginRight: 10,
                    }}
                    className={classes.submit}
                  >
                    ATUALIZAR
                  </Button>
                  <Button
                    fullWidth
                    variant="contained"
                    style={{
                      backgroundColor: `${customizations?.primaryColor}`,
                      color: '#fff',
                    }}
                    className={classes.submitRight}
                  >
                    Cancelar
                  </Button>
                </div>
              )}
            </div>
          </Grid>
        </Container>
        <Box pt={4} style={{ marginBottom: 10 }}>
          <Copyright />
        </Box>
      </main>
    </div>
  );
}
