import Backdrop from '@material-ui/core/Backdrop';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';
import firebase from 'firebase';
import React, { useEffect, useRef, useState } from 'react';
import {
  MdAddShoppingCart,
  MdPlayCircleFilled,
  MdShoppingCart,
} from 'react-icons/md';
import { BigPlayButton, ControlBar, Player } from 'video-react';
import Background from '../../assets/background-default.jpg';
import Copyright from '../../components/Copyright';
import ModalWithMedia from '../../components/ModalWithMedia';
import ResponsiveNavbar from '../../components/ResponsiveNavbar';
import { customizations } from '../../configs/customizations';
import { istAuthenticated } from '../../services/auth';
import { format } from '../../util/format';
import { addToCart } from '../../util/utils';

const useStyles = makeStyles((theme) => ({
  icon: {
    marginRight: theme.spacing(2),
  },
  heroContent: {
    padding: theme.spacing(8, 0, 6),
    backgroundImage: `url(
      ${Background}
    )`,
    backgroundRepeat: 'no-repeat',
    backgroundSize: '100%',

    [theme.breakpoints.down(600 + theme.spacing(2) * 2)]: {
      width: '100%',
    },

    [theme.breakpoints.down(450 + theme.spacing(2) * 2)]: {
      backgroundImage: 'none',
    },
  },
  heroButtons: {
    marginTop: theme.spacing(4),
    [theme.breakpoints.down(450 + theme.spacing(2) * 2)]: {
      width: '100%',
      position: 'fixed',
      bottom: '50%',
    },
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
  container: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',

    [theme.breakpoints.down(600 + theme.spacing(2) * 2)]: {
      flexDirection: 'column-reverse',
      justifyContent: 'center',
    },

    [theme.breakpoints.down(450 + theme.spacing(2) * 2)]: {
      flexDirection: 'column-reverse',
      justifyContent: 'center',
    },
  },
  cardVideo: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: '250px',
    padding: '10px',
    backgroundColor: '#fff',
    borderRadius: '4px',
    opacity: 0.9,

    [theme.breakpoints.down(600 + theme.spacing(2) * 2)]: {
      padding: '0px',
      height: '150px',
    },

    [theme.breakpoints.down(450 + theme.spacing(2) * 2)]: {
      marginTop: '-50px',
      marginBottom: '10px',
      padding: '0px',
      height: '150px',
    },
  },
  video: {
    width: '30%',

    [theme.breakpoints.down(600 + theme.spacing(2) * 2)]: {
      width: '100%',
      height: '32%',
      position: 'fixed',
      marginTop: '10px',
    },

    [theme.breakpoints.down(450 + theme.spacing(2) * 2)]: {
      width: '100%',
      height: '32%',
      position: 'fixed',
      marginTop: '47px',
    },
  },
  containerText: {
    width: '70%',
    [theme.breakpoints.down(600 + theme.spacing(2) * 2)]: {
      width: '100%',
      margin: '0px',
      padding: '0px',
    },

    [theme.breakpoints.down(450 + theme.spacing(2) * 2)]: {
      width: '100%',
      margin: '0px',
      padding: '0px',
    },
  },
  title: {
    color: '#fff',
    textShadow: '2px 2px #000',

    [theme.breakpoints.down(600 + theme.spacing(2) * 2)]: {
      marginTop: '10px',
      textAlign: 'center',
      fontSize: '22px',
    },

    [theme.breakpoints.down(450 + theme.spacing(2) * 2)]: {
      textAlign: 'center',
      marginTop: '2px',
      fontSize: '14px',
      position: 'fixed',
      bottom: '45%',
    },
  },
  description: {
    color: '#fff',

    [theme.breakpoints.down(600 + theme.spacing(2) * 2)]: {
      textAlign: 'center',
      fontSize: '14px',
    },

    [theme.breakpoints.down(450 + theme.spacing(2) * 2)]: {
      textAlign: 'center',
      fontSize: '11px',
    },
  },

  price: {
    color: '#505763',

    [theme.breakpoints.down(600 + theme.spacing(2) * 2)]: {
      marginTop: '10px',
      textAlign: 'center',
      fontSize: '22px',
    },

    [theme.breakpoints.down(450 + theme.spacing(2) * 2)]: {
      textAlign: 'center',
      marginTop: '2px',
      fontSize: '14px',
    },
  },

  containerInfos: {
    display: 'flex',
    justifyContent: 'flex-start',

    [theme.breakpoints.down(600 + theme.spacing(2) * 2)]: {
      justifyContent: 'center',
      margin: '0px',
      padding: '0px',
    },

    [theme.breakpoints.down(450 + theme.spacing(2) * 2)]: {
      justifyContent: 'center',
      margin: '0px',
      padding: '0px',
    },
  },
  table: {
    [theme.breakpoints.down(450 + theme.spacing(2) * 2)]: {
      marginTop: '50px;',
    },
  },
  info: {
    color: '#fff',
    marginRight: '20px',
    fontSize: '16px',

    [theme.breakpoints.down(600 + theme.spacing(2) * 2)]: {
      textAlign: 'center',
      marginRight: '10px',
      fontSize: '14px',
    },

    [theme.breakpoints.down(450 + theme.spacing(2) * 2)]: {
      textAlign: 'center',
      margin: '0px',
      fontSize: '11px',
    },
  },
  grid: {
    display: 'flex',
  },
  containerButton: {
    width: '100%',
    [theme.breakpoints.down(600 + theme.spacing(2) * 2)]: {
      width: '100%',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
    },

    [theme.breakpoints.down(450 + theme.spacing(2) * 2)]: {
      width: '100%',
    },
  },
  button: {
    backgroundColor: `${customizations?.secondaryColor}`,
    marginBottom: '10px',
    [theme.breakpoints.down(600 + theme.spacing(2) * 2)]: {
      width: '50%',
    },

    [theme.breakpoints.down(450 + theme.spacing(2) * 2)]: {
      width: '50%',
    },
  },
}));

