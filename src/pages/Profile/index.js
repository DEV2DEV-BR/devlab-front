import { Button } from '@material-ui/core';
import Box from '@material-ui/core/Box';
import CircularProgress from '@material-ui/core/CircularProgress';
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import FormControl from '@material-ui/core/FormControl';
import Grid from '@material-ui/core/Grid';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import firebase from 'firebase';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import Copyright from '../../components/Copyright';
import MenuLeft from '../../components/MenuLeft';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
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
}));

export default function Activitys(props) {
  const classes = useStyles();
  const [image, setImage] = useState(null);
  const [inputName, setInputName] = useState('');
  const [inputEmail, setInputEmail] = useState('');
  const [inputPassword, setInputPassword] = useState('');
  const [inputConfirmPassword, setInputConfirmPassword] = useState('');
  const [progress, setProgress] = useState(false);
  const [progressLoad, setProgressLoad] = useState(false);
  const [grade, setGrade] = useState([]);
  const [school, setSchool] = useState([]);
  const [period, setPeriod] = useState([]);

  const notifySuccess = (message) => {
    toast.success(message, {
      position: 'top-right',
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });
  };

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
              setSchool(doc.data().school);
              setPeriod(doc.data().period);
              setGrade(doc.data().grade);
              setProgressLoad(false);
            });
          });
      }
    });
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleChangeGrade = (event) => {
    setGrade(event.target.value);
  };

  const handleChangeSchool = (event) => {
    setSchool(event.target.value);
  };
  const handleChangePeriod = (event) => {
    setPeriod(event.target.value);
  };

  const handleRegister = () => {
    setProgress(true);
    const db = firebase.firestore();

    var userRef = db.collection('users').doc(localStorage.getItem('user'));

    if (
      inputName !== '' &&
      school[0] !== undefined &&
      period !== '' &&
      grade !== ''
    ) {
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
                  school,
                  period,
                  grade,
                })
                .then(function () {
                  localStorage.setItem('period', period);
                  localStorage.setItem('school', school);
                  localStorage.setItem('grade', grade);
                  notifySuccess('Dados atualizados com sucesso!');
                  setProgress(false);
                })
                .catch(function (error) {
                  // The document probably doesn't exist.
                  console.error('Error updating document: ', error);
                  setProgress(false);
                });
            })
            .catch(function (error) {
              // An error happened.
              setProgress(false);
            });
        } else {
          notifyError('As senhas não conferem!');
          setProgress(false);
        }
      } else {
        userRef
          .update({
            name: inputName,
            school,
            period,
            grade,
          })
          .then(function () {
            setProgress(false);
            localStorage.setItem('period', period);
            localStorage.setItem('school', school);
            localStorage.setItem('grade', grade);
            notifySuccess('Dados atualizados com sucesso!');
          })
          .catch(function (error) {
            // The document probably doesn't exist.
            setProgress(false);
            console.error('Error updating document: ', error);
          });
      }
    } else {
      notifyError('Preencha todos os campos!');
      setProgress(false);
    }

    // console.log('register');
  };

  return (
    <div className={classes.root}>
      <CssBaseline />

      <div>
        <div className={classes.appBarSpacer} />
        <MenuLeft props={props.history} />
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
              alignItems: 'center',
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
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'center',
                    padding: 20,
                  }}
                >
                  <CircularProgress />
                  <p style={{ margin: 10 }}>Aguarde...</p>
                </div>
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
                      <InputLabel htmlFor="serie">Escola*</InputLabel>
                      <Select
                        native
                        value={school}
                        onChange={handleChangeSchool}
                        fullWidth
                        required
                        label="Escola"
                        inputProps={{
                          name: 'school',
                          id: 'school',
                        }}
                      >
                        <option aria-label="None" value="" />
                        <option value={'0HgQobTQkPyMtB7BLIBI'}>
                          EMEIF Álvares Machado
                        </option>
                        <option value={'Tr8VHeCJofsyx5nP9zIa'}>
                          EMEIF Professora Aparecida Marques Vaccaro
                        </option>
                        <option value={'cnh92zAndBb3T6DAvGsy'}>
                          EMEIF Governador Franco Montoro
                        </option>
                        <option value={'eqdFnW5EQg4JiOdwCA0Q'}>
                          EMEIF Governador Mário Covas
                        </option>
                        <option value={'oVOEa86ZL8hA8e6nOyu6'}>
                          EMEIF Márcia Helena Fernandez de Araújo
                        </option>
                        <option value={'vJG0RnawKCTIAYHjntj8'}>
                          EMEIF Vereador José Molina
                        </option>
                        <option value={'yxv6KHgmdzTGZINhBheq'}>
                          EMEIF Professora Tereza Ito Polidório
                        </option>
                      </Select>
                    </Grid>
                  </FormControl>

                  <FormControl
                    variant="outlined"
                    fullWidth
                    className={classes.formControl}
                  >
                    <Grid item xs={12}>
                      <InputLabel htmlFor="serie">Período*</InputLabel>
                      <Select
                        native
                        value={period}
                        onChange={handleChangePeriod}
                        fullWidth
                        required
                        label="Período"
                        inputProps={{
                          name: 'period',
                          id: 'period',
                        }}
                      >
                        <option aria-label="None" value="" />
                        <option value={'Matutino'}>Manhã</option>
                        <option value={'Vespertino'}>Tarde</option>
                        <option value={'Noturno'}>Noite</option>
                      </Select>
                    </Grid>
                  </FormControl>

                  <FormControl
                    variant="outlined"
                    fullWidth
                    className={classes.formControl}
                  >
                    <Grid item xs={12}>
                      <InputLabel htmlFor="serie">Série*</InputLabel>
                      <Select
                        native
                        value={grade}
                        onChange={handleChangeGrade}
                        fullWidth
                        required
                        label="Série"
                        inputProps={{
                          name: 'serie',
                          id: 'serie',
                        }}
                      >
                        <option aria-label="None" value="" />
                        <option value={1}>1º Ano</option>
                        <option value={2}>2º Ano</option>
                        <option value={3}>3º Ano</option>
                        <option value={4}>4º Ano</option>
                        <option value={5}>5º Ano</option>
                        <option value={6}>6º Ano</option>
                        <option value={7}>7º Ano</option>
                        <option value={8}>8º Ano</option>
                        <option value={9}>9º Ano</option>
                      </Select>
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
                      backgroundColor: '#318F6B',
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
                      backgroundColor: 'rgba(126,64,144,1)',
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
        <Box pt={4}>
          <Copyright />
        </Box>
      </main>
    </div>
  );
}
