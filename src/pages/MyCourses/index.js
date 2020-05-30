import Backdrop from '@material-ui/core/Backdrop';
import Box from '@material-ui/core/Box';
import CircularProgress from '@material-ui/core/CircularProgress';
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import FormControl from '@material-ui/core/FormControl';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import { makeStyles } from '@material-ui/core/styles';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import EditIcon from '@material-ui/icons/Edit';
import VisibilityIcon from '@material-ui/icons/Visibility';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';
import firebase from 'firebase';
import React, { useEffect, useState } from 'react';
import LoadingImage from '../../assets/loading.gif';
import Copyright from '../../components/Copyright';
import MenuLeft from '../../components/MenuLeft';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import { toast } from 'react-toastify';
import Tooltip from 'react-tooltip-lite';

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

export default function Dashboard(props) {
  const classes = useStyles();

  const history = useState(props.history);
  const [progress, setProgress] = useState(false);
  const [coursesData, setCoursesData] = useState([]);
  const [open, setOpen] = useState(false);
  const [courseEnabled, setCourseEnabled] = useState('');

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

  const handleClickOpen = (course) => {
    setCourseEnabled(course);
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

  const handleEdit = () => {
    // console.log('edit');
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
        <MenuLeft props={history} />
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
                  <p style={{ fontSize: 14 }}>Você ainda não tem cursos.</p>
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
                        <h2 style={{ color: '#7a7171', margin: 0, padding: 0 }}>
                          {course.name}
                        </h2>
                        <p style={{ color: '#918787', margin: 0, padding: 0 }}>
                          {coursesData.length} Aula (s)
                        </p>
                      </div>
                    </div>
                    <div style={{ display: 'flex' }}>
                      <Tooltip content="Editar" direction="bottom">
                        <IconButton aria-label="edit" onClick={() => {}}>
                          <EditIcon />
                        </IconButton>
                      </Tooltip>

                      <Tooltip content="Adicionar Aulas" direction="bottom">
                        <IconButton
                          aria-label="add"
                          onClick={() => handleAddClasses(course.id)}
                        >
                          <AddCircleIcon />
                        </IconButton>
                      </Tooltip>

                      <Tooltip
                        content={
                          course.enable ? 'Desativar Curso' : 'Ativar Curso'
                        }
                        direction="bottom"
                      >
                        <IconButton
                          aria-label="disable"
                          onClick={() => handleClickOpen(course)}
                        >
                          {course.enable ? (
                            <VisibilityIcon />
                          ) : (
                            <VisibilityOffIcon />
                          )}
                        </IconButton>
                      </Tooltip>
                    </div>
                  </Grid>
                </Grid>
              </FormControl>
            </Grid>
            <Dialog
              open={open}
              onClose={handleClose}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
            >
              <DialogTitle id="alert-dialog-title">
                Você deseja {course.enable ? 'desativar' : 'ativar'}:
                <b>{course.name}</b> ?
              </DialogTitle>
              <DialogContent>
                <DialogContentText id="alert-dialog-description">
                  Você poderá {course.enable ? 'desativa-lo' : 'ativa-lo'} no
                  futuro.
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button onClick={handleClose} color="primary">
                  Cancelar
                </Button>
                <Button
                  onClick={() => toggleStateCourse(course)}
                  color="secondary"
                  autoFocus
                >
                  {course.enable ? 'desativar' : 'ativar'}
                </Button>
              </DialogActions>
            </Dialog>
          </Container>
        ))}
        <Box pt={4}>
          <Copyright />
        </Box>
      </main>
    </div>
  );
}
