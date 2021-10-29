import {
  Avatar, Button, Checkbox,
  CircularProgress, FormControl, FormControlLabel,
  Grid, IconButton, InputAdornment, InputLabel, OutlinedInput, Paper, TextField,
  Typography
} from '@material-ui/core';
import { LockOutlined, Visibility, VisibilityOff } from '@material-ui/icons';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Copyright from '../../components/Copyright';
import ModalRecovery from '../../components/ModalRecovery';
import { customizations } from '../../configs/customizations';
import useUsers from '../../hooks/Users/useUsers';
import apiBackend from '../../services/apiBackend';
import { returnError } from '../../util/handleError';
import { useStyles } from './styles';

export default function SignIn(props) {
  const classes = useStyles();
  const { storageUserData } = useUsers();

  const [inputEmail, setInputEmail] = useState('danieldeandradelopes@gmail.com');
  const [inputPassword, setInputPassword] = useState('lop32145');
  const [progress, setProgress] = useState(false);
  const [open, setOpen] = useState(false);
  const [showPassword, setShowPassword] = useState(false)

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      setProgress(true);
      const { data } = await apiBackend.post('/auth', {
        email: inputEmail,
        password: inputPassword
      });

      storageUserData(data);
    } catch (error) {
      returnError(error);
    }
    finally {
      setProgress(false);
    }
  };

  return (
    <>
      <Grid container component="main" className={classes.root}>
        <Grid item xs={false} sm={4} md={7} className={classes.image} />
        <Grid item xs={12} sm={8} md={5} component={Paper} className={classes.container}>
          <div className={classes.paper}>
            <Avatar className={classes.avatar}>
              <LockOutlined />
            </Avatar>
            <Typography component="h1" variant="h5">
              Login
            </Typography>
            <form className={classes.form} onSubmit={handleLogin}>
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

              <FormControl className={classes.textField} variant="outlined" fullWidth>
                <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                <OutlinedInput
                  id="outlined-adornment-password"
                  type={showPassword ? 'password' : 'text'}
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

              <Grid
                container
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}
              >
                <FormControlLabel
                  control={<Checkbox value="remember" color="primary" />}
                  label="Lembrar minha senha"
                />
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
                  <a href="#" onClick={() => setOpen(true)}>
                    Esqueci minha senha
                  </a>
                </Grid>
                <Grid item>
                  <Link to="/sign-up">
                    {'Não tem acesso ainda? Cadastre-se!'}
                  </Link>
                </Grid>
              </Grid>
            </form>
          </div>
          <Copyright />
        </Grid>
      </Grid>
      <ModalRecovery open={open} handleClose={() => setOpen(false)} />
    </>
  );
}
