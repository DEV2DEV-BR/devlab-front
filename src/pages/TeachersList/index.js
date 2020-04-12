import { Button } from '@material-ui/core';
import Box from '@material-ui/core/Box';
import CircularProgress from '@material-ui/core/CircularProgress';
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import firebase from 'firebase';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import Copyright from '../../components/Copyright';
import MenuLeft from '../../components/MenuLeft';

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
}));

export default function TeacherList(props) {
  const classes = useStyles();

  const [teachersDate, setTeachersDate] = useState([]);
  const [progress, setProgress] = useState(false);
  const [userDelete, setUserDelete] = useState('');
  const [userData, setuserData] = useState([]);

  const [open, setOpen] = useState(false);

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

  const handleClickOpen = (user) => {
    setUserDelete(user);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDelete = (user) => {
    const db = firebase.firestore();

    db.collection('users')
      .doc(`${user.id}`)
      .delete()
      .then(function () {
        notifySuccess(`${user.name} foi excluido!`);
        handleClose();
        loadData();
        console.log('Document successfully deleted!');
      })
      .catch(function (error) {
        notifyError('Falha ao excluir!');
        console.error('Error removing document: ', error);
      });
  };

  const loadData = async () => {
    setProgress(true);
    const db = firebase.firestore();
    const usersRef = db.collection('users').orderBy('name', 'asc');

    await usersRef
      .where('userType', '==', 'teacher')
      .get()
      .then((querySnapshot) => {
        const teachers = [];
        querySnapshot.forEach((doc) => {
          teachers.push(doc.data());
        });
        setTeachersDate(teachers);
        setuserData([JSON.parse(localStorage.getItem('userData'))]);
        setProgress(false);
      })
      .catch(function (error) {
        console.log('Error getting documents: ', error);
      });
  };

  const handleRedirectToEditTeacher = (teacher) => {
    props.history.push('/teacher-edit', { teacher });
  };
  const updatePage = () => {
    loadData();
  };

  useEffect(() => {
    loadData();
  }, []);

  useEffect(() => {
    return () => {
      setTeachersDate([]);
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
              <h1>Todos Professores</h1>
              {progress ? (
                <CircularProgress />
              ) : (
                <>
                  <Button
                    variant="contained"
                    size="small"
                    color="default"
                    style={{ marginBottom: 20 }}
                    onClick={() => updatePage()}
                  >
                    Atualizar página
                  </Button>
                </>
              )}
            </div>
            {!progress ? (
              <TableContainer component={Paper}>
                <Table className={classes.table} aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell>
                        <b>Nome</b>
                      </TableCell>
                      <TableCell align="right"></TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {teachersDate.map((teacher) => (
                      <TableRow key={teacher.id}>
                        <TableCell
                          component="th"
                          scope="row"
                          style={{ minWidth: 100 }}
                        >
                          {teacher.name}
                        </TableCell>

                        <TableCell align="right">
                          <Button
                            variant="contained"
                            size="small"
                            style={{
                              backgroundColor: '#837aee',
                              color: '#fff',
                              marginRight: 5,
                            }}
                            onClick={() => handleRedirectToEditTeacher(teacher)}
                          >
                            Editar
                          </Button>
                          <Button
                            variant="contained"
                            size="small"
                            style={{
                              backgroundColor: '#E63D58',
                              color: '#fff',
                            }}
                            onClick={() => handleClickOpen(teacher)}
                          >
                            Excluir
                          </Button>
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
      <div>
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            Você deseja excluir {userDelete.name} ?
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Lembre-se, essa é uma operação irreversível!
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Cancelar
            </Button>
            <Button
              onClick={() => handleDelete(userDelete)}
              color="secondary"
              autoFocus
            >
              Excluir
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    </div>
  );
}
