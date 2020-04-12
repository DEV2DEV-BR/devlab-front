import { Button } from '@material-ui/core';
import Box from '@material-ui/core/Box';
import CircularProgress from '@material-ui/core/CircularProgress';
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import FormControl from '@material-ui/core/FormControl';
import Grid from '@material-ui/core/Grid';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import { makeStyles } from '@material-ui/core/styles';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import firebase from 'firebase';
import React, { useEffect, useState } from 'react';
import Copyright from '../../components/Copyright';
import MenuLeft from '../../components/MenuLeft';
import { toast } from 'react-toastify';

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
    flexDirection: 'column',
    alignItems: 'center',
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%', // Fix IE 11 issue.
    alignItems: 'center',
    marginTop: theme.spacing(3),
  },
  submitLeft: {
    margin: theme.spacing(3, 0, 2),
    marginRight: 10,
    width: '70%',
  },
  submitRight: {
    margin: theme.spacing(3, 0, 2),
    marginLeft: 10,
    width: '30%',
  },
}));

export default function SendSchoolWork(props) {
  const classes = useStyles();
  const [userData, setUserData] = useState([]);
  const [image, setImage] = useState(null);
  const [grade, setGrade] = useState('');
  const [discipline, setDiscipline] = useState('');
  const [description, setDescription] = useState('');
  const [progress, setProgress] = useState(false);
  const [progressUserData, setProgressUserData] = useState(false);

  const handleChangeDiscipline = (event) => {
    setDiscipline(event.target.value);
  };

  const handleChangeDescription = (event) => {
    setDescription(event.target.value);
  };

  const handleChange = (e) => {
    if (e.target.files[0]) {
      const image = e.target.files[0];
      setImage(image);
    }
  };
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

  useEffect(() => {
    setProgressUserData(true);
    const db = firebase.firestore();

    const usersRef = db.collection('users');

    firebase.auth().onAuthStateChanged(function (user) {
      if (user) {
        usersRef
          .where('uid', '==', user.uid)
          .get()
          .then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
              setUserData(doc.data());
              setProgressUserData(false);
            });
          });
      }
    });
  }, []);

  const handleClear = () => {
    setGrade('');
    setDiscipline('');
    setDescription('');
  };

  const extensionsPermitted = [
    'txt',
    'doc',
    'docx',
    'xls',
    'xlsx',
    'odt',
    'pdf',
    'png',
    'jpg',
    'jpeg',
    'ppt',
    'pptx',
    'pps',
  ];

  const handleRegister = () => {
    if (image !== null) {
      const extension = image.name.split('.').pop();

      if (extensionsPermitted.includes(extension)) {
        if (discipline !== '' && description !== '') {
          let date = new Date();
          let day = date.getDate();
          let month = date.getMonth();
          let fullYear = date.getFullYear();
          let createdAt = `${day}-${month}-${fullYear}`;

          const storage = firebase.storage();

          setProgress(true);

          const uploadTask = storage.ref(`homework/${image.name}`).put(image);
          uploadTask.on(
            'state_changed',
            (snapshot) => {},
            (error) => {
              // Error function ...
              console.log(error);
            },
            () => {
              // complete function ...
              storage
                .ref('homework')
                .child(image.name)
                .getDownloadURL()
                .then((url) => {
                  const cloudFirestore = firebase.firestore();

                  cloudFirestore
                    .collection('homework')
                    .add({
                      idStudent: localStorage.getItem('user'),
                      grade: localStorage.getItem('grade'),
                      school: localStorage.getItem('school'),
                      period: localStorage.getItem('period'),
                      url,
                      nameStudent: userData.name,
                      createdAt: date,
                      date: createdAt,
                      discipline,
                      description,
                      id: '',
                    })
                    .then(function (doc) {
                      cloudFirestore.collection('homework').doc(doc.id).update({
                        id: doc.id,
                      });
                      setProgress(false);
                      handleClear();
                      notifySuccess('Atividade enviada');
                    })
                    .catch(function (error) {
                      console.error('Error adding domcument', error);
                    });
                });
            }
          );
        } else {
          notifyError('Preencha todos os campos');
        }
      } else {
        notifyError('Esse tipo de arquivo não é permitido!');
      }
    } else {
      notifyError('Selecione um arquivo para enviar!');
    }
  };

  const goToHome = () => {
    props.history.push('/dashboard');
  };

  return (
    <div className={classes.root}>
      <CssBaseline />

      <div>
        <div className={classes.appBarSpacer} />
        <MenuLeft props={props.history} />
      </div>

      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        {progressUserData ? (
          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              width: '100%',
              justifyContent: 'center',
              padding: 20,
              marginTop: 200,
            }}
          >
            <CircularProgress />
            <p style={{ margin: 10 }}>Aguarde...</p>
          </div>
        ) : (
          <Container maxWidth="lg" className={classes.container}>
            <Grid container spacing={3} style={{ width: '80%' }}>
              <form className={classes.form}>
                <h1 style={{ marginLeft: 10 }}>Envio de Atividades</h1>
                <Grid container spacing={2}>
                  <FormControl
                    variant="outlined"
                    fullWidth
                    className={classes.formControl}
                    style={{ margin: 10 }}
                  >
                    <Grid item xs={12}>
                      <InputLabel htmlFor="discipline">Disciplina*</InputLabel>
                      <Select
                        native
                        value={discipline}
                        onChange={handleChangeDiscipline}
                        fullWidth
                        required
                        label="Disciplina"
                        inputProps={{
                          name: 'disciplina',
                          id: 'disciplina',
                        }}
                      >
                        <option aria-label="None" value="" />
                        <option value={6}>Arte</option>
                        <option value={5}>Ciências</option>
                        <option value={7}>Educação Física</option>
                        <option value={4}>Geografia</option>
                        <option value={3}>História</option>
                        <option value={8}>Inglês</option>
                        <option value={1}>Lingua Portuguesa</option>
                        <option value={2}>Matemática</option>
                      </Select>
                    </Grid>
                  </FormControl>

                  <FormControl
                    variant="outlined"
                    fullWidth
                    className={classes.formControl}
                    style={{ margin: 10 }}
                  >
                    <Grid item xs={12}>
                      <TextareaAutosize
                        required
                        style={{ width: '100%' }}
                        value={description}
                        rowsMin={10}
                        onChange={handleChangeDescription}
                        placeholder=" Descrição"
                        id="outlined-required"
                        label="Descrição"
                        variant="outlined"
                      />
                    </Grid>
                  </FormControl>

                  <div style={{ margin: '10px 10px 20px 10px' }}>
                    <input type="file" onChange={handleChange} />
                  </div>
                </Grid>
                {progress ? (
                  <>
                    <CircularProgress />
                    <p style={{ margin: 10 }}>Enviando...</p>
                  </>
                ) : (
                  <div style={{ display: 'flex', width: '100%' }}>
                    <Button
                      fullWidth
                      variant="contained"
                      disabled={!!progress}
                      style={{
                        backgroundColor: '#318F6B',
                        color: '#fff',
                      }}
                      onClick={handleRegister}
                      className={classes.submitLeft}
                    >
                      ENVIAR
                    </Button>
                    <Button
                      fullWidth
                      variant="contained"
                      style={{
                        backgroundColor: 'rgba(126,64,144,1)',
                        color: '#fff',
                      }}
                      onClick={goToHome}
                      className={classes.submitRight}
                    >
                      Cancelar
                    </Button>
                  </div>
                )}
              </form>
            </Grid>
          </Container>
        )}

        <Box pt={4}>
          <Copyright />
        </Box>
      </main>
    </div>
  );
}
