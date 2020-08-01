import {
  Backdrop,
  Badge,
  Box,
  CircularProgress,
  CssBaseline,
  FormControl,
  Grid,
  IconButton,
  Tooltip,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import DeleteIcon from '@material-ui/icons/Delete';
import LoyaltyIcon from '@material-ui/icons/Loyalty';
import firebase from 'firebase';
import React, { useEffect, useState } from 'react';
import LoadingImage from '../../assets/loading.gif';
import Copyright from '../../components/Copyright';
import ResponsiveNavbar from '../../components/ResponsiveNavbar';
import { format } from '../../util/format';
import {
  StyledContainer,
  Main,
  InternalContainer,
  StyledGrid,
  StyledFormControl,
} from './styles';

const useStyles = makeStyles((theme) => ({
  appBarSpacer: theme.mixins.toolbar,
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
}));

export default function Cart(props) {
  const classes = useStyles();

  const [progress, setProgress] = useState(false);
  const [coursesData, setCoursesData] = useState([]);

  useEffect(() => {
    async function loadDataCourses() {
      setProgress(true);
      const db = firebase.firestore();

      const coursesRef = db.collection('courses');

      await coursesRef
        .where('author', '==', localStorage.getItem('user'))
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

    loadDataCourses();

    return () => {
      setCoursesData('');
    };
  }, []);

  return (
    <StyledContainer>
      {progress && (
        <Backdrop className={classes.backdrop} open={progress}>
          <CircularProgress color="inherit" />
          <p style={{ fontSize: 18, marginLeft: 10 }}>Carregando...</p>
        </Backdrop>
      )}

      <CssBaseline />

      <Main>
        <ResponsiveNavbar history={props?.history} />
        <div className={classes.appBarSpacer} />
        {coursesData.length === 0 && (
          <InternalContainer maxWidth="lg">
            <StyledGrid container spacing={3}>
              <FormControl variant="outlined" fullWidth>
                <Grid
                  container
                  spacing={2}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    height: '100px',
                    justifyContent: 'center',
                    backgroundColor: '#c8a2d3',
                    borderRadius: 4,
                  }}
                >
                  <p style={{ fontSize: 14 }}>Seu carrinho ainda está vazio.</p>
                </Grid>
              </FormControl>
            </StyledGrid>
          </InternalContainer>
        )}
        {coursesData.map((course) => (
          <InternalContainer maxWidth="lg" key={course.id}>
            <StyledGrid container spacing={3}>
              <StyledFormControl variant="outlined" fullWidth>
                <Grid container spacing={2}>
                  <StyledGrid
                    item
                    xs={12}
                    style={{ justifyContent: 'space-between' }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                      <img
                        src={course.image || LoadingImage}
                        alt="course"
                        style={{
                          width: '100px',
                          height: '60px',
                          borderRadius: 5,
                        }}
                      />
                      <div
                        style={{
                          display: 'flex',
                          flexDirection: 'column',
                          justifyContent: 'center',
                          marginLeft: 12,
                        }}
                      >
                        <p
                          style={{
                            color: '#7a7171',
                            margin: 0,
                            padding: 0,
                            fontSize: 17,
                          }}
                        >
                          {course.name}
                        </p>
                        <p style={{ color: '#918787', margin: 0, padding: 0 }}>
                          {course.duration} Horas
                        </p>
                      </div>
                    </div>
                    <div
                      style={{
                        display: 'flex',
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      <Tooltip title="Retirar do carrinho" placement="bottom">
                        <IconButton aria-label="delete" onClick={() => {}}>
                          <DeleteIcon />
                        </IconButton>
                      </Tooltip>

                      <Badge
                        style={{
                          alignItems: 'center',
                          fontSize: 18,
                          color: '#ec5252',
                          fontWeight: 'bold',
                        }}
                      >
                        {format(course.price)}
                        <LoyaltyIcon style={{ marginTop: 10 }} />
                      </Badge>
                    </div>
                  </StyledGrid>
                </Grid>
              </StyledFormControl>
            </StyledGrid>
          </InternalContainer>
        ))}
        <Box pt={4}>
          <Copyright />
        </Box>
      </Main>
    </StyledContainer>
  );
}
