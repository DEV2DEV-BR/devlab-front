import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import React, { useState, useEffect } from 'react';
import CoursesList from '../../components/CoursesList';
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
}));

export default function RegisterCourse(props) {
  const classes = useStyles();

  const [history, setHistory] = useState(props.history);

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
          <Grid container spacing={3}>
            {props.history.location.state.idCourseFree}
          </Grid>
        </Container>
        <Box pt={4}>
          <Copyright />
        </Box>
      </main>
    </div>
  );
}
