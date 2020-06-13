import { Button } from '@material-ui/core';
import Box from '@material-ui/core/Box';
import CircularProgress from '@material-ui/core/CircularProgress';
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import FormControl from '@material-ui/core/FormControl';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import TextField from '@material-ui/core/TextField';
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

  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
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
  const [inputTitleClasse, setInputTitleClasse] = useState('');

  const [description, setDescription] = useState('');
  const [progress, setProgress] = useState(false);
  const [progressLoadData, setProgressLoadData] = useState(false);

  const [classesData, setClassesData] = useState([]);
  const [courseData, setCourseData] = useState([]);

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

  const loadDataCourse = async () => {
    setProgressLoadData(true);

    const { id } = props.history.location.state;

    const db = firebase.firestore();

    const coursesRef = db.collection('courses').doc(id);

    await coursesRef
      .get()
      .then(function (doc) {
        if (doc.exists) {
          setCourseData(doc.data());
          setProgressLoadData(false);
        } else {
          // doc.data() will be undefined in this case
          console.log('No such document!');
        }
      })
      .catch(function (error) {
        console.log('Error getting documents: ', error);
      });

    const classesRef = db.collection(`courses/${id}/classes`).orderBy('id');

    await classesRef
      .get()
      .then((querySnapshot) => {
        const classes = [];
        querySnapshot.forEach((doc) => {
          classes.push(doc.data());
        });
        setClassesData(classes);
        setProgress(false);
      })
      .catch(function (error) {
        console.log('Error getting documents: ', error);
      });
  };

  useEffect(() => {
    loadDataCourse();
  }, []);

  useEffect(() => {
    return () => {
      setCourseData([]);
      setClassesData([]);
    };
  }, []);

  const extensionsPermitted = ['mp3', 'mp4', 'avi'];

  const handleRegister = (name) => {
    const { id } = props.history.location.state;

    if (image !== null) {
      const extension = image.name.split('.').pop();

      if (extensionsPermitted.includes(extension)) {
        if (inputTitleClasse !== '' && description !== '') {
          let date = new Date();
          let day = date.getDate();
          let month = date.getMonth();
          let fullYear = date.getFullYear();
          let createdAt = `${day}-${month}-${fullYear}`;

          const storage = firebase.storage();

          setProgress(true);

          console.log(
            `courses/${localStorage.getItem('@jacode-email')}/${name}/${
              image.name
            }`
          );

          const uploadClasse = storage
            .ref(
              `courses/${localStorage.getItem('@jacode-email')}/${name}/${
                image.name
              }`
            )
            .put(image);
          uploadClasse.on(
            'state_changed',
            (snapshot) => {},
            (error) => {
              // Error function ...
              console.log(error);
            },
            () => {
              // complete function ...
              storage
                .ref('courses')
                .child(localStorage.getItem('@jacode-email'))
                .child(name)
                .child(image.name)
                .getDownloadURL()
                .then((url) => {
                  const cloudFirestore = firebase
                    .firestore()
                    .collection('courses')
                    .doc(id);

                  cloudFirestore
                    .collection('classes')
                    .add({
                      title: inputTitleClasse,
                      position: classesData.length + 1,
                      url_video: url,
                      createdAt: date,
                      date: createdAt,
                      description,
                      id: '',
                    })
                    .then(function (doc) {
                      cloudFirestore.collection('classes').doc(doc.id).update({
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
    window.location.reload();
    setDescription('');
    setPosition('');
    setInputTitleClasse('');
  };

  return (
    <div className={classes.root}>
      <CssBaseline />

      <div>
        <div className={classes.appBarSpacer} />
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
                      src={courseData.image || LoadingImage}
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
                        {courseData.name}
                      </h2>
                      <p style={{ color: '#918787', margin: 0, padding: 0 }}>
                        Nº {classesData.length}
                      </p>
                    </div>
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
                  <Grid item xs={12}>
                    <TextField
                      autoComplete="fname"
                      name="fullName"
                      variant="outlined"
                      required
                      fullWidth
                      id="fullName"
                      value={inputTitleClasse}
                      onChange={(event) =>
                        setInputTitleClasse(event.target.value)
                      }
                      label="Título"
                      autoFocus
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

                <div style={{ margin: '10px 10px 20px 10px' }}>
                  <input type="file" onChange={handleChange} />
                </div>
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
                    onClick={() => handleRegister(courseData.name)}
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
