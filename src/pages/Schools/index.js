import React, { useState, u } from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Copyright from '../../components/Copyright';
import MenuLeft from '../../components/MenuLeft';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { Link } from 'react-router-dom';
import Typography from '@material-ui/core/Typography';
import firebase from 'firebase';
import { toast } from 'react-toastify';
import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import Checkbox from '@material-ui/core/Checkbox';

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
  button: {
    display: 'block',
    marginTop: theme.spacing(2),
  },
  formControl: {
    display: 'flex',
    flexDirection: 'row',
    margin: theme.spacing(1),
    minWidth: 120,
  },
  paper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function Schools(props) {
  const classes = useStyles();
  const [inputName, setInputName] = useState('');
  const [inputPhone, setInputPhone] = useState('');
  const [inputAddress, setInputAddress] = useState('');
  const [progress, setProgress] = useState(false);
  const [period, setPeriod] = React.useState({
    Matutino: false,
    Vespertino: false,
    Noturno: false,
  });

  const handleChangePeriod = (event) => {
    console.log('clicou');
    setPeriod({ ...period, [event.target.name]: event.target.checked });
  };

  const { Matutino, Vespertino, Noturno } = period;

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

  const addPeriods = () => {
    const allPeriods = [];
    if (Matutino) {
      allPeriods.push(1);
    }
    if (Vespertino) {
      allPeriods.push(2);
    }
    if (Noturno) {
      allPeriods.push(3);
    }

    return allPeriods;
  };

  const handleRegister = async (event) => {
    let date = new Date();

    event.preventDefault();

    const periods = addPeriods();

    const name = inputName;
    const cloudFirestore = firebase.firestore();

    cloudFirestore
      .collection('schools')
      .add({
        name,
        periods,
        createdAt: date,
        id: '',
      })
      .then(function (doc) {
        cloudFirestore.collection('schools').doc(doc.id).update({
          id: doc.id,
        });
        setProgress(false);
        handleClear();
        notifySuccess('Escola cadastrada com sucesso!');
      })
      .catch(function (error) {
        console.error('Error adding domcument', error);
        notifyError('Password does not match!');
      });
  };

  const handleClear = () => {
    setInputName('');
    setInputAddress('');
    setPeriod({
      Matutino: false,
      Vespertino: false,
      Noturno: false,
    });
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
          <Box pt={4}>
            <Container component="main" maxWidth="sm">
              <CssBaseline />
              <div className={classes.paper}>
                <Typography component="h1" variant="h5">
                  CADASTRO DE UNIDADE
                </Typography>
                <form
                  className={classes.form}
                  noValidate
                  onSubmit={handleRegister}
                >
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
                        label="Nome"
                        autoFocus
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        autoComplete="fname"
                        name="fullName"
                        variant="outlined"
                        required
                        fullWidth
                        id="fullName"
                        value={inputAddress}
                        onChange={(event) =>
                          setInputAddress(event.target.value)
                        }
                        label="Endereço"
                        autoFocus
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        autoComplete="fname"
                        name="fullName"
                        variant="outlined"
                        required
                        fullWidth
                        id="fullName"
                        value={inputPhone}
                        onChange={(event) => setInputPhone(event.target.value)}
                        label="Telefone:"
                        autoFocus
                      />
                    </Grid>

                    <FormControl
                      component="fieldset"
                      className={classes.formControl}
                    >
                      <FormLabel component="legend">Período</FormLabel>
                      <FormGroup
                        style={{ display: 'flex', flexDirection: 'row' }}
                      >
                        <FormControlLabel
                          control={
                            <Checkbox
                              checked={Matutino}
                              onChange={handleChangePeriod}
                              name="Matutino"
                            />
                          }
                          label="Matutino"
                        />
                        <FormControlLabel
                          control={
                            <Checkbox
                              checked={Vespertino}
                              onChange={handleChangePeriod}
                              name="Vespertino"
                            />
                          }
                          label="Vespertino"
                        />
                        <FormControlLabel
                          control={
                            <Checkbox
                              checked={Noturno}
                              onChange={handleChangePeriod}
                              name="Noturno"
                            />
                          }
                          label="Noturno"
                        />
                      </FormGroup>
                    </FormControl>
                  </Grid>
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    style={{
                      backgroundColor: 'rgba(126,64,144,1)',
                      color: '#fff',
                    }}
                    className={classes.submit}
                  >
                    Cadastrar
                  </Button>
                </form>
              </div>
              <Box mt={5} style={{ marginBottom: 20 }}></Box>
            </Container>
          </Box>
        </Container>
        <Copyright />
      </main>
    </div>
  );
}
