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
import React, { useEffect, useState, useRef } from 'react';
import Copyright from '../../components/Copyright';
import { customizations } from '../../configs/customizations';
import { notify } from '../../util/toast';
import Avatar from '@material-ui/core/Avatar';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    width: '100%',
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
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
    width: '150px',
    height: '150px',
    backgroundColor: '#d5d5d5',
    borderWidth: '5px',
    borderStyle: 'solid',
    borderColor: '#45c',

    [theme.breakpoints.down(600 + theme.spacing(2) * 2)]: {
      width: '120px',
      height: '120px',
    },
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
}));

export default function Profile(props) {
  const classes = useStyles();
  const [inputName, setInputName] = useState('');
  const [inputCellphone, setInputCellphone] = useState('');
  const [inputEmail, setInputEmail] = useState('');
  const [inputPassword, setInputPassword] = useState('');
  const [inputConfirmPassword, setInputConfirmPassword] = useState('');
  const [progress, setProgress] = useState(false);
  const [progressLoad, setProgressLoad] = useState(false);
  const [image, setImage] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const fileRef = useRef();

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
              setPreviewImage(doc.data().profileImage);
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

  const handleChangeImageCourse = (e) => {
    if (e.target.files[0]) {
      const image = e.target.files[0];

      if (image) {
        var reader = new FileReader();

        reader.onload = function () {
          setPreviewImage(reader.result);
        };

        reader.readAsDataURL(image);
      }
      setImage(image);
    }
  };

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
                  // upload image
                  notify('Dados atualizados com sucesso!', 1000, 'success');

                  setProgress(false);
                  // end upload
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
          })
          .catch(function (error) {
            // The document probably doesn't exist.
            setProgress(false);
            console.error('Error updating document: ', error);
            notify('Falha ao atualizar os dados!', 1000, 'error');
          });
      }

      if (image !== null) {
        const storage = firebase.storage();

        const uploadTask = storage
          .ref(
            `profiles/${localStorage.getItem('@jacode-email')}/${image.name}`
          )
          .put(image);
        uploadTask.on(
          'state_changed',
          (snapshot) => {},
          (error) => {
            // Error function ...
            console.log(error);
          },
          () => {
            // complete function ...
            storage
              .ref(`profiles/${localStorage.getItem('@jacode-email')}`)
              .child(image.name)
              .getDownloadURL()
              .then((url) => {
                userRef
                  .update({
                    profileImage: url,
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
              });
          }
        );
      }
    } else {
      notify('Preencha todos os campos!', 1000, 'error');
      setProgress(false);
    }
  };

  return (
    <div className={classes.root}>
      <CssBaseline />

      <main className={classes.content}>
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
                margin: 5,
              }}
            >
              {progressLoad ? (
                <Backdrop className={classes.backdrop} open={progressLoad}>
                  <CircularProgress color="inherit" />
                  <p style={{ fontSize: 18, marginLeft: 10 }}>Carregando...</p>
                </Backdrop>
              ) : (
                <>
                  <Avatar
                    className={classes.avatar}
                    src={previewImage}
                  ></Avatar>

                  <input
                    type="file"
                    onChange={handleChangeImageCourse}
                    ref={fileRef}
                  />

                  <FormControl
                    variant="outlined"
                    fullWidth
                    className={classes.formControl}
                    style={{ marginTop: 40 }}
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
