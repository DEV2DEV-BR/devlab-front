import React, { useState } from 'react';
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
import firebase from "firebase";
import FileUploader from "react-firebase-file-uploader";




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

function createData(name, calories, fat, carbs, protein) {
    return { name, calories, fat, carbs, protein };
}


export default function UploadFiles(props) {
    const classes = useStyles();
    const [userName, setUsername] = useState('')
    const [avatar, setAvatar] = useState('')
    const [isUploading, setIsUploading] = useState(false)
    const [progress, setProgress] = useState(0)
    const [avatarURL, setAvatarURL] = useState('')


    const handleChangeUsername = event =>
        setUsername(event.target.value)

    const handleUploadStart = () => {
        setIsUploading(true)
        setProgress(0)
    }

    const handleProgress = progress => {
        setProgress(progress)
    };

    const handleUploadError = error => {
        setIsUploading(false);
        console.error(error);
    };

    const handleUploadSuccess = filename => {

        setAvatar(filename);
        setProgress(100);
        setIsUploading(false);

        firebase
            .storage()
            .ref("images")
            .child(filename)
            .getDownloadURL()
            .then(url => setAvatarURL(url));
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
                    <Grid container spacing={3}>
                        <div>
                            <form>
                                <label>Username:</label>
                                <input
                                    type="text"
                                    value={userName}
                                    name="username"
                                    onChange={handleChangeUsername}
                                />
                                <label>Avatar:</label>
                                {isUploading && <p>Progress: {progress}</p>}
                                {avatarURL && <img src={avatarURL} />}
                                <FileUploader
                                    accept="image/*"
                                    name="avatar"
                                    randomizeFilename
                                    storageRef={firebase.storage().ref("images")}
                                    onUploadStart={handleUploadStart}
                                    onUploadError={handleUploadError}
                                    onUploadSuccess={handleUploadSuccess}
                                    onProgress={handleProgress}
                                />
                            </form>
                        </div>
                    </Grid>
                    <Box pt={4}>
                        <Copyright />
                    </Box>
                </Container>
            </main>
        </div >

    );
}
