import { Button } from '@material-ui/core';
import Box from '@material-ui/core/Box';
import CircularProgress from '@material-ui/core/CircularProgress';
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
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

export default function Activitys(props) {
  const classes = useStyles();

  const [suppliesDate, setSuppliesDate] = useState([]);
  const [progress, setProgress] = useState(false);

  const loadData = async () => {
    const db = firebase.firestore();
    const suppliesRef = db
      .collection('all_supplies')
      .orderBy('createdAt', 'desc');

    await suppliesRef
      .where('school', '==', `${localStorage.getItem('school')}`)
      .where('period', '==', `${localStorage.getItem('period')}`)
      .where('grade', '==', `${localStorage.getItem('grade')}`)
      .where('discipline', '==', `${props.location.state.idSubject}`)
      .get()
      .then((querySnapshot) => {
        const supplies = [];
        querySnapshot.forEach((doc) => {
          supplies.push(doc.data());
        });
        setSuppliesDate(supplies);
        setProgress(false);
      })
      .catch(function (error) {
        console.log('Error getting documents: ', error);
      });
  };

  const updatePage = () => {
    setProgress(true);
    loadData();
  };

  useEffect(() => {
    setProgress(true);
    loadData();
  }, [props.location.state.idSubject]);

  useEffect(() => {
    return () => {
      setSuppliesDate([]);
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
              <h1>{props.location.state.subjects}</h1>
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
                        <b>Data</b>
                      </TableCell>
                      <TableCell align="left">
                        <b>Descrição</b>
                      </TableCell>
                      <TableCell align="right"></TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {suppliesDate.map((supplie) => (
                      <TableRow key={supplie.id}>
                        <TableCell
                          component="th"
                          scope="row"
                          style={{ minWidth: 100 }}
                        >
                          {supplie.date}
                        </TableCell>
                        <TableCell
                          align="left"
                          style={{ textAlign: 'justify' }}
                        >
                          {supplie.description}
                        </TableCell>
                        <TableCell align="right">
                          <a
                            href={supplie.url}
                            style={{ textDecoration: 'none' }}
                            target="_blank"
                          >
                            <Button
                              variant="contained"
                              size="small"
                              style={{
                                backgroundColor: 'rgba(126,64,144,1)',
                                color: '#fff',
                              }}
                            >
                              Download
                            </Button>
                          </a>
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
    </div>
  );
}
