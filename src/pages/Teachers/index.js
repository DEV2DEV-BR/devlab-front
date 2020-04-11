import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Checkbox from '@material-ui/core/Checkbox';
import CircularProgress from '@material-ui/core/CircularProgress';
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormGroup from '@material-ui/core/FormGroup';
import FormLabel from '@material-ui/core/FormLabel';
import Grid from '@material-ui/core/Grid';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
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
  button: {
    display: 'block',
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

export default function Teachers(props) {
  const classes = useStyles();
  const [teachers, setTeachers] = useState([]);
  const [teachersSelect, setTeachersSelect] = useState([]);
  const [progress, setProgress] = useState(false);
  const [progressButton, setProgressButton] = useState(false);
  const handleChangeTeacherName = (event) => {
    setTeachersSelect(event.target.value);
  };
  // provisório
  const [school, setSchool] = useState({
    jose_molina: false,
    mario_covas: false,
    alvares_machado: false,
    marcia_helena: false,
    franco_montoro: false,
    marques_vaccaro: false,
    tereza_polidorio: false,
  });

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

  const [grade, setGrade] = useState({
    year_1: false,
    year_2: false,
    year_3: false,
    year_4: false,
    year_5: false,
    year_6: false,
    year_7: false,
    year_8: false,
    year_9: false,
  });

  const [period, setPeriod] = useState({
    Matutino: false,
    Vespertino: false,
    Noturno: false,
  });

  const handleChangeGrade = (event) => {
    setGrade({ ...grade, [event.target.name]: event.target.checked });
  };

  const handleChangeSchool = (event) => {
    setSchool({ ...school, [event.target.name]: event.target.checked });
  };

  const handleChangeDiscipline = (event) => {
    setDiscipline({ ...discipline, [event.target.name]: event.target.checked });
  };

  const handleChangePeriod = (event) => {
    setPeriod({ ...period, [event.target.name]: event.target.checked });
  };

  const {
    jose_molina,
    mario_covas,
    alvares_machado,
    marcia_helena,
    franco_montoro,
    marques_vaccaro,
    tereza_polidorio,
  } = school;

  const {
    art,
    sciences,
    physical_education,
    geography,
    history,
    english,
    portuguese_language,
    mathematic,
  } = discipline;

  const {
    year_1,
    year_2,
    year_3,
    year_4,
    year_5,
    year_6,
    year_7,
    year_8,
    year_9,
  } = grade;

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

  const loadTeachers = () => {
    setProgress(true);
    const db = firebase.firestore();

    const usersRef = db.collection('users').orderBy('name', 'asc');

    usersRef
      .where('userType', '==', 'teacher')
      .where('confirmed', '==', false)
      .get()
      .then((querySnapshot) => {
        const users = [];
        querySnapshot.forEach((doc) => {
          users.push(doc.data());
        });
        setTeachers(users);
        setProgress(false);
      })
      .catch(function (error) {
        console.log('Error getting documents: ', error);
      });
  };

  useEffect(() => {
    loadTeachers();
  }, []);

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
    const allDisciplines = [];
    if (art) {
      allDisciplines.push(6);
    }
    if (sciences) {
      allDisciplines.push(5);
    }
    if (physical_education) {
      allDisciplines.push(7);
    }
    if (geography) {
      allDisciplines.push(4);
    }
    if (history) {
      allDisciplines.push(3);
    }
    if (english) {
      allDisciplines.push(8);
    }
    if (portuguese_language) {
      allDisciplines.push(1);
    }
    if (mathematic) {
      allDisciplines.push(2);
    }
    return allDisciplines;
  };

  const addSchoolToTeacher = () => {
    const allSchools = [];
    if (alvares_machado) {
      allSchools.push('0HgQobTQkPyMtB7BLIBI');
    }
    if (franco_montoro) {
      allSchools.push('cnh92zAndBb3T6DAvGsy');
    }
    if (mario_covas) {
      allSchools.push('eqdFnW5EQg4JiOdwCA0Q');
    }
    if (marcia_helena) {
      allSchools.push('oVOEa86ZL8hA8e6nOyu6');
    }
    if (marques_vaccaro) {
      allSchools.push('Tr8VHeCJofsyx5nP9zIa');
    }
    if (tereza_polidorio) {
      allSchools.push('yxv6KHgmdzTGZINhBheq');
    }
    if (jose_molina) {
      allSchools.push('vJG0RnawKCTIAYHjntj8');
    }
    return allSchools;
  };

  const toogleFilterGrade = () => {
    const query = [];
    if (year_1) {
      query.push('1');
    }

    if (year_2) {
      query.push('2');
    }

    if (year_3) {
      query.push('3');
    }

    if (year_4) {
      query.push('4');
    }
    if (year_5) {
      query.push('5');
    }
    if (year_6) {
      query.push('6');
    }
    if (year_7) {
      query.push('7');
    }
    if (year_8) {
      query.push('8');
    }
    if (year_9) {
      query.push('9');
    }

    return query;
  };

  const addPeriodTeacher = () => {
    const allPeriods = [];
    if (Matutino) {
      allPeriods.push('Matutino');
    }
    if (Vespertino) {
      allPeriods.push('Vespertino');
    }
    if (Noturno) {
      allPeriods.push('Noturno');
    }
    return allPeriods;
  };

  const handleRegister = async (event) => {
    setProgressButton(true);
    event.preventDefault();

    const teacherDisciplines = addDiscipline();
    const teacherGrades = toogleFilterGrade();
    const teacherSchools = addSchoolToTeacher();
    const teacherPeriods = addPeriodTeacher();

    if (
      teacherDisciplines.length > 0 &&
      teacherSchools.length > 0 &&
      teachersSelect.length > 0
    ) {
      const db = firebase.firestore();
      var teacherRef = db.collection('users').doc(teachersSelect);

      return teacherRef
        .update({
          confirmed: true,
          teacherGrades,
          teacherDisciplines,
          teacherSchools,
          teacherPeriods,
        })
        .then(function () {
          handleClear();
          setProgressButton(false);
          notifySuccess('Liberação efetuada com sucesso!');
        })
        .catch(function (error) {
          // The document probably doesn't exist.
          notifyError('Falha ao liberar, verifique o procedimento!');
          console.error('Error updating document: ', error);
        });
    } else {
      notifyError('Preencha todos os campos!');
    }
  };

  const handleClear = () => {
    setSchool({
      jose_molina: false,
      mario_covas: false,
      alvares_machado: false,
      marcia_helena: false,
      franco_montoro: false,
      marques_vaccaro: false,
      tereza_polidorio: false,
    });

    setDiscipline({
      art: false,
      sciences: false,
      physical_education: false,
      geography: false,
      history: false,
      english: false,
      portuguese_language: false,
      mathematic: false,
    });

    setGrade({
      year_1: false,
      year_2: false,
      year_3: false,
      year_4: false,
      year_5: false,
      year_6: false,
      year_7: false,
      year_8: false,
      year_9: false,
    });

    setPeriod({
      Matutino: false,
      Vespertino: false,
      Noturno: false,
    });

    setTeachersSelect([]);
    loadTeachers();
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
                  LIBERAÇÃO DE PROFESSORES
                </Typography>
                <form className={classes.form} onSubmit={handleRegister}>
                  <Grid
                    container
                    spacing={2}
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                    }}
                  >
                    <Button
                      variant="contained"
                      size="small"
                      color="default"
                      style={{ marginBottom: 20 }}
                      onClick={() => loadTeachers()}
                    >
                      Atualizar página
                    </Button>
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
                        <p style={{ margin: 10 }}>Carregando...</p>
                      </div>
                    ) : (
                      <FormControl
                        variant="outlined"
                        fullWidth
                        className={classes.formControl}
                      >
                        <Grid
                          item
                          xs={12}
                          style={{ margin: '0px 10px 0px 10px' }}
                        >
                          <InputLabel htmlFor="teacher"> Professor*</InputLabel>
                          <Select
                            native
                            value={teachersSelect}
                            onChange={handleChangeTeacherName}
                            fullWidth
                            required
                            label="Teachers"
                            inputProps={{
                              name: 'teacher',
                              id: 'teacher',
                            }}
                          >
                            <option aria-label="None" value="" />
                            {teachers.map((m) => (
                              <option key={m.id} value={m.id}>
                                {m.name}
                              </option>
                            ))}
                          </Select>
                        </Grid>
                      </FormControl>
                    )}
                    <div
                      style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        padding: 10,
                      }}
                    >
                      <FormControl
                        component="fieldset"
                        style={{
                          borderWidth: '1px',
                          borderStyle: 'solid',
                          borderColor: '#CDD2DD',
                          borderRadius: '4px',
                          margin: '10px 0px 10px 0px',
                          padding: 10,
                        }}
                      >
                        <FormLabel component="legend">Escola</FormLabel>

                        <FormGroup
                          style={{ display: 'flex', flexDirection: 'row' }}
                        >
                          <FormControlLabel
                            control={
                              <Checkbox
                                checked={alvares_machado}
                                onChange={handleChangeSchool}
                                name={'alvares_machado'}
                              />
                            }
                            label="EMEIF Álvares Machado"
                          />
                          <FormControlLabel
                            control={
                              <Checkbox
                                checked={franco_montoro}
                                onChange={handleChangeSchool}
                                name={'franco_montoro'}
                              />
                            }
                            label="EMEIF Governador Franco Montoro"
                          />
                          <FormControlLabel
                            control={
                              <Checkbox
                                checked={mario_covas}
                                onChange={handleChangeSchool}
                                name={'mario_covas'}
                              />
                            }
                            label="EMEIF Governador Mário Covas"
                          />
                          <FormControlLabel
                            control={
                              <Checkbox
                                checked={marcia_helena}
                                onChange={handleChangeSchool}
                                name={'marcia_helena'}
                              />
                            }
                            label={'EMEIF Márcia Helena Fernandez de Araújo'}
                          />
                          <FormControlLabel
                            control={
                              <Checkbox
                                checked={marques_vaccaro}
                                onChange={handleChangeSchool}
                                name={'marques_vaccaro'}
                              />
                            }
                            label="EMEIF Professora Aparecida Marques Vaccaro"
                          />
                          <FormControlLabel
                            control={
                              <Checkbox
                                checked={tereza_polidorio}
                                onChange={handleChangeSchool}
                                name={'tereza_polidorio'}
                              />
                            }
                            label="EMEIF Professora Tereza Ito Polidório"
                          />
                          <FormControlLabel
                            control={
                              <Checkbox
                                checked={jose_molina}
                                onChange={handleChangeSchool}
                                name={'jose_molina'}
                              />
                            }
                            label="EMEIF Vereador José Molina"
                          />
                        </FormGroup>
                      </FormControl>

                      <div
                        style={{
                          borderWidth: '1px',
                          borderStyle: 'solid',
                          borderColor: '#CDD2DD',
                          borderRadius: '4px',
                          margin: '10px 0px 10px 0px',
                        }}
                      />
                      <FormControl
                        component="fieldset"
                        style={{
                          borderWidth: '1px',
                          borderStyle: 'solid',
                          borderColor: '#CDD2DD',
                          borderRadius: '4px',
                          margin: '10px 0px 10px 0px',
                          padding: 10,
                        }}
                      >
                        <FormLabel component="legend">Disciplina</FormLabel>
                        <FormGroup
                          style={{
                            display: 'flex',
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                          }}
                        >
                          <FormControlLabel
                            control={
                              <Checkbox
                                checked={art}
                                onChange={handleChangeDiscipline}
                                name="art"
                              />
                            }
                            label="Arte"
                          />
                          <FormControlLabel
                            control={
                              <Checkbox
                                checked={sciences}
                                onChange={handleChangeDiscipline}
                                name="sciences"
                              />
                            }
                            label="Ciências"
                          />
                          <FormControlLabel
                            control={
                              <Checkbox
                                checked={physical_education}
                                onChange={handleChangeDiscipline}
                                name="physical_education"
                              />
                            }
                            label="Educação Física"
                          />
                          <FormControlLabel
                            control={
                              <Checkbox
                                checked={geography}
                                onChange={handleChangeDiscipline}
                                name="geography"
                              />
                            }
                            label="Geografia"
                          />
                          <FormControlLabel
                            control={
                              <Checkbox
                                checked={history}
                                onChange={handleChangeDiscipline}
                                name="history"
                              />
                            }
                            label="História"
                          />
                          <FormControlLabel
                            control={
                              <Checkbox
                                checked={english}
                                onChange={handleChangeDiscipline}
                                name="english"
                              />
                            }
                            label="Inglês"
                          />
                          <FormControlLabel
                            control={
                              <Checkbox
                                checked={portuguese_language}
                                onChange={handleChangeDiscipline}
                                name="portuguese_language"
                              />
                            }
                            label="Língua Portuguesa"
                          />
                          <FormControlLabel
                            control={
                              <Checkbox
                                checked={mathematic}
                                onChange={handleChangeDiscipline}
                                name="mathematic"
                              />
                            }
                            label="Matemática"
                          />
                        </FormGroup>
                      </FormControl>

                      <FormControl
                        component="fieldset"
                        style={{
                          borderWidth: '1px',
                          borderStyle: 'solid',
                          borderColor: '#CDD2DD',
                          borderRadius: '4px',
                          margin: '10px 0px 10px 0px',
                          padding: 10,
                        }}
                      >
                        <FormLabel component="legend">Séries</FormLabel>
                        <FormGroup
                          style={{
                            display: 'flex',
                            flexDirection: 'row',
                            justifyContent: 'space-around',
                          }}
                        >
                          <FormControlLabel
                            control={
                              <Checkbox
                                checked={year_1}
                                onChange={handleChangeGrade}
                                name="year_1"
                              />
                            }
                            label="1º Ano"
                          />
                          <FormControlLabel
                            control={
                              <Checkbox
                                checked={year_2}
                                onChange={handleChangeGrade}
                                name="year_2"
                              />
                            }
                            label="2º Ano"
                          />
                          <FormControlLabel
                            control={
                              <Checkbox
                                checked={year_3}
                                onChange={handleChangeGrade}
                                name="year_3"
                              />
                            }
                            label="3º Ano"
                          />
                          <FormControlLabel
                            control={
                              <Checkbox
                                checked={year_4}
                                onChange={handleChangeGrade}
                                name="year_4"
                              />
                            }
                            label="4º Ano"
                          />
                          <FormControlLabel
                            control={
                              <Checkbox
                                checked={year_5}
                                onChange={handleChangeGrade}
                                name="year_5"
                              />
                            }
                            label="5º Ano"
                          />
                          <FormControlLabel
                            control={
                              <Checkbox
                                checked={year_6}
                                onChange={handleChangeGrade}
                                name="year_6"
                              />
                            }
                            label="6º Ano"
                          />
                          <FormControlLabel
                            control={
                              <Checkbox
                                checked={year_7}
                                onChange={handleChangeGrade}
                                name="year_7"
                              />
                            }
                            label="7º Ano"
                          />
                          <FormControlLabel
                            control={
                              <Checkbox
                                checked={year_8}
                                onChange={handleChangeGrade}
                                name="year_8"
                              />
                            }
                            label="8º Ano"
                          />
                          <FormControlLabel
                            control={
                              <Checkbox
                                checked={year_9}
                                onChange={handleChangeGrade}
                                name="year_9"
                              />
                            }
                            label="9º Ano"
                          />
                        </FormGroup>
                      </FormControl>

                      <FormControl
                        component="fieldset"
                        style={{
                          borderWidth: '1px',
                          borderStyle: 'solid',
                          borderColor: '#CDD2DD',
                          borderRadius: '4px',
                          margin: '10px 0px 10px 0px',
                          padding: 10,
                        }}
                      >
                        <FormLabel component="legend">Período</FormLabel>
                        <FormGroup
                          style={{
                            display: 'flex',
                            flexDirection: 'row',
                            justifyContent: 'space-around',
                          }}
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
                    </div>
                  </Grid>
                  {progressButton ? (
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
                      <p style={{ margin: 10 }}>Cadastrando...</p>
                    </div>
                  ) : (
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
                  )}
                </form>
              </div>
            </Container>
          </Box>
        </Container>
        <Box mt={5} style={{ marginBottom: 20 }}>
          <Copyright />
        </Box>
      </main>
    </div>
  );
}
