import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import firebase from 'firebase';
import React, { useState } from 'react';
import { customizations } from '../../configs/customizations';
import { notify } from '../../util/toast';

const useStyles = makeStyles((theme) => ({
  button: {
    display: 'block',
    marginTop: theme.spacing(2),
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
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function SignUp({ handleNext, completData }) {
  const classes = useStyles();
  const [inputName, setInputName] = useState('');
  const [inputCellphone, setInputCellphone] = useState('');
  const [progress, setProgress] = useState(false);

  const handleCreateUser = async () => {
    setProgress(true);
    const cloudFirestore = firebase.firestore();

    let user = '';

    if (completData) {
      user = firebase.auth().currentUser;
    }

    cloudFirestore
      .collection('users')
      .add({
        name: inputName,
        email: completData
          ? localStorage.getItem('@jacode-email')
          : localStorage.getItem('register-email'),
        cellphone: inputCellphone,
        uid: completData ? user.uid : localStorage.getItem('register-uid'),
        userType: 'student',
        createdAt: new Date(),
        id: '',
      })
      .then(function (docRef) {
        cloudFirestore
          .collection('users')
          .doc(`${docRef.id}`)
          .update({
            id: docRef.id,
          })
          .then(() => {
            notify('Parabéns!', 1000, 'success');
            setProgress(false);
            handleNext && handleNext(2);
          })
          .catch((error) => {
            console.error('Error adding domcument', error);
            notify('Falha no seu cadastro!', 1000, 'error');
          });
      })
      .catch(function (error) {
        console.error('Error adding domcument', error);
        notify('Falha no seu cadastro!', 1000, 'error');
      });
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <div className={classes.form}>
          <Grid container spacing={2}>
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
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="cellphone"
                value={inputCellphone}
                onChange={(event) => setInputCellphone(event.target.value)}
                label="Celular"
                name="cellphone"
                autoComplete="cellphone"
              />
            </Grid>
          </Grid>
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
              <p style={{ margin: 10 }}>Aguarde...</p>
            </div>
          ) : (
            <Button
              type="submit"
              fullWidth
              variant="contained"
              onClick={handleCreateUser}
              style={{
                backgroundColor: `${customizations?.primaryColor}`,
                color: '#fff',
              }}
              className={classes.submit}
            >
              FINALIZAR
            </Button>
          )}
        </div>
      </div>
    </Container>
  );
}
