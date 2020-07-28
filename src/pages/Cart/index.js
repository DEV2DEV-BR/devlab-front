import Backdrop from '@material-ui/core/Backdrop';
import Box from '@material-ui/core/Box';
import CircularProgress from '@material-ui/core/CircularProgress';
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import FormControl from '@material-ui/core/FormControl';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import { makeStyles } from '@material-ui/core/styles';
import Tooltip from '@material-ui/core/Tooltip';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import DeleteIcon from '@material-ui/icons/Delete';
import firebase from 'firebase';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import LoadingImage from '../../assets/loading.gif';
import Copyright from '../../components/Copyright';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    width: '100%',
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
    paddingTop: theme.spacing(2),
    // paddingBottom: theme.spacing(4),
    alignItems: 'center',
    justifyContent: 'center',
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
}));

export default function Cart(props) {
  const classes = useStyles();

  const history = useState(props.history);
  const [progress, setProgress] = useState(false);
  const [coursesData, setCoursesData] = useState([]);
  const [open, setOpen] = useState(false);
  const [messageBody, setMessageBody] = useState('');
  const [title, setTitle] = useState('');
  const [action, setAction] = useState('');
  const [textButton, setTextButton] = useState('');

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

  const handleClickOpen = (action, course) => {
    if (action === 'toggle') {
      setTitle(
        `Você deseja ${course.enable ? 'desativar' : 'ativar'} o curso:  ${
        course.name
        } ?`
      );
      setMessageBody(
        `Você poderá ${course.enable ? 'desativa-lo' : 'ativa-lo'} no futuro.`
      );
      setAction('toggle');
      setTextButton(course.enable ? 'desativar' : 'ativar');
    } else {
      setTitle(`Desejar editar o curso: ${course.name}?`);
      setMessageBody('Você será redirecionado para uma outra página!');
      setAction('edit');
      setTextButton('Editar');
    }

    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const toggleStateCourse = (course) => {
    const status = course.enable;

    const db = firebase.firestore();
    var courseRef = db.collection('courses').doc(course.id);

    courseRef
      .update({
        enable: !status,
      })
      .then(function () {
        notifySuccess('Dados atualizados com sucesso!');
        setProgress(false);
        loadDataCourses();
        handleClose();
      })
      .catch(function (error) {
        // The document probably doesn't exist.
        console.error('Error updating document: ', error);
        setProgress(false);
      });
  };

  const handleEdit = (id) => {
    props.history.push('/create-course', { id });
  };

  const handleAddClasses = (id) => {
    props.history.push('/add-classes', { id });
  };

  const loadDataCourses = () => {
    setProgress(true);

    async function fetchData() {
      const db = firebase.firestore();

      const coursesRef = db.collection('courses');

      await coursesRef
        .where('author', '==', localStorage.getItem('user'))
        .get()
        .then((querySnapshot) => {
          const courses = [];
          querySnapshot.forEach((doc) => {
            courses.push(doc.data());
          });
          setCoursesData(courses);
          setProgress(false);
        })
        .catch(function (error) {
          console.log('Error getting documents: ', error);
        });
    }

    fetchData();
  };

  useEffect(() => {
    loadDataCourses();
  }, []);

  useEffect(() => {
    return () => {
      setCoursesData('');
    };
  }, []);

  return (
    <div className={classes.root}>
      {progress && (
        <Backdrop className={classes.backdrop} open={progress}>
          <CircularProgress color="inherit" />
          <p style={{ fontSize: 18, marginLeft: 10 }}>Carregando...</p>
        </Backdrop>
      )}

      <CssBaseline />
      <div>
        <div className={classes.appBarSpacer} />
      </div>

      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        {coursesData.length === 0 && (
          <Container
            maxWidth="lg"
            className={classes.container}
            style={{ height: '80%' }}
          >
            <Grid
              container
              spacing={3}
              style={{
                display: 'flex',
                width: '80%',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <FormControl
                variant="outlined"
                fullWidth
                className={classes.formControl}
                style={{
                  display: 'flex',
                  borderWidth: '1px',
                  borderColor: '#c6b3b3',
                  borderStyle: 'solid',
                  borderRadius: 4,
                  margin: 10,
                  padding: 5,
                }}
              >
                <Grid
                  container
                  spacing={2}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    height: '100px',
                    justifyContent: 'center',
                    backgroundColor: '#c8a2d3',
                  }}
                >
                  <p style={{ fontSize: 14 }}>Seu carrinho ainda está vazio.</p>
                </Grid>
              </FormControl>
            </Grid>
          </Container>
        )}
        {coursesData.map((course) => (
          <Container
            maxWidth="lg"
            className={classes.container}
            key={course.id}
          >
            <Grid
              container
              spacing={3}
              style={{
                display: 'flex',
                width: '80%',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <FormControl
                variant="outlined"
                fullWidth
                className={classes.formControl}
                style={{
                  display: 'flex',
                  borderWidth: '1px',
                  borderColor: '#c6b3b3',
                  borderStyle: 'solid',
                  borderRadius: 4,
                  margin: 10,
                  padding: 5,
                }}
              >
                <Grid container spacing={2}>
                  <Grid
                    item
                    xs={12}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                    }}
                  >
                    <div
                      style={{
                        display: 'flex',
                        justifyContent: 'center',
                      }}
                    >
                      <img
                        src={course.image || LoadingImage}
                        alt="course"
                        style={{
                          width: '100px',
                          height: '60px',
                          borderRadius: 5,
                        }}
                      />
                      <div
                        style={{
                          display: 'flex',
                          flexDirection: 'column',
                          justifyContent: 'center',
                          marginLeft: 12,
                        }}
                      >
                        <p style={{ color: '#7a7171', margin: 0, padding: 0, fontSize: 17 }}>
                          {course.name}
                        </p>
                        <p style={{ color: '#918787', margin: 0, padding: 0 }}>
                          {course.duration} Horas
                        </p>
                      </div>
                    </div>
                    <div style={{ display: 'flex' }}>

                      <Tooltip title="Retirar do carrinho" placement="bottom">
                        <IconButton
                          aria-label="delete"
                          onClick={() => handleAddClasses(course.id)}
                        >
                          <DeleteIcon />
                        </IconButton>
                      </Tooltip>


                    </div>
                  </Grid>
                </Grid>
              </FormControl>
            </Grid>

          </Container>
        ))}
        <Box pt={4}>
          <Copyright />
        </Box>
      </main>
    </div>
  );
}
