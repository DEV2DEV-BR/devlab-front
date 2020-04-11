import React, { useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import { Link } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import firebase from 'firebase';
import { toast } from 'react-toastify';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Copyright from '../../components/Copyright';
import CircularProgress from '@material-ui/core/CircularProgress';

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

export default function SignUp(props) {
  const classes = useStyles();
  const [inputName, setInputName] = useState('');
  const [inputEmail, setInputEmail] = useState('');
  const [inputPassword, setInputPassword] = useState('');
  const [inputConfirmPassword, setInputConfirmPassword] = useState('');
  const [progress, setProgress] = useState(false);

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

  const handleRegister = async (event) => {
    event.preventDefault();

    setProgress(true);

    const name = inputName;

    if (
      inputName !== '' &&
      inputEmail !== '' &&
      inputPassword !== '' &&
      inputConfirmPassword !== ''
    ) {
      if (inputPassword === inputConfirmPassword) {
        await firebase
          .auth()
          .createUserWithEmailAndPassword(inputEmail, inputPassword)
          .then(function (success) {
            const cloudFirestore = firebase.firestore();

            cloudFirestore
              .collection('users')
              .add({
                name,
                email: success.user.email,
                uid: success.user.uid,
                userType: 'teacher',
                confirmed: false,
                id: '',
              })
              .then(function (doc) {
                cloudFirestore.collection('users').doc(doc.id).update({
                  id: doc.id,
                });
                setProgress(false);
                notifySuccess('Parabéns!');
                props.history.push('/signIn');
              })
              .catch(function (error) {
                console.error('Error adding domcument', error);
              });
          })
          .catch(function (error) {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorCode, errorMessage);
          });
      } else {
        notifyError('Password does not match!');
      }
    } else {
      notifyError('Preencha todos os campos');
      setProgress(false);
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Cadastre-se
        </Typography>
        <form className={classes.form} onSubmit={handleRegister}>
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
                id="email"
                value={inputEmail}
                onChange={(event) => setInputEmail(event.target.value)}
                label="E-mail"
                name="email"
                autoComplete="email"
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Senha"
                value={inputPassword}
                onChange={(event) => setInputPassword(event.target.value)}
                type="password"
                id="password"
                autoComplete="current-password"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
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
              style={{ backgroundColor: 'rgba(126,64,144,1)', color: '#fff' }}
              className={classes.submit}
            >
              Cadastrar
            </Button>
          )}
          <Grid container justify="flex-end">
            <Grid item xs>
              <Link to="/">Voltar para o início</Link>
            </Grid>
            <Grid item>
              <Link to="/signIn">Já tem cadastro? Faça login!</Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={5} style={{ marginBottom: 20 }}>
        <Copyright />
      </Box>
    </Container>
  );
}
