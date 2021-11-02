import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import firebase from 'firebase';
import React, { useEffect, useState } from 'react';
import Copyright from '../../components/Copyright';
import CoursesList from '../../components/CoursesList';
import Reports from '../../components/Reports';

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
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  courseList: {
    display: 'flex',
    justifyContent: 'center',

    [theme.breakpoints.down(600 + theme.spacing(2) * 2)]: {
      flexDirection: 'column',
      alignItems: 'center',
    },
  },

  messageCompletData: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
}));

export default function Dashboard(props) {
  const classes = useStyles();

  const [history] = useState(props.history);

  const validData = async () => {
    const db = firebase.firestore();

    const usersRef = db.collection('users');

    firebase.auth().onAuthStateChanged(function (user) {
      if (user) {
        usersRef
          .where('uid', '==', user.uid)
          .get()
          .then((querySnapshot) => {

          })
          .catch((error) => {
            console.log(error);
          });
      }
    });
  };

  useEffect(() => {
    validData();
  }, []);

  return (
    <div className={classes.root}>
      <CssBaseline />

      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="lg" className={classes.container}>
          {localStorage?.getItem('userType') === 'teacher' && (
            <Grid container spacing={3}>
              <Reports />
            </Grid>
          )}

          {localStorage?.getItem('userType') === 'student' && (
            <Grid container spacing={3} className={classes.courseList}>
              <CoursesList buy={false} history={history} />
            </Grid>
          )}
        </Container>
        <Box pt={4} style={{ position: 'absolute', bottom: 0, width: '100%' }}>
          <Copyright />
        </Box>
      </main>
    </div>
  );
}
