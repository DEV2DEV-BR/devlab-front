import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextareaAutosize from "@material-ui/core/TextareaAutosize";
import Box from "@material-ui/core/Box";
import Container from "@material-ui/core/Container";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Grid from "@material-ui/core/Grid";
import Copyright from "../../components/Copyright";
import MenuLeft from "../../components/MenuLeft";
import { Button } from "@material-ui/core";
import firebase from "firebase";
import Select from "@material-ui/core/Select";
import CircularProgress from "@material-ui/core/CircularProgress";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: "100vh",
    overflow: "auto",
  },
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  form: {
    display: "flex",
    flexDirection: "column",
    width: "100%", // Fix IE 11 issue.
    alignItems: "center",
    marginTop: theme.spacing(3),
  },
  submitLeft: {
    margin: theme.spacing(3, 0, 2),
    marginRight: 10,
    width: "70%",
  },
  submitRight: {
    margin: theme.spacing(3, 0, 2),
    marginLeft: 10,
    width: "30%",
  },
}));

export default function UploadFiles(props) {
  const classes = useStyles();
  const [image, setImage] = useState(null);
  const [grade, setGrade] = useState("");
  const [discipline, setDiscipline] = useState("");
  const [description, setDescription] = useState("");
  const [progress, setProgress] = useState(false);

  const handleChangeDiscipline = (event) => {
    setDiscipline(event.target.value);
  };

  const handleChangeGrade = (event) => {
    setGrade(event.target.value);
  };

  const handleChangeDescription = (event) => {
    setDescription(event.target.value);
  };

  const handleChange = (e) => {
    if (e.target.files[0]) {
      const image = e.target.files[0];
      setImage(image);
    }
  };

  const handleRegister = () => {
    let date = new Date();
    let day = date.getDate();
    let month = date.getMonth();
    let fullYear = date.getFullYear();
    let createdAt = `${day}-${month}-${fullYear}`;

    const storage = firebase.storage();

    setProgress(true);

    const uploadTask = storage.ref(`images/${image.name}`).put(image);
    uploadTask.on(
      "state_changed",
      (snapshot) => {},
      (error) => {
        // Error function ...
        console.log(error);
      },
      () => {
        // complete function ...
        storage
          .ref("images")
          .child(image.name)
          .getDownloadURL()
          .then((url) => {
            const cloudFirestore = firebase.firestore();

            cloudFirestore
              .collection("supplies")
              .add({
                grade,
                url,
                createdAt: date,
                date: createdAt,
                discipline,
                description,
                id: "",
              })
              .then(function (doc) {
                cloudFirestore.collection("supplies").doc(doc.id).update({
                  id: doc.id,
                });
                setProgress(false);
                handleClear();
              })
              .catch(function (error) {
                console.error("Error adding domcument", error);
              });
          });
      }
    );
  };

  const handleClear = () => {
    setGrade("");
    setDiscipline("");
    setDescription("");
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
          <Grid container spacing={3} style={{ width: "80%" }}>
            <form className={classes.form} noValidate>
              <h1 style={{ marginLeft: 10 }}>Cadastro de Materiais</h1>
              <Grid container spacing={2}>
                <FormControl
                  variant="outlined"
                  fullWidth
                  className={classes.formControl}
                  style={{ margin: 10 }}
                >
                  <Grid item xs={12}>
                    <InputLabel htmlFor="serie">Série*</InputLabel>
                    <Select
                      native
                      value={grade}
                      onChange={handleChangeGrade}
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
                <FormControl
                  variant="outlined"
                  fullWidth
                  className={classes.formControl}
                  style={{ margin: 10 }}
                >
                  <Grid item xs={12}>
                    <InputLabel htmlFor="discipline">Disciplina*</InputLabel>
                    <Select
                      native
                      value={discipline}
                      onChange={handleChangeDiscipline}
                      fullWidth
                      required
                      label="Disciplina"
                      inputProps={{
                        name: "disciplina",
                        id: "disciplina",
                      }}
                    >
                      <option aria-label="None" value="" />
                      <option value={6}>Arte</option>
                      <option value={5}>Ciências</option>
                      <option value={7}>Educação Física</option>
                      <option value={4}>Geografia</option>
                      <option value={3}>História</option>
                      <option value={8}>Inglês</option>
                      <option value={1}>Lingua Portuguesa</option>
                      <option value={2}>Matemática</option>
                    </Select>
                  </Grid>
                </FormControl>

                <FormControl
                  variant="outlined"
                  fullWidth
                  className={classes.formControl}
                  style={{ margin: 10 }}
                >
                  <Grid item xs={12}>
                    <TextareaAutosize
                      required
                      style={{ width: "100%" }}
                      value={description}
                      rowsMin={10}
                      onChange={handleChangeDescription}
                      id="outlined-required"
                      label="Descrição"
                      variant="outlined"
                    />
                  </Grid>
                </FormControl>

                <div style={{ margin: "10px 10px 20px 10px" }}>
                  <input type="file" onChange={handleChange} />
                </div>
              </Grid>
              {progress ? <CircularProgress /> : ""}
              <div style={{ display: "flex", width: "100%" }}>
                <Button
                  fullWidth
                  variant="contained"
                  disabled={!!progress}
                  style={{
                    backgroundColor: "#318F6B",
                    color: "#fff",
                  }}
                  onClick={handleRegister}
                  className={classes.submitLeft}
                >
                  CADASTRAR
                </Button>
                <Button
                  fullWidth
                  variant="contained"
                  style={{
                    backgroundColor: "rgba(126,64,144,1)",
                    color: "#fff",
                  }}
                  onClick={handleClear}
                  className={classes.submitRight}
                >
                  LIMPAR
                </Button>
              </div>
            </form>
          </Grid>
          <Box pt={4}>
            <Copyright />
          </Box>
        </Container>
      </main>
    </div>
  );
}
