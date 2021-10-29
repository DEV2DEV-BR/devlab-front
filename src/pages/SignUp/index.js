import {
  Avatar, Button, CircularProgress, FormControl, Grid, IconButton, InputAdornment, InputLabel, OutlinedInput, Paper, TextField,
  Typography
} from '@material-ui/core';
import { LockOutlined, Visibility, VisibilityOff } from '@material-ui/icons';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Copyright from '../../components/Copyright';
import { customizations } from '../../configs/customizations';
import apiBackend from '../../services/apiBackend';
import { notify } from '../../util/toast';
import { returnError } from '../../util/handleError';
import { useStyles } from './styles';

export default function SignUp({ history }) {
  const classes = useStyles();

  const [inputName, setInputName] = useState('');
  const [inputEmail, setInputEmail] = useState('');
  const [inputPassword, setInputPassword] = useState('');
  const [inputConfirmPassword, setInputConfirmPassword] = useState('');
  const [progress, setProgress] = useState(false);
  const [showPassword, setShowPassword] = useState(false)


  useEffect(() => {
    return () => {
      setProgress(false);
    }
  },[]);

  const handleRegister = async (event) => {
    event.preventDefault();
    try {
      setProgress(true);

      if (inputPassword !== inputConfirmPassword) {
        return notify('As senhas não conferem', 1000, 'error');
      }
      const { data } = await apiBackend.post('/users', {
        name: inputName,
        email: inputEmail,
        password: inputPassword
      });
      notify(data.message, 1000, 'success');

      history.push('/');
    } catch (error) {
      returnError(error);
    } finally {
      setProgress(false)
    }
  };
  return (
    <>
      <Grid container component="main" className={classes.root}>

        <Grid item xs={12} sm={8} md={5} component={Paper} className={classes.container}>
          <div className={classes.paper}>
            <Avatar className={classes.avatar}>
              <LockOutlined />
            </Avatar>
            <Typography component="h1" variant="h5">
              Cadastrar
            </Typography>
            <form className={classes.form} onSubmit={handleRegister}>
              <TextField
                className={classes.textField}
                variant="outlined"
                required
                fullWidth
                id="name"
                label="Nome"
                name="name"
                value={inputName}
                onChange={(event) => setInputName(event.target.value)}
                autoComplete="name"
                autoFocus
              />

              <TextField
                className={classes.textField}
                variant="outlined"
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

              <FormControl
                className={classes.textField}
                variant="outlined"
                fullWidth>
                <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                <OutlinedInput
                  id="outlined-adornment-password"
                  type={showPassword ? 'text' : 'password'}
                  fullWidth
                  value={inputPassword}
                  onChange={(event) => setInputPassword(event.target.value)}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={() => setShowPassword(!showPassword)}
                        edge="end"
                      >
                        {showPassword ? <Visibility /> : <VisibilityOff />}
                      </IconButton>
                    </InputAdornment>
                  }
                  labelWidth={70}
                />
              </FormControl>

              <FormControl
                className={classes.textField}
                variant="outlined"
                fullWidth>
                <InputLabel htmlFor="outlined-adornment-password">Confirm password</InputLabel>
                <OutlinedInput
                  id="outlined-adornment-password"
                  type={showPassword ? 'text' : 'password'}
                  fullWidth
                  value={inputConfirmPassword}
                  onChange={(event) => setInputConfirmPassword(event.target.value)}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={() => setShowPassword(!showPassword)}
                        edge="end"
                      >
                        {showPassword ? <Visibility /> : <VisibilityOff />}
                      </IconButton>
                    </InputAdornment>
                  }
                  labelWidth={70}
                />
              </FormControl>

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
                  CADASTRAR
                </Button>
              )}
              <Grid container justify="flex-end">
                <Grid item>
                  <Link to="/sign-in">Já tem cadastro? Faça login!</Link>
                </Grid>
              </Grid>
            </form>
          </div>
          <Copyright />
        </Grid>
        <Grid item xs={false} sm={4} md={7} className={classes.image} />
      </Grid>
    </>
  );
}
