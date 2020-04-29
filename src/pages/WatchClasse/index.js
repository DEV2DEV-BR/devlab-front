import Backdrop from '@material-ui/core/Backdrop';
import Box from '@material-ui/core/Box';
import CircularProgress from '@material-ui/core/CircularProgress';
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import FormControl from '@material-ui/core/FormControl';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import firebase from 'firebase';
import React, { useEffect, useState } from 'react';
import Copyright from '../../components/Copyright';
import MenuLeft from '../../components/MenuLeft';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
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
    width: '80%',
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  table: {
    minWidth: 650,
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
}));

export default function WatchClasse(props) {
  const classes = useStyles();

  const [classesData, setClassesData] = useState([]);
  const [courseData, setCourseData] = useState([]);
  const [progress, setProgress] = useState(false);

  const loadData = async () => {
    if (!props.history.location.state) {
      return props.history.push('/dashboard');
    }

    const { idCourse, idClasse } = props.history.location.state;

    const db = firebase.firestore();

    const coursesRef = db.collection('courses').doc(idCourse);

    await coursesRef
      .get()
      .then(function (doc) {
        if (doc.exists) {
          setCourseData(doc.data());
        } else {
          // doc.data() will be undefined in this case
          console.log('No such document!');
        }
      })
      .catch(function (error) {
        console.log('Error getting documents: ', error);
      });

    const classesRef = db
      .collection(`courses/${idCourse}/classes`)
      .orderBy('id');

    await classesRef
      .get()
      .then((querySnapshot) => {
        const classes = [];
        querySnapshot.forEach((doc) => {
          if (doc.data().id == idClasse) {
            classes.push(doc.data());
          }
        });
        setClassesData(classes);
        setProgress(false);
      })
      .catch(function (error) {
        console.log('Error getting documents: ', error);
      });
  };

  const goBack = () => {
    props.history.goBack();
  };
  useEffect(() => {
    setProgress(true);
    loadData();
  }, []);

  useEffect(() => {
    return () => {
      setClassesData([]);
    };
  }, []);

  return (
    <div style={{ display: 'flex', flexDirection: 'row' }}>
      <div>
        <div className={classes.appBarSpacer} />
        <MenuLeft props={props.history} />
      </div>

      <div className={classes.root}>
        <CssBaseline />

        <main className={classes.content}>
          <div className={classes.appBarSpacer} />
          <Container maxWidth="lg" className={classes.container}>
            <Grid container spacing={3}>
              <Backdrop className={classes.backdrop} open={progress}>
                <CircularProgress color="inherit" />
                <p style={{ fontSize: 18, marginLeft: 10 }}>Carregando...</p>
              </Backdrop>

              {!progress ? (
                <>
                  <FormControl
                    variant="outlined"
                    fullWidth
                    className={classes.formControl}
                  >
                    <Grid container spacing={2}>
                      <Grid
                        item
                        xs={12}
                        style={{
                          marginBottom: 10,
                        }}
                      >
                        <Button
                          variant="contained"
                          style={{
                            backgroundColor: '#318F6B',
                            color: '#fff',
                          }}
                          onClick={() => goBack()}
                        >
                          Voltar para o curso
                        </Button>
                      </Grid>
                    </Grid>
                  </FormControl>
                  <FormControl
                    variant="outlined"
                    fullWidth
                    className={classes.formControl}
                  >
                    <Grid container spacing={2}>
                      <Grid
                        item
                        xs={12}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}
                      >
                        {classesData.map((classe) => (
                          <video
                            key={classe.id}
                            src={classe.url_video}
                            controls
                            controlsList="nodownload"
                            style={{ width: '100%' }}
                          />
                        ))}
                      </Grid>
                    </Grid>
                  </FormControl>
                </>
              ) : (
                ''
              )}
            </Grid>
          </Container>
          {!progress && (
            <Box pt={4}>
              <Copyright />
            </Box>
          )}
        </main>
      </div>
    </div>
  );
}
