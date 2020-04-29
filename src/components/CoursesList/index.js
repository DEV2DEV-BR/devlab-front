import Avatar from '@material-ui/core/Avatar';
import Card from '@material-ui/core/Card';
import CircularProgress from '@material-ui/core/CircularProgress';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import { red } from '@material-ui/core/colors';
import IconButton from '@material-ui/core/IconButton';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import LaunchIcon from '@material-ui/icons/Launch';
import ShareIcon from '@material-ui/icons/Share';
import { MdAddShoppingCart } from 'react-icons/md'
import firebase from 'firebase';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { format } from '../../util/format';
import Button from '@material-ui/core/Button';
import Backdrop from '@material-ui/core/Backdrop';



const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 300,
    margin: 5,
    padding: 0
  },
  media: {
    height: 0,
    width: '100%',
    paddingTop: '46.25%', // 16:9
  },
  expand: {
    backgroundColor: '#45c',
    textAlign: "center",
    margin: '0px 0px 0px 15px',
    padding: '0px 0px 0px 15px'
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

    async function fetchData() {

      const db = firebase.firestore();

      const coursesRef = db.collection('courses');

      await coursesRef
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

    fetchData()
  };

  const handleRedirectAllClasses = (id) => {
    props.history.push('/classes-by-course', { id })
  }

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

    loadDataCourses()
  }, []);



  useEffect(() => {
    return () => {
      setUserData('');
    };
  }, []);

  return (
    <>

      {progress &&
        <Backdrop className={classes.backdrop} open={progress}>
          <CircularProgress color="inherit" />
          <p style={{ fontSize: 18, marginLeft: 10 }}>Carregando...</p>
        </Backdrop>
      }
      {
        coursesData.map(m =>
          <Card className={classes.root} key={m.id}>
            < CardHeader

              avatar={
                <Avatar aria-label="recipe" className={classes.avatar}>
                  JA
               </Avatar>
              }
              title={m.name}
            />
            <CardMedia
              className={classes.media}
              image={m.image}
              title={m.title}
            />
            <CardContent style={{ margin: 0 }}>
              <Typography variant="body2" color="textSecondary" component="p">
                <b>Descrição: </b>{m.shortDescription}
              </Typography>
              <Typography variant="body2" color="textSecondary" component="p">
                <b>Requisitos: </b>{m.requirements}
              </Typography>

              {!props.buy ?
                <>
                  <IconButton aria-label="watch now" onClick={() => handleRedirectAllClasses(m.id)}>
                    <LaunchIcon />
                  </IconButton>
                  <IconButton aria-label="share">
                    <ShareIcon />
                  </IconButton>
                </>

                :
                <CardActions disableSpacing>
                  {/* <!-- INICIO FORMULARIO BOTAO PAGSEGURO --> */}
                  {m.price > 0 ?
                    <form action="https://pagseguro.uol.com.br/checkout/v2/payment.html" method="post" onSubmit="PagSeguroLightbox(this); return false; " target="_blank" style={{ width: '100%' }}>
                      {/* <!-- NÃO EDITE OS COMANDOS DAS LINHAS ABAIXO --> */}
                      <input type="hidden" name="code" value="162B809E2424004DD4312FB71861400C" />
                      <input type="hidden" name="iot" value="button" />
                      <Button type="submit" fullWidth variant="contained" style={{ backgroundColor: '#318F6B' }}>

                        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center' }}>
                          <MdAddShoppingCart size={18} color="#fff" />
                          <p style={{ margin: '0px 0px 0px 10px', fontSize: 16, fontWeight: 'bold', color: '#fff' }}>{format(m.price)}</p>
                        </div>
                      </Button>
                    </form>


                    :

                    <Button fullWidth variant="contained" style={{ backgroundColor: '#318F6B' }}>
                      <p style={{ margin: '0px 0px 0px 10px', fontSize: 16, fontWeight: 'bold', color: '#fff' }}>CURSO GRÁTIS</p>
                    </Button>

                  }

                </CardActions>



              }

            </CardContent>

          </Card >
        )
      }
    </>
  );
};

CoursesList.propTypes = {
  className: PropTypes.string,
};

export default CoursesList;

