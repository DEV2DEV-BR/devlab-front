import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Copyright from '../../components/Copyright'
import NavBarDashBoard from '../../components/NavbarDashboard'
import MenuLeft from '../../components/MenuLeft'


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

}));

export default function Dashboard(props) {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <CssBaseline />
            <NavBarDashBoard props={props.history} />


            <div>
                <div className={classes.appBarSpacer} />
                <MenuLeft props={props.history} />
            </div>

            <main className={classes.content}>
                <div className={classes.appBarSpacer} />
                <Container maxWidth="lg" className={classes.container}>
                    <Grid container spacing={3}>

                    </Grid>
                    <Box pt={4}>
                        <Copyright />
                    </Box>
                </Container>
            </main>
        </div >
    );
}