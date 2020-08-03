import Avatar from '@material-ui/core/Avatar';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Checkbox from '@material-ui/core/Checkbox';
import CircularProgress from '@material-ui/core/CircularProgress';
import CssBaseline from '@material-ui/core/CssBaseline';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Grid from '@material-ui/core/Grid';
import Links from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import firebase from 'firebase';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import BackgroundSignIn from '../../assets/background-signIn.jpg';
import { email, login } from '../../services/auth';
import { notify } from '../../util/toast';
import { customizations } from '../../configs/customizations';

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Links color="inherit" href="https://jacode.com.br">
        by JA CODE softwares
      </Links>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100vh',
  },
  image: {
    backgroundImage: `url(${BackgroundSignIn})`,
    backgroundRepeat: 'no-repeat',
    backgroundColor:
      theme.palette.type === 'light'
        ? theme.palette.grey[50]
        : theme.palette.grey[900],
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  paper: {
    margin: theme.spacing(8, 4),
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
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function SignIn(props) {
  const classes = useStyles();

  const [inputEmail, setInputEmail] = useState('');
  const [inputPassword, setInputPassword] = useState('');
  const [progress, setProgress] = useState(false);
  const [idCourseFree, setIdCourseFree] = useState('');

  useEffect(() => {
    if (props.history.location.state) {
      const { idCourseFree } = props.history.location.state;

      if (idCourseFree) {
        setIdCourseFree(idCourseFree);
      }
    }
  }, []);

  const handleLogin = async (event) => {
    setProgress(true);
    event.preventDefault();

    await firebase
      .auth()
      .signInWithEmailAndPassword(inputEmail, inputPassword)
      .then((success) => {
        login(success.user.refreshToken);
        email(success.user.email);

        const db = firebase.firestore();

        const usersRef = db.collection('users');

        firebase.auth().onAuthStateChanged(function (user) {
          if (user) {
            usersRef
              .where('uid', '==', user.uid)
              .get()
              .then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                  const { id, myCourses, userType } = doc.data();

                  localStorage.setItem('userType', userType);

                  if (myCourses) {
                    localStorage.setItem(
                      'myCourses',
                      JSON.stringify(myCourses)
                    );
                  }

                  localStorage.setItem('user', id);

                  setProgress(false);
                  if (idCourseFree) {
                    props.history.push('/register-course', { idCourseFree });
                  } else {
                    props.history.push('/dashboard');
                  }
                });
              });
          }
        });
        notify('Seja bem-vindo!', 1000, 'success');
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        setProgress(false);
        console.log(errorCode, errorMessage);
        notify('E-mail ou senha incorretos!', 1000, 'error');
      });
  };

  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid item xs={false} sm={4} md={7} className={classes.image} />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Login
          </Typography>
          <form className={classes.form} onSubmit={handleLogin}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="E-mail"
              name="email"
              value={inputEmail}
              onChange={(event) => setInputEmail(event.target.value)}
              autoComplete="email"
              autoFocus
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Senha"
              type="password"
              value={inputPassword}
              onChange={(event) => setInputPassword(event.target.value)}
              id="password"
              autoComplete="current-password"
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Lembrar minha senha"
            />

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
                style={{
                  backgroundColor: `${customizations?.primaryColor}`,
                  color: '#fff',
                }}
                className={classes.submit}
              >
                LOGIN
              </Button>
            )}
            <Grid container>
              <Grid item xs>
                <Link to="/">Voltar para o início</Link>
              </Grid>
              <Grid item>
                <Link to="/sign-up">
                  {'Não tem acesso ainda? Cadastre-se!'}
                </Link>
              </Grid>
            </Grid>
            <Box mt={5}>
              <Copyright />
            </Box>
          </form>
        </div>
      </Grid>
    </Grid>
  );
}
