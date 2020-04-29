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
import FormControl from '@material-ui/core/FormControl';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import firebase from 'firebase';
import React, { useEffect, useState } from 'react';
import Copyright from '../../components/Copyright';
import MenuLeft from '../../components/MenuLeft';
import Backdrop from '@material-ui/core/Backdrop';


const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
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
        width: '80%',
        paddingTop: theme.spacing(4),
        paddingBottom: theme.spacing(4),
    },
    table: {
        minWidth: 650,
    },
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: '#fff',
    },
}));

export default function AllActivitysByTeacher(props) {
    const classes = useStyles();

    const [classesData, setClassesData] = useState([]);
    const [courseData, setCourseData] = useState([]);
    const [progress, setProgress] = useState(false);

    const loadData = async () => {
        const { id } = props.history.location.state;
        const db = firebase.firestore();
        const coursesRef = db
            .collection('courses').doc(id)

        await coursesRef
            .get()
            .then(function (doc) {
                if (doc.exists) {
                    setCourseData(doc.data())
                } else {
                    // doc.data() will be undefined in this case
                    console.log("No such document!");
                }
            }
            )
            .catch(function (error) {
                console.log('Error getting documents: ', error);
            });

        const classesRef = db
            .collection(`courses/${id}/classes`).orderBy('id')

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

    const updatePage = () => {
        setProgress(true);
        loadData();
    };

    useEffect(() => {
        setProgress(true);
        loadData();
    }, []);

    useEffect(() => {
        return () => {
            setClassesData([]);
        };
    }, []);

    return (
        <div style={{ display: 'flex', flexDirection: 'row' }}>
            <div>
                <div className={classes.appBarSpacer} />
                <MenuLeft props={props.history} />
            </div>

            <div className={classes.root}>
                <CssBaseline />



                <main className={classes.content}>
                    <div className={classes.appBarSpacer} />
                    <Container maxWidth="lg" className={classes.container}>
                        <Grid container spacing={3}>

                            <Backdrop className={classes.backdrop} open={progress}>
                                <CircularProgress color="inherit" />
                                <p style={{ fontSize: 18, marginLeft: 10 }}>Carregando...</p>
                            </Backdrop>

                            {!progress ? (
                                <>
                                    <FormControl
                                        variant="outlined"
                                        fullWidth
                                        className={classes.formControl}
                                        style={{ display: 'flex', borderWidth: '1px', borderColor: '#c6b3b3', borderStyle: 'solid', borderRadius: 4, margin: '0px 0px 10px 0px', padding: 10 }}
                                    >
                                        <Grid container spacing={2} >
                                            <Grid item xs={12} style={{ display: 'flex' }} >
                                                <img src={courseData.image} alt={courseData.name} style={{ width: '150px', borderRadius: 5 }} />
                                                <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: 10 }}>
                                                    <h2 style={{ color: '#7a7171', margin: 0, padding: 0 }}>{courseData.name}</h2>
                                                    <p style={{ color: '#918787', margin: 0, padding: 0 }}>Nº Aulas</p>
                                                </div>
                                            </Grid>
                                        </Grid>
                                    </FormControl>
                                    <TableContainer component={Paper}>

                                        <Table className={classes.table} aria-label="simple table">
                                            <TableHead>
                                                <TableRow>
                                                    <TableCell>
                                                        <b>Aula</b>
                                                    </TableCell>
                                                    <TableCell align="left">
                                                        <b>Descrição</b>
                                                    </TableCell>
                                                    <TableCell align="right"></TableCell>
                                                </TableRow>
                                            </TableHead>
                                            <TableBody>
                                                {classesData.map((classe) => (
                                                    <TableRow key={classe.id}>
                                                        <TableCell
                                                            component="th"
                                                            scope="row"
                                                            style={{ minWidth: 100 }}
                                                        >
                                                            {classe.order}
                                                        </TableCell>
                                                        <TableCell
                                                            align="left"
                                                            style={{ textAlign: 'justify' }}
                                                        >
                                                            {classe.description}
                                                        </TableCell>
                                                        <TableCell align="right">
                                                            <a
                                                                href={classe.url}
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
                                                                    Assistir
                                                        </Button>
                                                            </a>
                                                        </TableCell>
                                                    </TableRow>
                                                ))}
                                            </TableBody>
                                        </Table>
                                    </TableContainer>
                                </>
                            ) : (
                                    ''
                                )}
                        </Grid>
                    </Container>
                    {!progress &&
                        <Box pt={4}>
                            <Copyright />
                        </Box>
                    }

                </main>

            </div>

        </div>
    );
}
