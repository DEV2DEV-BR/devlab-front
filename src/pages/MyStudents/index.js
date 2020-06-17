import Backdrop from '@material-ui/core/Backdrop';
import Box from '@material-ui/core/Box';
import CircularProgress from '@material-ui/core/CircularProgress';
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import firebase from 'firebase';
import MaterialTable from 'material-table';
import React, { useEffect, useState } from 'react';
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
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
  container: {
    display: 'flex',
    paddingTop: theme.spacing(2),
    // paddingBottom: theme.spacing(4),
    alignItems: 'center',
    justifyContent: 'center',
  },
}));

export default function Dashboard(props) {
  const classes = useStyles();

  const history = useState(props.history);
  const [progress, setProgress] = useState(false);
  const [allStudents, setAllStudents] = useState([]);

  const [state, setState] = React.useState({
    columns: [
      { title: 'Nome', field: 'name' },
      { title: 'Celular', field: 'cellphone' },
      { title: 'E-mail', field: 'email' },
    ],
    data: allStudents,
  });

  const loadDataCourses = () => {
    setProgress(true);

    async function fetchData() {
      const db = firebase.firestore();

      const studentsRef = db.collection('users').orderBy('name');

      await studentsRef
        .where('userType', '==', 'student')
        .get()
        .then((querySnapshot) => {
          const students = [];
          querySnapshot.forEach((doc) => {
            const { name, cellphone, email } = doc.data();

            const studentObject = {
              name,
              cellphone,
              email,
            };
            students.push(studentObject);
          });

          setAllStudents(students);
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
      setAllStudents('');
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

      <main className={classes.content}>
        <div className={classes.appBarSpacer} />

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
              width: '100%',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <MaterialTable
              title="Alunos"
              columns={state.columns}
              style={{ width: '100%' }}
              data={allStudents}
              editable={{}}
              // editable={{
              //   onRowAdd: (newData) =>
              //     new Promise((resolve) => {
              //       setTimeout(() => {
              //         resolve();
              //         setState((prevState) => {
              //           const data = [...prevState.data];
              //           data.push(newData);
              //           return { ...prevState, data };
              //         });
              //       }, 600);
              //     }),
              //   onRowUpdate: (newData, oldData) =>
              //     new Promise((resolve) => {
              //       setTimeout(() => {
              //         resolve();
              //         if (oldData) {
              //           setState((prevState) => {
              //             const data = [...prevState.data];
              //             data[data.indexOf(oldData)] = newData;
              //             return { ...prevState, data };
              //           });
              //         }
              //       }, 600);
              //     }),
              //   onRowDelete: (oldData) =>
              //     new Promise((resolve) => {
              //       setTimeout(() => {
              //         resolve();
              //         setState((prevState) => {
              //           const data = [...prevState.data];
              //           data.splice(data.indexOf(oldData), 1);
              //           return { ...prevState, data };
              //         });
              //       }, 600);
              //     }),
              // }}
            />
          </Grid>
        </Container>
        <Box pt={4}>
          <Copyright />
        </Box>
      </main>
    </div>
  );
}
