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
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import firebase from 'firebase';
import React, { useEffect, useState } from 'react';
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
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%', // Fix IE 11 issue.
    alignItems: 'center',
    marginTop: theme.spacing(3),
  },
  submitLeft: {
    margin: theme.spacing(3, 0, 2),
    marginRight: 10,
    width: '70%',
  },
  submitRight: {
    margin: theme.spacing(3, 0, 2),
    marginLeft: 10,
    width: '30%',
  },
}));

export default function UploadFiles(props) {
  const classes = useStyles();
  const [image, setImage] = useState(null);

  const [gradesTeacher, setGradesTeacher] = useState([]);
  const [grade, setGrade] = useState('');

  const [disciplinesTeacher, setDisciplinesTeacher] = useState([]);
  const [discipline, setDiscipline] = useState('');

  const [schoolsTeacher, setSchoolsTeacher] = useState([]);
  const [school, setSchool] = useState('');

  const [periodsTeacher, setPeriodsTeacher] = useState([]);
  const [period, setPeriod] = useState('');

  const [teachers, setTeachers] = useState([]);
  const [description, setDescription] = useState('');
  const [progress, setProgress] = useState(false);
  const [progressLoadData, setProgressLoadData] = useState(false);

  const handleChangeDiscipline = (event) => {
    setDiscipline(event.target.value);
  };

  const handleChangeSchool = (event) => {
    setSchool(event.target.value);
  };

  const handleChangeGrade = (event) => {
    setGrade(event.target.value);
  };

  const handleChangePeriod = (event) => {
    setPeriod(event.target.value);
  };

  const handleChangeDescription = (event) => {
    setDescription(event.target.value);
  };

  const handleChange = (e) => {
    if (e.target.files[0]) {
      const image = e.target.files[0];
      setImage(image);
    }
  };

  const loadTeacher = async () => {
    setProgressLoadData(true);
    const db = firebase.firestore();

    const usersRef = db.collection('users');

    await usersRef
      .where('userType', '==', 'teacher')
      .where('id', '==', localStorage.getItem('user'))
      .get()
      .then((querySnapshot) => {
        const users = [];
        querySnapshot.forEach((doc) => {
          users.push(doc.data());
          setDisciplinesTeacher(
            ...disciplinesTeacher,
            doc.data().teacherDisciplines
          );
          setSchoolsTeacher(...schoolsTeacher, doc.data().teacherSchools);
          setPeriodsTeacher(...periodsTeacher, doc.data().teacherPeriods);
          setGradesTeacher(...gradesTeacher, doc.data().teacherGrades);
        });
        setTeachers(users);
        setProgressLoadData(false);
      })
      .catch(function (error) {
        console.log('Error getting documents: ', error);
      });
  };

  useEffect(() => {
    loadTeacher();
  }, []);

  const disciplinesSystem = [
    {
      id: 1,
      name: 'Língua Portuguesa',
    },
    {
      id: 2,
      name: 'Matemática',
    },
    {
      id: 3,
      name: 'História',
    },
    {
      id: 4,
      name: 'Geografia',
    },
    {
      id: 5,
      name: 'Ciências',
    },
    {
      id: 6,
      name: 'Arte',
    },
    {
      id: 7,
      name: 'Educação Física',
    },
    {
      id: 8,
      name: 'Inglês',
    },
  ];

  const schoolsSystem = [
    {
      id: '0HgQobTQkPyMtB7BLIBI',
      name: 'EMEIF Álvares Machado',
    },
    {
      id: 'Tr8VHeCJofsyx5nP9zIa',
      name: 'EMEIF Professora Aparecida Marques Vaccaro',
    },
    {
      id: 'cnh92zAndBb3T6DAvGsy',
      name: 'EMEIF Governador Franco Montoro',
    },
    {
      id: 'eqdFnW5EQg4JiOdwCA0Q',
      name: 'EMEIF Governador Mário Covas',
    },
    {
      id: 'oVOEa86ZL8hA8e6nOyu6',
      name: 'EMEIF Márcia Helena Fernandez de Araújo',
    },
    {
      id: 'vJG0RnawKCTIAYHjntj8',
      name: 'EMEIF Vereador José Molina',
    },
    {
      id: 'yxv6KHgmdzTGZINhBheq',
      name: 'EMEIF Professora Tereza Ito Polidório',
    },
  ];

  const handleRegister = () => {
    let date = new Date();
    let day = date.getDate();
    let month = date.getMonth();
    let fullYear = date.getFullYear();
    let createdAt = `${day}-${month}-${fullYear}`;

    const storage = firebase.storage();

    setProgress(true);

    const uploadTask = storage.ref(`all_supplies/${image.name}`).put(image);
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
          .ref('all_supplies')
          .child(image.name)
          .getDownloadURL()
          .then((url) => {
            const cloudFirestore = firebase.firestore();

            cloudFirestore
              .collection('all_supplies')
              .add({
                school,
                grade,
                period,
                discipline,
                url,
                createdAt: date,
                date: createdAt,
                description,
                id: '',
              })
              .then(function (doc) {
                cloudFirestore.collection('all_supplies').doc(doc.id).update({
                  id: doc.id,
                });
                setProgress(false);
                handleClear();
              })
              .catch(function (error) {
                console.error('Error adding domcument', error);
              });
          });
      }
    );
  };

  const handleClear = () => {
    setGrade('');
    setDiscipline('');
    setDescription('');
    setSchool('');
    setPeriod('');
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
          <Grid container spacing={3} style={{ width: '80%' }}>
            <form className={classes.form}>
              <h1 style={{ marginLeft: 10 }}>Cadastro de Materiais</h1>

              <Grid container spacing={2}>
                {progressLoadData ? (
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
                  <>
                    <FormControl
                      variant="outlined"
                      fullWidth
                      className={classes.formControl}
                      style={{ margin: 10 }}
                    >
                      <Grid item xs={12}>
                        <InputLabel htmlFor="serie">Escola*</InputLabel>
                        <Select
                          native
                          value={school}
                          onChange={handleChangeSchool}
                          fullWidth
                          required
                          label="Escolas"
                          inputProps={{
                            name: 'school',
                            id: 'school',
                          }}
                        >
                          <option aria-label="None" value="" />
                          {schoolsSystem.map((d) =>
                            schoolsTeacher.map((td) =>
                              td == d.id ? (
                                <option value={td}>{d.name}</option>
                              ) : (
                                ''
                              )
                            )
                          )}
                        </Select>
                      </Grid>
                    </FormControl>
                    <FormControl
                      variant="outlined"
                      fullWidth
                      className={classes.formControl}
                      style={{ margin: 10 }}
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
                            name: 'grade',
                            id: 'grade',
                          }}
                        >
                          <option aria-label="None" value="" />
                          {gradesTeacher.map((t) => (
                            <option value={t}>{t}º Ano</option>
                          ))}
                        </Select>
                      </Grid>
                    </FormControl>
                    <FormControl
                      variant="outlined"
                      fullWidth
                      className={classes.formControl}
                      style={{ margin: 10 }}
                    >
                      <Grid item xs={12}>
                        <InputLabel htmlFor="discipline">
                          Disciplina*
                        </InputLabel>
                        <Select
                          native
                          value={discipline}
                          onChange={handleChangeDiscipline}
                          fullWidth
                          required
                          label="Disciplina"
                          inputProps={{
                            name: 'discipline',
                            id: 'discipline',
                          }}
                        >
                          <option aria-label="None" value="" />

                          {disciplinesSystem.map((d) =>
                            disciplinesTeacher.map((td) =>
                              td == d.id ? (
                                <option value={td}>{d.name}</option>
                              ) : (
                                ''
                              )
                            )
                          )}
                        </Select>
                      </Grid>
                    </FormControl>

                    <FormControl
                      variant="outlined"
                      fullWidth
                      className={classes.formControl}
                      style={{ margin: 10 }}
                    >
                      <Grid item xs={12}>
                        <InputLabel htmlFor="period">Período*</InputLabel>
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
                          {periodsTeacher.map((p) => (
                            <option value={p}>{p}</option>
                          ))}
                        </Select>
                      </Grid>
                    </FormControl>
                  </>
                )}

                <FormControl
                  variant="outlined"
                  fullWidth
                  className={classes.formControl}
                  style={{ margin: 10 }}
                >
                  <Grid item xs={12}>
                    <TextareaAutosize
                      required
                      style={{ width: '100%' }}
                      value={description}
                      rowsMin={10}
                      onChange={handleChangeDescription}
                      id="outlined-required"
                      label="Descrição"
                      placeholder="Descrição"
                      variant="outlined"
                    />
                  </Grid>
                </FormControl>

                <div style={{ margin: '10px 10px 20px 10px' }}>
                  <input type="file" onChange={handleChange} />
                </div>
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
                  <p style={{ margin: 10 }}>Enviando...</p>
                </div>
              ) : (
                <div style={{ display: 'flex', width: '100%' }}>
                  <Button
                    fullWidth
                    variant="contained"
                    disabled={!!progress}
                    style={{
                      backgroundColor: '#318F6B',
                      color: '#fff',
                    }}
                    onClick={handleRegister}
                    className={classes.submitLeft}
                  >
                    CADASTRAR
                  </Button>
                  <Button
                    fullWidth
                    variant="contained"
                    style={{
                      backgroundColor: 'rgba(126,64,144,1)',
                      color: '#fff',
                    }}
                    onClick={handleClear}
                    className={classes.submitRight}
                  >
                    LIMPAR
                  </Button>
                </div>
              )}
            </form>
          </Grid>
        </Container>
        <Box pt={4}>
          <Copyright />
        </Box>
      </main>
    </div>
  );
}
