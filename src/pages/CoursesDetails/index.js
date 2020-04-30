import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import React, { useState, useEffect } from 'react';
import Box from '@material-ui/core/Box';
import { Link } from 'react-router-dom';
import Background from '../../assets/background-default.jpg';
import firebase from 'firebase';
import Copyright from '../../components/Copyright';
import CoursesList from '../../components/CoursesList';
import Navbar from '../../components/Navbar';
import { istAuthenticated } from '../../services/auth';
import CircularProgress from '@material-ui/core/CircularProgress';
import Backdrop from '@material-ui/core/Backdrop';
import { MdAddShoppingCart } from 'react-icons/md';
import { format } from '../../util/format';
import FormControl from '@material-ui/core/FormControl';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles((theme) => ({
  icon: {
    marginRight: theme.spacing(2),
  },
  heroContent: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(8, 0, 6),
  },
  heroButtons: {
    marginTop: theme.spacing(4),
  },
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  cardMedia: {
    paddingTop: '56.25%', // 16:9
  },
  cardContent: {
    flexGrow: 1,
  },
  footer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(6),
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
}));

export default function CoursesDetails(props) {
  const classes = useStyles();
  const [classesData, setClassesData] = useState([]);
  const [courseData, setCourseData] = useState([]);
  const [progress, setProgress] = useState(false);

  const handleBuyCourse = () => {
    'PagSeguroLightbox(this); return false;';
  };

  const handleWatchClasse = (idClasse, idCourse) => {
    props.history.push('/watch-classe', { idClasse, idCourse });
  };

  const loadDataCourse = async () => {
    setProgress(true);

    if (!props.history.location.state) {
      return props.history.push('/dashboard');
    }

    const { id } = props.history.location.state;

    const db = firebase.firestore();

    const coursesRef = db.collection('courses').doc(id);

    await coursesRef
      .get()
      .then(function (doc) {
        if (doc.exists) {
          setCourseData(doc.data());
          setProgress(false);
        } else {
          // doc.data() will be undefined in this case
          console.log('No such document!');
        }
      })
      .catch(function (error) {
        console.log('Error getting documents: ', error);
      });

    const classesRef = db.collection(`courses/${id}/classes`).orderBy('id');

    await classesRef
      .get()
      .then((querySnapshot) => {
        const classes = [];
        querySnapshot.forEach((doc) => {
          classes.push(doc.data());
        });
        setClassesData(classes);
        setProgress(false);
      })
      .catch(function (error) {
        console.log('Error getting documents: ', error);
      });
  };

  useEffect(() => {
    loadDataCourse();
  }, []);

  useEffect(() => {
    return () => {
      setCourseData([]);
      setClassesData([]);
    };
  }, []);

  return (
    <React.Fragment>
      <CssBaseline />
      <Navbar />

      {progress && (
        <Backdrop className={classes.backdrop} open={progress}>
          <CircularProgress color="inherit" />
          <p style={{ fontSize: 18, marginLeft: 10 }}>Carregando...</p>
        </Backdrop>
      )}

      <main>
        {/* Hero unit */}
        <div
          className={classes.heroContent}
          style={{
            backgroundImage: `url(
              ${Background}
            )`,
            width: '100%',
          }}
        >
          <Container maxWidth="sm">
            <Typography
              component="h1"
              variant="h3"
              align="center"
              color="textPrimary"
              gutterBottom
              style={{ color: '#fff', textShadow: '#000' }}
            >
              <b>{courseData.name}</b>
            </Typography>
            <Typography
              variant="h5"
              align="center"
              color="textSecondary"
              paragraph
              style={{ color: '#fff', textShadow: '#000', boxShadow: '5px' }}
            >
              {courseData.shortDescription}
            </Typography>

            <div className={classes.heroButtons}>
              <Grid container spacing={2} justify="center">
                <Grid item>
                  {courseData.price > 0 ? (
                    <form
                      action="https://pagseguro.uol.com.br/checkout/v2/payment.html"
                      method="post"
                      onSubmit={() => handleBuyCourse}
                      target="_blank"
                      style={{ width: '100%' }}
                    >
                      {/* <!-- NÃO EDITE OS COMANDOS DAS LINHAS ABAIXO --> */}
                      <input
                        type="hidden"
                        name="code"
                        value="162B809E2424004DD4312FB71861400C"
                      />
                      <input type="hidden" name="iot" value="button" />
                      <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        style={{ backgroundColor: '#318F6B' }}
                      >
                        <div
                          style={{
                            display: 'flex',
                            flexDirection: 'row',
                            justifyContent: 'flex-end',
                            alignItems: 'center',
                          }}
                        >
                          <MdAddShoppingCart size={18} color="#fff" />
                          <p
                            style={{
                              margin: '0px 0px 0px 10px',
                              fontSize: 16,
                              fontWeight: 'bold',
                              color: '#fff',
                            }}
                          >
                            {format(courseData.price)}
                          </p>
                        </div>
                      </Button>
                    </form>
                  ) : (
                    <Button
                      fullWidth
                      variant="contained"
                      style={{ backgroundColor: '#318F6B' }}
                    >
                      <p
                        style={{
                          margin: '0px 0px 0px 10px',
                          fontSize: 16,
                          fontWeight: 'bold',
                          color: '#fff',
                        }}
                      >
                        CURSO GRÁTIS
                      </p>
                    </Button>
                  )}
                </Grid>
              </Grid>
            </div>
          </Container>
        </div>
        {/* <h1 style={{ textAlign: "center", color: '#6d6d6d' }}>Nossos Cursos</h1> */}
        <Container className={classes.cardGrid} maxWidth="md">
          {/* End hero unit */}
          <Grid container spacing={4}>
            <Container maxWidth="lg" className={classes.container}>
              <Grid container spacing={3}>
                <Backdrop className={classes.backdrop} open={progress}>
                  <CircularProgress color="inherit" />
                  <p style={{ fontSize: 18, marginLeft: 10 }}>Carregando...</p>
                </Backdrop>

                {!progress ? (
                  <>
                    <TableContainer component={Paper}>
                      <Table
                        className={classes.table}
                        aria-label="simple table"
                      >
                        <TableHead>
                          <TableRow>
                            <TableCell>
                              <b>Aula</b>
                            </TableCell>
                            <TableCell align="left">
                              <b>Descrição</b>
                            </TableCell>
                            <TableCell align="right"></TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {classesData.map((classe) => (
                            <TableRow key={classe.id}>
                              <TableCell
                                component="th"
                                scope="row"
                                style={{ minWidth: 100 }}
                              >
                                {classe.order}
                              </TableCell>
                              <TableCell
                                align="left"
                                style={{ textAlign: 'justify' }}
                              >
                                {classe.description}
                              </TableCell>
                              <TableCell align="right">
                                <Button
                                  variant="contained"
                                  size="small"
                                  style={{
                                    backgroundColor: 'rgba(126,64,144,1)',
                                    color: '#fff',
                                  }}
                                  onClick={() =>
                                    handleWatchClasse(classe.id, courseData.id)
                                  }
                                >
                                  Assistir
                                </Button>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </TableContainer>
                  </>
                ) : (
                  ''
                )}
              </Grid>
            </Container>
          </Grid>
        </Container>
      </main>
      {/* Footer */}
      <footer className={classes.footer}>
        {/* <Typography variant="h6" align="center" gutterBottom>
          Footer
        </Typography>
        <Typography
          variant="subtitle1"
          align="center"
          color="textSecondary"
          component="p"
        >
          Something here to give the footer a purpose!
        </Typography> */}
        {/* <div>
          Ícones feitos por{" "}
          <a
            href="https://www.flaticon.com/br/autores/pixelmeetup"
            title="Pixelmeetup"
          >
            Pixelmeetup
          </a>{" "}
          from{" "}
          <a href="https://www.flaticon.com/br/" title="Flaticon">
            www.flaticon.com
          </a>
        </div> */}
        <Copyright />
      </footer>
      {/* End footer */}
    </React.Fragment>
  );
}
