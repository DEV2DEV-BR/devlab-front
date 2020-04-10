import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
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
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  table: {
    minWidth: 650,
  },
  formControl: {
    margin: theme.spacing(3),
  },
}));

export default function ListHomeWork(props) {
  const classes = useStyles();

  const [suppliesDate, setSuppliesDate] = useState([]);
  const [progress, setProgress] = useState(false);
  const [filterGrade, setFilterGrade] = useState([]);
  const [filterDiscipline, setFilterDiscipline] = useState([]);
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

  const [discipline, setDiscipline] = useState({
    arts: false,
    sciences: false,
    physical_education: false,
    history: false,
    geography: false,
    english: false,
    mathematics: false,
    language_portuguese: false,
  });

  const handleChangeGrade = (event) => {
    setGrade({ ...grade, [event.target.name]: event.target.checked });
  };

  const handleChangeDiscipline = (event) => {
    setDiscipline({ ...discipline, [event.target.name]: event.target.checked });
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

    setFilterGrade(query);
  };

  // const ver = () => {
  //   console.log("year_1 " + year_1);
  //   console.log("year_2 " + year_2);
  //   console.log("year_3 " + year_3);
  //   console.log("year_4 " + year_4);
  //   console.log("year_5 " + year_5);
  //   console.log("year_6 " + year_6);
  //   console.log("year_7 " + year_7);
  //   console.log("year_8 " + year_8);
  //   console.log("year_9 " + year_9);

  //   console.log("arts " + arts);
  //   console.log("sciences " + sciences);
  //   console.log("physical_education " + physical_education);
  //   console.log("geography " + geography);
  //   console.log("history " + history);
  //   console.log("english " + english);
  //   console.log("mathematics " + mathematics);
  //   console.log("language_portuguese " + language_portuguese);
  // };

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

  // const errorGrade =
  //   [
  //     year_1,
  //     year_2,
  //     year_3,
  //     year_4,
  //     year_5,
  //     year_6,
  //     year_7,
  //     year_8,
  //     year_9,
  //   ].filter((v) => v).length !== 2;

  const {
    arts,
    sciences,
    physical_education,
    geography,
    english,
    mathematics,
    language_portuguese,
    history,
  } = discipline;

  // const errorDiscipline =
  //   [
  //     arts,
  //     sciences,
  //     physical_education,
  //     geography,
  //     english,
  //     mathematics,
  //     language_portuguese,
  //     history,
  //   ].filter((v) => v).length !== 2;

  const loadData = async () => {
    toogleFilterGrade();
    const db = firebase.firestore();
    const suppliesRef = db.collection('all_supplies');

    await suppliesRef
      .where('discipline', '==', (`1`, `2`))
      .get()
      .then((querySnapshot) => {
        const supplies = [];
        querySnapshot.forEach((doc) => {
          supplies.push(doc.data());
        });
        setSuppliesDate(supplies);
      })
      .catch(function (error) {
        console.log('Error getting documents: ', error);
      });
  };

  // useEffect(() => {
  //   loadData()
  // }, []);

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
              <div>
                <FormControl
                  component="fieldset"
                  className={classes.formControl}
                >
                  <FormLabel component="legend">Série</FormLabel>
                  <FormGroup>
                    <div>
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
                    </div>
                    <div>
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
                    </div>
                  </FormGroup>
                </FormControl>

                <FormControl
                  component="fieldset"
                  className={classes.formControl}
                >
                  <FormLabel component="legend">Disciplina</FormLabel>
                  <FormGroup>
                    <div>
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={arts}
                            onChange={handleChangeDiscipline}
                            name="arts"
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
                    </div>
                    <div>
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
                            checked={language_portuguese}
                            onChange={handleChangeDiscipline}
                            name="language_portuguese"
                          />
                        }
                        label="Língua Portuguesa"
                      />
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={mathematics}
                            onChange={handleChangeDiscipline}
                            name="mathematics"
                          />
                        }
                        label="Matemática"
                      />
                    </div>
                  </FormGroup>
                </FormControl>
              </div>

              {/* {progress ? (
                <CircularProgress />
              ) : ( */}
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
              {/* )} */}
            </div>
            {!progress ? (
              <TableContainer component={Paper}>
                <Table className={classes.table} aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell>
                        <b>Data</b>
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
