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
import React, { useState } from 'react';
import { toast } from 'react-toastify';
import Copyright from '../../components/Copyright';
import MenuLeft from '../../components/MenuLeft';
import TextField from '@material-ui/core/TextField';

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

export default function UploadFiles(props) {
  const classes = useStyles();
  const [image, setImage] = useState(null);

  const [position, setPosition] = useState('');
  const [inputName, setInputName] = useState('');
  const [inputDuration, setInputDuration] = useState('');
  const [inputPrice, setInputPrice] = useState('');
  const [inputUrlPayment, setInputUrlPayment] = useState('');
  const [inputShortDescription, setInputShortDescription] = useState('');

  const [description, setDescription] = useState('');
  const [requirements, setRequirements] = useState('');

  const [progress, setProgress] = useState(false);
  const [progressLoadData, setProgressLoadData] = useState(false);

  const handleChangeRequirements = (event) => {
    setRequirements(event.target.value);
  };

  const handleChangeDescription = (event) => {
    setDescription(event.target.value);
  };

  const handleChangeposition = (event) => {
    setPosition(event.target.value);
  };

  const handleChange = (e) => {
    if (e.target.files[0]) {
      const image = e.target.files[0];
      setImage(image);
    }
  };

  // const loadTeacher = async () => {
  //   setProgressLoadData(true);
  //   const db = firebase.firestore();

  //   const usersRef = db.collection('users');

  //   await usersRef
  //     .where('userType', '==', 'teacher')
  //     .where('id', '==', localStorage.getItem('user'))
  //     .get()
  //     .then((querySnapshot) => {
  //       const users = [];
  //       querySnapshot.forEach((doc) => {
  //         users.push(doc.data());
  //         setDisciplinesTeacher(
  //           ...disciplinesTeacher,
  //           doc.data().teacherDisciplines
  //         );
  //         setSchoolsTeacher(...schoolsTeacher, doc.data().teacherSchools);
  //         setPeriodsTeacher(...periodsTeacher, doc.data().teacherPeriods);
  //         setGradesTeacher(...gradesTeacher, doc.data().teacherGrades);
  //         setClassTeacher(...myClass, doc.data().teacherClass);
  //       });
  //       setTeachers(users);
  //       setProgressLoadData(false);
  //     })
  //     .catch(function (error) {
  //       console.log('Error getting documents: ', error);
  //     });
  // };

  // useEffect(() => {
  //   loadTeacher();
  // }, []);

  const extensionsPermitted = ['mp4', 'avi'];

  const handleRegister = () => {
    if (image !== null) {
      const extension = image.name.split('.').pop();

      if (extensionsPermitted.includes(extension)) {
        if (position !== '' && description !== '') {
          let date = new Date();
          let day = date.getDate();
          let month = date.getMonth();
          let fullYear = date.getFullYear();
          let createdAt = `${day}-${month}-${fullYear}`;

          const storage = firebase.storage();

          setProgress(true);

          const uploadTask = storage
            .ref(`all_supplies/${image.name}`)
            .put(image);
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
                .ref('all_supplies')
                .child(image.name)
                .getDownloadURL()
                .then((url) => {
                  const cloudFirestore = firebase.firestore();

                  cloudFirestore
                    .collection('all_supplies')
                    .add({
                      position,
                      url,
                      createdAt: date,
                      date: createdAt,
                      description,
                      id: '',
                    })
                    .then(function (doc) {
                      cloudFirestore
                        .collection('all_supplies')
                        .doc(doc.id)
                        .update({
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

  const handleClear = () => {
    setDescription('');
    setPosition('');
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
        <Container maxWidth="lg" className={classes.container}>
          <Grid container spacing={3} style={{ width: '70%' }}>
            <form className={classes.form}>
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
                  padding: 10,
                }}
              >
                <Grid container spacing={2}>
                  <Grid item xs={12} style={{ display: 'flex' }}>
                    <img
                      src="https://cdn.pixabay.com/photo/2015/01/20/13/13/ipad-605439_960_720.jpg"
                      alt="course"
                      style={{ width: '150px', borderRadius: 5 }}
                    />
                    <div
                      style={{
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        padding: 10,
                      }}
                    >
                      <h2 style={{ color: '#7a7171', margin: 0, padding: 0 }}>
                        Nome do Curso
                      </h2>
                      <p style={{ color: '#918787', margin: 0, padding: 0 }}>
                        Nº Aulas
                      </p>
                    </div>
                  </Grid>
                </Grid>
              </FormControl>

              <FormControl
                variant="outlined"
                fullWidth
                className={classes.formControl}
                style={{ margin: 10 }}
              >
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <TextField
                      autoComplete="fname"
                      name="fullName"
                      variant="outlined"
                      required
                      fullWidth
                      id="fullName"
                      value={inputName}
                      onChange={(event) => setInputName(event.target.value)}
                      label="Nome do Curso"
                      autoFocus
                    />
                  </Grid>
                </Grid>
              </FormControl>
              <FormControl
                variant="outlined"
                fullWidth
                className={classes.formControl}
                style={{ margin: 10 }}
              >
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <TextField
                      autoComplete="fduration"
                      name="duration"
                      variant="outlined"
                      required
                      fullWidth
                      id="duration"
                      type="number"
                      value={inputDuration}
                      onChange={(event) => setInputDuration(event.target.value)}
                      label="Duração em horas"
                      autoFocus
                    />
                  </Grid>
                </Grid>
              </FormControl>

              <FormControl
                variant="outlined"
                fullWidth
                className={classes.formControl}
                style={{ margin: 10 }}
              >
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <TextField
                      autoComplete="fprice"
                      name="price"
                      variant="outlined"
                      required
                      fullWidth
                      id="price"
                      value={inputDuration}
                      onChange={(event) => setInputPrice(event.target.value)}
                      label="Preço"
                      autoFocus
                    />
                  </Grid>
                </Grid>
              </FormControl>

              <FormControl
                variant="outlined"
                fullWidth
                className={classes.formControl}
                style={{ margin: 10 }}
              >
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <TextField
                      autoComplete="furlPayment"
                      name="urlPayment"
                      variant="outlined"
                      required
                      fullWidth
                      id="urlPayment"
                      value={inputUrlPayment}
                      onChange={(event) =>
                        setInputUrlPayment(event.target.value)
                      }
                      label="Url de pagamento"
                      autoFocus
                    />
                  </Grid>
                </Grid>
              </FormControl>

              <Grid container spacing={2}>
                <FormControl
                  variant="outlined"
                  fullWidth
                  className={classes.formControl}
                  style={{ margin: 10 }}
                >
                  <Grid container spacing={2}>
                    <Grid item xs={12}>
                      <TextField
                        autoComplete="fshortDescription"
                        name="shortDescription"
                        variant="outlined"
                        required
                        fullWidth
                        id="shortDescription"
                        value={inputShortDescription}
                        onChange={(event) =>
                          setInputShortDescription(event.target.value)
                        }
                        label="Descrição Curta"
                        autoFocus
                      />
                    </Grid>
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
                      id="outlined-required"
                      label="Descrição"
                      placeholder="Descrição"
                      variant="outlined"
                    />
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
                      value={requirements}
                      rowsMin={10}
                      onChange={handleChangeRequirements}
                      id="outlined-required"
                      label="Requisitos"
                      placeholder="Requisitos"
                      variant="outlined"
                    />
                  </Grid>
                </FormControl>

                <Grid container spacing={2}>
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
                      margin: 15,
                      padding: 5,
                    }}
                  >
                    <Grid item xs={12}>
                      <p style={{ marginLeft: 10 }}>Imagem de Fundo</p>
                      <div style={{ margin: '10px 10px 20px 10px' }}>
                        <input type="file" onChange={handleChange} />
                      </div>
                    </Grid>
                  </FormControl>
                </Grid>
                <Grid container spacing={2}>
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
                      margin: 15,
                      padding: 5,
                    }}
                  >
                    <Grid item xs={12}>
                      <p style={{ marginLeft: 10 }}>Imagem do Curso</p>
                      <div style={{ margin: '10px 10px 20px 10px' }}>
                        <input type="file" onChange={handleChange} />
                      </div>
                    </Grid>
                  </FormControl>
                </Grid>
              </Grid>

              {progress ? (
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    width: '100%',
                    justifyContent: 'center',
                    padding: 20,
                  }}
                >
                  <CircularProgress />
                  <p style={{ margin: 10 }}>Enviando...</p>
                </div>
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
                    CADASTRAR
                  </Button>
                  <Button
                    fullWidth
                    variant="contained"
                    style={{
                      backgroundColor: 'rgba(126,64,144,1)',
                      color: '#fff',
                    }}
                    onClick={handleClear}
                    className={classes.submitRight}
                  >
                    LIMPAR
                  </Button>
                </div>
              )}
            </form>
          </Grid>
        </Container>
        <Box pt={4}>
          <Copyright />
        </Box>
      </main>
    </div>
  );
}
