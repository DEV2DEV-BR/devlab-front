import React, { useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import { Link } from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import firebase from "firebase";
import { toast } from "react-toastify";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import Copyright from "../../components/Copyright";

const useStyles = makeStyles((theme) => ({
  button: {
    display: "block",
    marginTop: theme.spacing(2),
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function SignUp(props) {
  const classes = useStyles();
  const [grade, setGrade] = React.useState("");
  const [inputName, setInputName] = useState("");
  const [inputEmail, setInputEmail] = useState("");
  const [inputPassword, setInputPassword] = useState("");
  const [inputConfirmPassword, setInputConfirmPassword] = useState("");

  const handleChange = (event) => {
    setGrade(event.target.value);
  };

  const notifySuccess = (message) => {
    toast.success(message, {
      position: "top-right",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });
  };

  const notifyError = (message) => {
    toast.error(message, {
      position: "top-right",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });
  };

  const handleRegister = async (event) => {
    event.preventDefault();

    const name = inputName;

    if (inputPassword === inputConfirmPassword) {
      await firebase
        .auth()
        .createUserWithEmailAndPassword(inputEmail, inputPassword)
        .then(function (success) {
          const cloudFirestore = firebase.firestore();

          cloudFirestore
            .collection("users")
            .add({
              name,
              grade,
              email: success.user.email,
              uid: success.user.uid,
              userType: "student",
              id: "",
            })
            .then(function (doc) {
              cloudFirestore.collection("users").doc(doc.id).update({
                id: doc.id,
              });
            })
            .catch(function (error) {
              console.error("Error adding domcument", error);
            });
        })
        .catch(function (error) {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.log(errorCode, errorMessage);
        });

      notifySuccess("Congratulations!");
      props.history.push("/signIn");
    } else {
      notifyError("Password does not match!");
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Cadastre-se
        </Typography>
        <form className={classes.form} noValidate onSubmit={handleRegister}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                autoComplete="fname"
                name="fullName"
                variant="outlined"
                required
                fullWidth
                id="fullName"
                value={inputName}
                onChange={(event) => setInputName(event.target.value)}
                label="Nome Completo"
                autoFocus
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                value={inputEmail}
                onChange={(event) => setInputEmail(event.target.value)}
                label="E-mail"
                name="email"
                autoComplete="email"
              />
            </Grid>

            <FormControl
              variant="outlined"
              fullWidth
              className={classes.formControl}
            >
              <Grid item xs={12}>
                <InputLabel htmlFor="serie">Série*</InputLabel>
                <Select
                  native
                  value={grade}
                  onChange={handleChange}
                  fullWidth
                  required
                  label="Série"
                  inputProps={{
                    name: "serie",
                    id: "serie",
                  }}
                >
                  <option aria-label="None" value="" />
                  <option value={1}>1º Ano</option>
                  <option value={2}>2º Ano</option>
                  <option value={3}>3º Ano</option>
                  <option value={4}>4º Ano</option>
                  <option value={5}>5º Ano</option>
                  <option value={6}>6º Ano</option>
                  <option value={7}>7º Ano</option>
                  <option value={8}>8º Ano</option>
                  <option value={9}>9º Ano</option>
                </Select>
              </Grid>
            </FormControl>

            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Senha"
                value={inputPassword}
                onChange={(event) => setInputPassword(event.target.value)}
                type="password"
                id="password"
                autoComplete="current-password"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="confirm-password"
                label="Confirmação de senha"
                type="password"
                value={inputConfirmPassword}
                onChange={(event) =>
                  setInputConfirmPassword(event.target.value)
                }
                id="confirm-password"
                autoComplete="current-password"
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            style={{ backgroundColor: "rgba(126,64,144,1)", color: "#fff" }}
            className={classes.submit}
          >
            Cadastrar
          </Button>
          <Grid container justify="flex-end">
            <Grid item xs>
              <Link to="/">Voltar para o início</Link>
            </Grid>
            <Grid item>
              <Link to="/signIn">Já tenha cadastro? Faça o login!</Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={5} style={{ marginBottom: 20 }}>
        <Copyright />
      </Box>
    </Container>
  );
}
