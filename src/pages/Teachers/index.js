import React, { useState, useEffect } from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Copyright from '../../components/Copyright';
import MenuLeft from '../../components/MenuLeft';
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import firebase from "firebase";
import { toast } from "react-toastify";
import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import CircularProgress from "@material-ui/core/CircularProgress";

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
    display: "block",
    marginTop: theme.spacing(2),
  },
  formControl: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    margin: theme.spacing(1),
    minWidth: 120,
  },
  paper: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function Teachers(props) {
  const classes = useStyles();
  const [inputName, setInputName] = useState("");
  const [inputEmail, setInputEmail] = useState("");
  const [inputPassword, setInputPassword] = useState("");
  const [inputConfirmPassword, setInputConfirmPassword] = useState("");

  // provisório
  const [school, setSchool] = useState({
    molina: false,
    covas: false,
    grupo: false,
    fernandez: false,
    franco_montoro: false,
    vaccaro: false,
    bela_vista: false,
  });

  const [progress, setProgress] = useState(false);

  const [discipline, setDiscipline] = useState({
    art: false,
    sciences: false,
    physical_education: false,
    geography: false,
    history: false,
    english: false,
    portuguese_language: false,
    mathematic: false,
  });


  const handleChangeSchool = (event) => {
    setSchool({ ...school, [event.target.name]: event.target.checked });
  };

  const handleChangeDiscipline = (event) => {
    setDiscipline({ ...discipline, [event.target.name]: event.target.checked });
  };

  const { jose_molina, mario_covas, alvares_machado, marcia_helena, franco_montoro, marques_vaccaro, tereza_polidorio } = school;


  const { art, sciences, physical_education, geography, history, english, portuguese_language, mathematic } = discipline;

  const notifySuccess = (message) => {
    toast.success(message, {
      position: "top-right",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });
  };

  const notifyError = (message) => {
    toast.error(message, {
      position: "top-right",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });
  };

  // future
  // const loadAllSchools = async () => {
  //   const db = firebase.firestore();
  //   const schoolsRef = db.collection("schools").orderBy("name", "asc");

  //   await schoolsRef
  //     .get()
  //     .then((querySnapshot) => {
  //       const schools = [];
  //       querySnapshot.forEach((doc) => {
  //         schools.push(doc.data());
  //       });
  //       setSchool(schools);
  //       setProgress(false);
  //     })
  //     .catch(function (error) {
  //       console.log("Error getting documents: ", error);
  //     });
  // };

  // future

  // useEffect(() => {
  //   setProgress(true)
  //   loadAllSchools();
  // }, [])

  const addDiscipline = () => {
    const allDisciplines = []
    if (art) {
      allDisciplines.push(6)
    }
    if (sciences) {
      allDisciplines.push(5)
    }
    if (physical_education) {
      allDisciplines.push(7)
    }
    if (geography) {
      allDisciplines.push(4)
    }
    if (history) {
      allDisciplines.push(3)
    }
    if (english) {
      allDisciplines.push(8)
    }
    if (portuguese_language) {
      allDisciplines.push(1)
    }
    if (mathematic) {
      allDisciplines.push(2)
    }
    return allDisciplines;
  }

  const addSchoolToTeacher = () => {
    const allSchools = []
    if (alvares_machado) {
      allSchools.push('0HgQobTQkPyMtB7BLIBI')
    }
    if (franco_montoro) {
      allSchools.push('cnh92zAndBb3T6DAvGsy')
    }
    if (mario_covas) {
      allSchools.push('eqdFnW5EQg4JiOdwCA0Q')
    }
    if (marcia_helena) {
      allSchools.push('oVOEa86ZL8hA8e6nOyu6')
    }
    if (marques_vaccaro) {
      allSchools.push('Tr8VHeCJofsyx5nP9zIa')
    }
    if (tereza_polidorio) {
      allSchools.push('yxv6KHgmdzTGZINhBheq')
    }
    if (jose_molina) {
      allSchools.push('vJG0RnawKCTIAYHjntj8')
    }
    return allSchools;

  }

  const handleRegister = async (event) => {
    event.preventDefault();

    const teacherDisciplines = addDiscipline();

    const teacherSchools = addSchoolToTeacher();

    const name = inputName;

    if (inputPassword === inputConfirmPassword) {

      await firebase
        .auth()
        .createUserWithEmailAndPassword(inputEmail, inputPassword)
        .then(function (success) {
          const cloudFirestore = firebase.firestore();

          cloudFirestore
            .collection("users")
            .add({
              name,
              email: success.user.email,
              uid: success.user.uid,
              teacherDisciplines,
              teacherSchools,
              userType: "teacher",
              id: "",
            })
            .then(function (doc) {
              cloudFirestore.collection("users").doc(doc.id).update({
                id: doc.id,
              });
            })
            .catch(function (error) {
              console.error("Error adding domcument", error);
            });
        })
        .catch(function (error) {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.log(errorCode, errorMessage);
        });

      notifySuccess("Cadastrado com sucesso!");
      handleClear();
    } else {
      notifyError("Password does not match!");
    }
  };

  const handleClear = () => {
    setInputName("");
    setInputEmail("");
    setInputConfirmPassword("");
    setInputPassword("");
    setDiscipline({
      art: false,
      sciences: false,
      physical_education: false,
      geography: false,
      history: false,
      english: false,
      portuguese_language: false,
      mathematic: false,
    })
  }

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
                  CADASTRO DE PROFESSOR
        </Typography>
                <form className={classes.form} noValidate onSubmit={handleRegister}>
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
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: 10 }}>

                      <FormControl component="fieldset" style={{
                        borderWidth: "1px",
                        borderStyle: "solid",
                        borderColor: "#CDD2DD",
                        borderRadius: "4px",
                        margin: "10px 0px 10px 0px",
                        padding: 10,
                      }}>
                        <FormLabel component="legend">Escola</FormLabel>

                        <FormGroup style={{ display: 'flex', flexDirection: 'row' }}>

                          <FormControlLabel
                            control={<Checkbox checked={alvares_machado} onChange={handleChangeSchool} name={'alvares_machado'} />}
                            label='EMEIF Álvares Machado'
                          />
                          <FormControlLabel
                            control={<Checkbox checked={franco_montoro} onChange={handleChangeSchool} name={'franco_montoro'} />}
                            label='EMEIF Governador Franco Montoro'
                          />
                          <FormControlLabel
                            control={<Checkbox checked={mario_covas} onChange={handleChangeSchool} name={'mario_covas'} />}
                            label='EMEIF Governador Mário Covas'
                          />
                          <FormControlLabel
                            control={<Checkbox checked={marcia_helena} onChange={handleChangeSchool} name={'marcia_helena'} />}
                            label={'EMEIF Márcia Helena Fernandez de Araújo'}
                          />
                          <FormControlLabel
                            control={<Checkbox checked={marques_vaccaro} onChange={handleChangeSchool} name={'marque_vaccaro'} />}
                            label='EMEIF Professora Aparecida Marques Vaccaro'
                          />
                          <FormControlLabel
                            control={<Checkbox checked={tereza_polidorio} onChange={handleChangeSchool} name={'tereza_polidorio'} />}
                            label='EMEIF Professora Tereza Ito Polidório'
                          />
                          <FormControlLabel
                            control={<Checkbox checked={jose_molina} onChange={handleChangeSchool} name={'jose_molina'} />}
                            label='EMEIF Vereador José Molina'
                          />

                        </FormGroup>

                      </FormControl>

                      <div style={{
                        borderWidth: "1px",
                        borderStyle: "solid",
                        borderColor: "#CDD2DD",
                        borderRadius: "4px",
                        margin: '10px 0px 10px 0px',
                      }} />
                      <FormControl component="fieldset" style={{
                        borderWidth: "1px",
                        borderStyle: "solid",
                        borderColor: "#CDD2DD",
                        borderRadius: "4px",
                        margin: "10px 0px 10px 0px",
                        padding: 10,
                      }}>
                        <FormLabel component="legend">Disciplina</FormLabel>
                        <FormGroup style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>

                          <FormControlLabel
                            control={<Checkbox checked={art} onChange={handleChangeDiscipline} name="art" />}
                            label="Arte"
                          />
                          <FormControlLabel
                            control={<Checkbox checked={sciences} onChange={handleChangeDiscipline} name="sciences" />}
                            label="Ciências"
                          />
                          <FormControlLabel
                            control={<Checkbox checked={physical_education} onChange={handleChangeDiscipline} name="physical_education" />}
                            label="Educação Física"
                          />
                          <FormControlLabel
                            control={<Checkbox checked={geography} onChange={handleChangeDiscipline} name="geography" />}
                            label="Geografia"
                          />
                          <FormControlLabel
                            control={<Checkbox checked={history} onChange={handleChangeDiscipline} name="history" />}
                            label="História"
                          />
                          <FormControlLabel
                            control={<Checkbox checked={english} onChange={handleChangeDiscipline} name="english" />}
                            label="Inglês"
                          />
                          <FormControlLabel
                            control={<Checkbox checked={portuguese_language} onChange={handleChangeDiscipline} name="portuguese_language" />}
                            label="Língua Portuguesa"
                          />
                          <FormControlLabel
                            control={<Checkbox checked={mathematic} onChange={handleChangeDiscipline} name="mathematic" />}
                            label="Matemática"
                          />
                        </FormGroup>
                      </FormControl>
                    </div>
                  </Grid>
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    style={{ backgroundColor: "rgba(126,64,144,1)", color: "#fff" }}
                    className={classes.submit}
                  >
                    Cadastrar
          </Button>

                </form>
              </div>

            </Container>

          </Box>
        </Container>
        <Box mt={5} style={{ marginBottom: 20 }}>
          <Copyright />
        </Box>
      </main>
    </div >
  );
}
