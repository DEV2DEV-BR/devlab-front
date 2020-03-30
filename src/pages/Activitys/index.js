import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import CssBaseline from '@material-ui/core/CssBaseline';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Copyright from '../../components/Copyright'
import MenuLeft from '../../components/MenuLeft'
import { Button } from '@material-ui/core';
import firebase from 'firebase'

const useStyles = makeStyles(theme => ({
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

    const [suppliesDate, setSuppliesDate] = useState([])
    const [idSupplie, setIdSupplie] = useState(props.location.state.idSubject)

    const loadData = async () => {
        console.log(idSupplie)
        const db = firebase.firestore();

        db.collection("supplies").where("discipline", "==", "1")
            .get()
            .then(function (querySnapshot) {
                let supplies = [];
                querySnapshot.forEach((doc) => {
                    // console.log(doc.id, " => ", doc.data());
                    supplies.push(doc.data())
                });
                setSuppliesDate(...suppliesDate, supplies)
            })
            .catch(function (error) {
                console.log("Error getting documents: ", error);
            });

    }



    useEffect(() => {
        loadData()
    }, [])


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
                        <h1 style={{ marginLeft: 10 }}>{props.location.state.subjects}</h1>
                        <TableContainer component={Paper}>
                            <Table className={classes.table} aria-label="simple table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell><b>Ordem por Data</b></TableCell>
                                        <TableCell align="left"><b>Descrição</b></TableCell>
                                        <TableCell align="right"></TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {suppliesDate.map(supplie =>
                                        <TableRow key={supplie.id}>
                                            <TableCell component="th" scope="row">
                                                Data
                                        </TableCell>
                                            <TableCell align="left">{supplie.description}</TableCell>
                                            <TableCell align="right">
                                                <Button variant="contained" size="small" color="secondary">
                                                    Download
                                        </Button>
                                            </TableCell>
                                        </TableRow>
                                    )}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Grid>
                    <Box pt={4}>
                        <Copyright />
                    </Box>
                </Container>
            </main>
        </div >

    );
}
