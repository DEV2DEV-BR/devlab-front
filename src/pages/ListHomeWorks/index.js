import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import FormControl from '@material-ui/core/FormControl';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import CssBaseline from '@material-ui/core/CssBaseline';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Copyright from '../../components/Copyright';
import MenuLeft from '../../components/MenuLeft';
import { Button } from '@material-ui/core';
import firebase from 'firebase';
import { toast } from 'react-toastify';
import CircularProgress from '@material-ui/core/CircularProgress';

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

  table: {
    minWidth: 650,
  },
  formControl: {
    margin: theme.spacing(3),
  },

  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
}));

export default function ListHomeWork(props) {
  const classes = useStyles();

  const [suppliesDate, setSuppliesDate] = useState([]);
  const [progress, setProgress] = useState(false);

  const [gradesTeacher, setGradesTeacher] = useState([]);
  const [grade, setGrade] = useState('');

  const [filterGrade, setFilterGrade] = useState();
  const [filterDiscipline, setFilterDiscipline] = useState();

  const [disciplinesTeacher, setDisciplinesTeacher] = useState([]);
  const [discipline, setDiscipline] = useState('');

  const [schoolsTeacher, setSchoolsTeacher] = useState([]);
  const [school, setSchool] = useState('');

  const [periodsTeacher, setPeriodsTeacher] = useState([]);
  const [period, setPeriod] = useState('');

  const [teachers, setTeachers] = useState([]);
  const [description, setDescription] = useState('');

  const [progressLoadData, setProgressLoadData] = useState(true);

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

  const handleChangeSchool = (event) => {
    setSchool(event.target.value);
  };

  const handleChangeGrade = (event) => {
    setGrade(event.target.value);
  };

  const handleChangeDiscipline = (event) => {
    setDiscipline(event.target.value);
  };

  const handleChangePeriod = (event) => {
    setPeriod(event.target.value);
  };

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

  const loadTeacher = async () => {
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

  const loadData = async () => {
    const db = firebase.firestore();
    const suppliesRef = db.collection('homework');

    console.log(grade);
    console.log(discipline);
    console.log(school);
    console.log(period);

    if (grade !== '' && discipline !== '' && school !== '' && period !== '') {
      setProgress(true);
      await suppliesRef
        .where('discipline', '==', `${discipline}`)
        .where('grade', '==', `${grade}`)
        .where('school', '==', `${school}`)
        .where('period', '==', `${period}`)
        .get()
        .then((querySnapshot) => {
          const supplies = [];
          querySnapshot.forEach((doc) => {
            supplies.push(doc.data());
          });
          setSuppliesDate(supplies);
          setProgress(false);
        })
        .catch(function (error) {
          setProgress(false);
          console.log('Error getting documents: ', error);
        });
    } else {
      setProgress(false);
      notifyError('Preencha todos os campos de filtragem!');
    }
  };

  useEffect(() => {
    return () => {
      setSuppliesDate([]);
    };
  }, []);

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
          <Grid container spacing={3}>
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                width: '100%',
                margin: 10,
              }}
            >
              <h1>Atividades</h1>

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
                  <div
                    style={{
                      display: 'flex',
                      flexDirection: 'row',
                      alignItems: 'center',
                      width: '50%',
                      justifyContent: 'space-between',
                    }}
                  >
                    <FormControl
                      variant="outlined"
                      fullWidth
                      className={classes.formControl}
                      style={{ margin: 10 }}
                    >
                      <Grid item xs={12}>
                        <InputLabel htmlFor="school">Escola*</InputLabel>
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
                        <InputLabel htmlFor="grade">Série*</InputLabel>
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
                  </div>
                  <div
                    style={{
                      display: 'flex',
                      flexDirection: 'row',
                      alignItems: 'center',
                      width: '50%',
                    }}
                  >
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
                  </div>
                </>
              )}
              <>
                <Button
                  variant="contained"
                  size="small"
                  color="default"
                  style={{ marginBottom: 20 }}
                  onClick={loadData}
                >
                  Consultar
                </Button>
              </>

              {progress ? <CircularProgress /> : ''}
            </div>
            {!progress ? (
              <TableContainer component={Paper} style={{ marginRight: 10 }}>
                <Table className={classes.table} aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell>
                        <b>Data</b>
                      </TableCell>
                      <TableCell align="left">
                        <b>Aluno</b>
                      </TableCell>
                      <TableCell align="left">
                        <b>Descrição</b>
                      </TableCell>
                      <TableCell align="right"></TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {suppliesDate.map((supplie) => (
                      <TableRow key={supplie.id}>
                        <TableCell
                          component="th"
                          scope="row"
                          style={{ minWidth: 100 }}
                        >
                          {supplie.date}
                        </TableCell>
                        <TableCell
                          align="left"
                          style={{ textAlign: 'justify' }}
                        >
                          {supplie.nameStudent}
                        </TableCell>
                        <TableCell
                          align="left"
                          style={{ textAlign: 'justify' }}
                        >
                          {supplie.description}
                        </TableCell>
                        <TableCell align="right">
                          <a
                            href={supplie.url}
                            style={{ textDecoration: 'none' }}
                            target="_blank"
                          >
                            <Button
                              variant="contained"
                              size="small"
                              style={{
                                backgroundColor: 'rgba(126,64,144,1)',
                                color: '#fff',
                              }}
                            >
                              Download
                            </Button>
                          </a>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            ) : (
              ''
            )}
          </Grid>
        </Container>
        <Box pt={4}>
          <Copyright />
        </Box>
      </main>
    </div>
  );
}