export default function CoursesDetails(props) {
  const classes = useStyles();
  const [classesData, setClassesData] = useState([]);
  const [courseData, setCourseData] = useState([]);
  const [progress, setProgress] = useState(false);
  const [open, setOpen] = useState(false);
  const [urlClasse, setUrlClasse] = useState('');
  const [titleClasse, setTitleClasse] = useState('');
  const playerRef = useRef();

  const handleStartFreeCourse = (idCourseFree) => {
    if (!istAuthenticated()) {
      props.history.push('/sign-in', { idCourseFree });
      return;
    }
    props.history.push('/register-course', { idCourseFree });
  };

  const handleClickOpen = (urlVideo, titleClasse) => {
    setUrlClasse(urlVideo);
    setTitleClasse(titleClasse);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleBuyCourse = (course) => {
    addToCart(course, props, true);
    if (!istAuthenticated()) {
      props.history.push('/sign-in', { idCourseFree: 0, toCart: true });
      return;
    }
  };

  // const handleAddToCart = (course) => {
  //   addToCart(course, props, false);
  // };

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

    const classesRef = db
      .collection(`courses/${id}/classes`)
      .orderBy('position');

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
    return () => {
      setCourseData([]);
      setClassesData([]);
    };

    //eslint-disable-next-line
  }, []);

  return (
    <React.Fragment>
      <CssBaseline />
      <ResponsiveNavbar history={props?.history} />

      <ModalWithMedia
        open={open}
        handleClose={handleClose}
        url={urlClasse}
        title={titleClasse}
      />

      {progress && (
        <Backdrop className={classes.backdrop} open={progress}>
          <CircularProgress color="inherit" />
          <p style={{ fontSize: 18, marginLeft: 10 }}>Carregando...</p>
        </Backdrop>
      )}

      <main>
        {/* Hero unit */}
        <div className={classes.heroContent}>
          <Container maxWidth="lg" className={classes.container}>
            <div className={classes.containerText}>
              <Typography
                component="h1"
                variant="h3"
                align="left"
                color="textPrimary"
                gutterBottom
                className={classes.title}
              >
                <b>{courseData.name}</b>
              </Typography>
              <Typography
                variant="h5"
                align="left"
                color="textSecondary"
                paragraph
                className={classes.description}
              >
                {courseData.shortDescription}
              </Typography>
              <div className={classes.containerInfos}>
                <h3 className={classes.info}>{classesData.length} Aula (s)</h3>
                <h3 className={classes.info}>{courseData.duration} Hora (s)</h3>
              </div>
            </div>
            <div className={classes.cardVideo}>
              <Player
                key={classesData.map(
                  (classe) => classe.position === 1 && classe.id
                )}
                src={classesData.map(
                  (classe) => classe.position === 1 && classe.url_video
                )}
                playsInline
                fluid={false}
                poster={courseData.image}
                ref={playerRef}
                className={classes.video}
              >
                <ControlBar autoHide={false}></ControlBar>
                <BigPlayButton position="center" />
              </Player>

              <Typography
                component="h1"
                variant="h5"
                align="center"
                color="textPrimary"
                gutterBottom
                className={classes.price}
              >
                <b>{format(courseData.price)}</b>
              </Typography>

              {!progress && (
                <div className={classes.heroButtons}>
                  <Grid
                    container
                    className={classes.grid}
                    spacing={2}
                    justify="center"
                  >
                    {courseData.price > 0 ? (
                      <>
                        <input
                          type="hidden"
                          name="code"
                          value={courseData.codePayment}
                        />
                        <input type="hidden" name="iot" value="button" />
                        <Button
                          type="submit"
                          fullWidth
                          variant="contained"
                          onClick={() => handleBuyCourse(courseData)}
                          className={classes.button}
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
                      </>
                    ) : (
                      <Button
                        fullWidth
                        variant="contained"
                        className={classes.button}
                        onClick={() => handleStartFreeCourse(courseData.id)}
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
                </div>
              )}
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
                            <TableCell align="center">
                              <b>Nome da Aula</b>
                            </TableCell>
                            <TableCell align="center">
                              <b>Duração</b>
                            </TableCell>
                            <TableCell align="right">
                              <b></b>
                            </TableCell>
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
                                {classe.position}
                              </TableCell>
                              <TableCell
                                align="center"
                                style={{ textAlign: 'center' }}
                              >
                                {classe.title}
                              </TableCell>
                              <TableCell
                                align="center"
                                style={{ textAlign: 'center' }}
                              >
                                {classe.duration} Min.
                              </TableCell>
                              <Tooltip
                                title={
                                  classe?.open
                                    ? 'Assista gratuitamente'
                                    : 'Aula privada'
                                }
                              >
                                <TableCell
                                  align="center"
                                  style={{
                                    textAlign: 'center',
                                    cursor: 'pointer',
                                  }}
                                >
                                  {classe?.open ? (
                                    <MdPlayCircleFilled
                                      size={25}
                                      onClick={() =>
                                        handleClickOpen(
                                          classe?.url_video,
                                          classe?.title
                                        )
                                      }
                                    ></MdPlayCircleFilled>
                                  ) : (
                                    <MdShoppingCart
                                      size={25}
                                      onClick={() =>
                                        handleStartFreeCourse(courseData.id)
                                      }
                                    />
                                  )}
                                </TableCell>
                              </Tooltip>
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
