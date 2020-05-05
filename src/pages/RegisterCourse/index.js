import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import firebase from 'firebase';
import React, { useEffect, useState } from 'react';
import Copyright from '../../components/Copyright';
import MenuLeft from '../../components/MenuLeft';
import Course from '../../components/Course';

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
}));

export default function RegisterCourse(props) {
  const classes = useStyles();
  const [history, setHistory] = useState(props.history);
  const [courseData, setCourseData] = useState([]);
  const [progress, setProgress] = useState(false);

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
  };

  useEffect(() => {
    return () => {
      setHistory('');
    };
  }, []);

  return (
    <div className={classes.root}>
      <CssBaseline />
      <div>
        <div className={classes.appBarSpacer} />
        <MenuLeft props={history} />
      </div>

      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="lg" className={classes.container}>
          <Grid
            container
            spacing={3}
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Course id={props.history.location.state.idCourseFree} />
          </Grid>
        </Container>
        <Box pt={4}>
          <Copyright />
        </Box>
      </main>
    </div>
  );
}
