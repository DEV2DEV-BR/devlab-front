import Backdrop from '@material-ui/core/Backdrop';
import Box from '@material-ui/core/Box';
import CircularProgress from '@material-ui/core/CircularProgress';
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import FormControl from '@material-ui/core/FormControl';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import { makeStyles } from '@material-ui/core/styles';
import EditIcon from '@material-ui/icons/Edit';
import NoEncryptionIcon from '@material-ui/icons/NoEncryption';
import React, { useEffect, useState } from 'react';
import Copyright from '../../components/Copyright';
import MenuLeft from '../../components/MenuLeft';
import firebase from 'firebase';
import Snackbar from '@material-ui/core/Snackbar';

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

  const [history, setHistory] = useState(props.history);
  const [progress, setProgress] = useState(false);
  const [coursesData, setCoursesData] = useState([]);

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
        {coursesData.length == 0 && (
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
                        src={course.image}
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
                      <IconButton aria-label="share">
                        <EditIcon />
                      </IconButton>
                      <IconButton aria-label="share">
                        <NoEncryptionIcon />
                      </IconButton>
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
