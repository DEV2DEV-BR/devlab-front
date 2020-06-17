import Avatar from '@material-ui/core/Avatar';
import Backdrop from '@material-ui/core/Backdrop';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CircularProgress from '@material-ui/core/CircularProgress';
import { red } from '@material-ui/core/colors';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import firebase from 'firebase';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { MdAddShoppingCart, MdMovie } from 'react-icons/md';
import { istAuthenticated } from '../../services/auth';
import { format } from '../../util/format';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    maxWidth: 300,
    margin: 5,
    padding: 0,
    boxShadow: '0px 0px 0px black, 0 0 10px #282a36, 0 0 1px #282a36 ;',
  },
  rootMyCourses: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    maxWidth: 250,
    margin: 5,
    padding: 0,
    boxShadow: '0px 0px 0px black, 0 0 10px #282a36, 0 0 1px #282a36 ;',
  },
  media: {
    height: 0,
    width: '100%',
    paddingTop: '46.25%', // 16:9
  },
  expand: {
    textAlign: 'center',
    margin: '0px 0px 0px 15px',
    padding: '0px 0px 0px 15px',
  },
  avatar: {
    backgroundColor: red[500],
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
}));

const CoursesList = (props) => {
  const classes = useStyles();
  const [userData, setUserData] = useState([]);
  const [coursesData, setCoursesData] = useState([]);
  const [progress, setProgress] = useState(false);

  const loadDataCourses = () => {
    setProgress(true);

    const myCourses = JSON.parse(localStorage.getItem('myCourses'));

    async function fetchData() {
      const db = firebase.firestore();

      const coursesRef = db.collection('courses').orderBy('price', 'desc');

      await coursesRef
        .get()
        .then((querySnapshot) => {
          const courses = [];
          querySnapshot.forEach((doc) => {
            if (!props.buy) {
              if (myCourses) {
                if (myCourses.includes(doc.data().id)) {
                  courses.push(doc.data());
                }
              }
            } else {
              if (doc.data().enable) {
                courses.push(doc.data());
              }
            }
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

  const handleBuyCourse = () => {
    'PagSeguroLightbox(this); return false;';
  };

  const handleStartFreeCourse = (idCourseFree) => {
    if (!istAuthenticated()) {
      props.history.push('/sign-in', { idCourseFree });
      return;
    }
    props.history.push('/register-course', { idCourseFree });
  };

  const handleBuyCourseDisconnected = (idCourseFree) => {
    props.history.push('/sign-in', { idCourseFree });
  };

  const handleRedirectAllClasses = (id) => {
    props.history.push('/classes-by-course', { id });
  };

  const handleOpenCourseDetail = (id) => {
    props.history.push('/course-details', { id });
  };

  useEffect(() => {
    setProgress(true);

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
              setProgress(false);
            });
          });
      }
    });

    loadDataCourses();
  }, []);

  useEffect(() => {
    return () => {
      setUserData('');
      setCoursesData('');
      setProgress('');
    };
  }, []);

  return (
    <>
      {progress && (
        <Backdrop className={classes.backdrop} open={progress}>
          <CircularProgress color="inherit" />
          <p style={{ fontSize: 18, marginLeft: 10 }}>Carregando...</p>
        </Backdrop>
      )}
      {coursesData.map((m) => (
        <Card
          className={props.buy ? classes.root : classes.rootMyCourses}
          key={m.id}
          style={{ cursor: 'pointer' }}
        >
          {props.buy ? (
            <CardMedia
              className={classes.media}
              image={m.image}
              title={m.title}
              style={{ cursor: 'pointer' }}
              onClick={() => handleOpenCourseDetail(m.id)}
            />
          ) : (
            <CardMedia
              className={classes.media}
              image={m.image}
              title={m.title}
              style={{ cursor: 'pointer' }}
              onClick={() => handleRedirectAllClasses(m.id)}
            />
          )}

          <CardHeader
            avatar={
              <Avatar aria-label="recipe" className={classes.avatar}></Avatar>
            }
            title={m.name}
          />

          <CardContent
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              margin: 0,
            }}
          >
            {/* <Typography variant="body2" color="textSecondary" component="p">
              <b>Requisitos: </b>
              {m.requirements}
            </Typography> */}

            {!props.buy ? (
              <div>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  onClick={() => handleRedirectAllClasses(m.id)}
                  style={{
                    backgroundColor: '#318F6B',
                  }}
                >
                  <div
                    style={{
                      display: 'flex',
                      flexDirection: 'row',
                      justifyContent: 'flex-end',
                      alignItems: 'center',
                    }}
                  >
                    <MdMovie size={18} color="#fff" />
                    <p
                      style={{
                        margin: '0px 0px 0px 10px',
                        fontSize: 16,
                        fontWeight: 'bold',
                        color: '#fff',
                      }}
                    >
                      Assistir
                    </p>
                  </div>
                </Button>
              </div>
            ) : (
              <>
                <Typography variant="body2" color="textSecondary" component="p">
                  <b>Descrição: </b>
                  {m.shortDescription}
                </Typography>
              </>
            )}
          </CardContent>
          {props.buy && (
            <CardActions disableSpacing>
              {/* <!-- INICIO FORMULARIO BOTAO PAGSEGURO --> */}
              {m.price > 0 ? (
                istAuthenticated() ? (
                  <form
                    action="https://pagseguro.uol.com.br/checkout/v2/payment.html"
                    method="post"
                    onSubmit={() => handleBuyCourse}
                    target="_blank"
                    style={{ width: '100%' }}
                  >
                    {/* <!-- NÃO EDITE OS COMANDOS DAS LINHAS ABAIXO --> */}
                    <input type="hidden" name="code" value={m.codePayment} />
                    <input type="hidden" name="iot" value="button" />
                    <Button
                      type="submit"
                      fullWidth
                      variant="contained"
                      style={{
                        backgroundColor: '#318F6B',
                      }}
                    >
                      <div
                        style={{
                          display: 'flex',
                          flexDirection: 'row',
                          justifyContent: 'flex-end',
                          alignItems: 'center',
                        }}
                      >
                        <MdAddShoppingCart size={18} color="#fff" />
                        <p
                          style={{
                            margin: '0px 0px 0px 10px',
                            fontSize: 16,
                            fontWeight: 'bold',
                            color: '#fff',
                          }}
                        >
                          {format(m.price)}
                        </p>
                      </div>
                    </Button>
                  </form>
                ) : (
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    onClick={() => handleBuyCourseDisconnected(m.id)}
                    style={{
                      backgroundColor: '#318F6B',
                    }}
                  >
                    <div
                      style={{
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'flex-end',
                        alignItems: 'center',
                      }}
                    >
                      <MdAddShoppingCart size={18} color="#fff" />
                      <p
                        style={{
                          margin: '0px 0px 0px 10px',
                          fontSize: 16,
                          fontWeight: 'bold',
                          color: '#fff',
                        }}
                      >
                        {format(m.price)}
                      </p>
                    </div>
                  </Button>
                )
              ) : (
                <Button
                  fullWidth
                  variant="contained"
                  onClick={() => handleStartFreeCourse(m.id)}
                  style={{ backgroundColor: '#318F6B' }}
                >
                  <p
                    style={{
                      margin: '0px 0px 0px 10px',
                      fontSize: 16,
                      fontWeight: 'bold',
                      color: '#fff',
                    }}
                  >
                    CURSO GRÁTIS
                  </p>
                </Button>
              )}
            </CardActions>
          )}
        </Card>
      ))}
    </>
  );
};

CoursesList.propTypes = {
  className: PropTypes.string,
};

export default CoursesList;
