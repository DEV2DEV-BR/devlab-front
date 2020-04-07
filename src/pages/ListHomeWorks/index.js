import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import CssBaseline from "@material-ui/core/CssBaseline";
import Box from "@material-ui/core/Box";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Copyright from "../../components/Copyright";
import MenuLeft from "../../components/MenuLeft";
import { Button } from "@material-ui/core";
import firebase from "firebase";
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
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  table: {
    minWidth: 650,
  },
  formControl: {
    margin: theme.spacing(3),
  },
}));

export default function ListHomeWork(props) {
  const classes = useStyles();

  const [suppliesDate, setSuppliesDate] = useState([]);
  const [progress, setProgress] = useState(false);
  const [filterGrade, setFilterGrade] = useState();
  const [filterDiscipline, setFilterDiscipline] = useState();

  const handleChangeGrade = (event) => {
    setFilterGrade(event.target.value);
  };

  const handleChangeDiscipline = (event) => {
    setFilterDiscipline(event.target.value);
  };

  const loadData = async () => {
    setProgress(true);
    const db = firebase.firestore();
    const suppliesRef = db.collection("homework");

    await suppliesRef
      .where("discipline", "==", `${filterDiscipline}`)
      .where("grade", "==", `${filterGrade}`)
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
        console.log("Error getting documents: ", error);
      });
  };

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
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                width: "100%",
                margin: 10,
              }}
            >
              <h1>Atividades</h1>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <FormControl
                  component="fieldset"
                  style={{
                    borderWidth: "1px",
                    borderStyle: "solid",
                    borderColor: "#CDD2DD",
                    borderRadius: "4px",
                    margin: "10px 0px 10px 0px",
                  }}
                >
                  <FormLabel
                    component="legend"
                    style={{
                      textAlign: "center",
                    }}
                  >
                    Série
                  </FormLabel>
                  <RadioGroup
                    aria-label="grade"
                    name="grade1"
                    value={filterGrade}
                    onChange={handleChangeGrade}
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <div>
                      <FormControlLabel
                        value="1"
                        control={<Radio />}
                        label="1º Ano"
                      />
                      <FormControlLabel
                        value="2"
                        control={<Radio />}
                        label="2º Ano"
                      />
                      <FormControlLabel
                        value="3"
                        control={<Radio />}
                        label="3º Ano"
                      />
                      <FormControlLabel
                        value="4"
                        control={<Radio />}
                        label="4º Ano"
                      />
                      <FormControlLabel
                        value="5"
                        control={<Radio />}
                        label="5º Ano"
                      />
                    </div>
                    <div>
                      <FormControlLabel
                        value="6"
                        control={<Radio />}
                        label="6º Ano"
                      />
                      <FormControlLabel
                        value="7"
                        control={<Radio />}
                        label="7º Ano"
                      />
                      <FormControlLabel
                        value="8"
                        control={<Radio />}
                        label="8º Ano"
                      />
                      <FormControlLabel
                        value="9"
                        control={<Radio />}
                        label="9º Ano"
                      />
                    </div>
                  </RadioGroup>
                </FormControl>

                <FormControl
                  component="fieldset"
                  style={{
                    borderWidth: "1px",
                    borderStyle: "solid",
                    borderColor: "#CDD2DD",
                    borderRadius: "4px",
                    margin: "10px 0px 10px 0px",
                  }}
                >
                  <FormLabel
                    component="legend"
                    style={{
                      textAlign: "center",
                    }}
                  >
                    Disciplina
                  </FormLabel>
                  <RadioGroup
                    aria-label="gender"
                    name="gender1"
                    value={filterDiscipline}
                    onChange={handleChangeDiscipline}
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <div>
                      <FormControlLabel
                        value="6"
                        control={<Radio />}
                        label="Artes"
                      />
                      <FormControlLabel
                        value="5"
                        control={<Radio />}
                        label="Ciências"
                      />
                      <FormControlLabel
                        value="7"
                        control={<Radio />}
                        label="Educação Física"
                      />
                      <FormControlLabel
                        value="4"
                        control={<Radio />}
                        label="Geografia"
                      />
                    </div>
                    <div>
                      <FormControlLabel
                        value="3"
                        control={<Radio />}
                        label="História"
                      />
                      <FormControlLabel
                        value="8"
                        control={<Radio />}
                        label="Inglês"
                      />
                      <FormControlLabel
                        value="1"
                        control={<Radio />}
                        label="Língua Portuguesa"
                      />
                      <FormControlLabel
                        value="2"
                        control={<Radio />}
                        label="Matemática"
                      />
                    </div>
                  </RadioGroup>
                </FormControl>
              </div>
              <>
                <Button
                  variant="contained"
                  size="small"
                  color="default"
                  style={{ marginBottom: 20 }}
                  onClick={loadData}
                >
                  Consultar
                </Button>
              </>

              {progress ? <CircularProgress /> : ""}
            </div>
            {!progress ? (
              <TableContainer component={Paper} style={{ marginRight: 10 }}>
                <Table className={classes.table} aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell>
                        <b>Data</b>
                      </TableCell>
                      <TableCell align="left">
                        <b>Aluno</b>
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
                          style={{ textAlign: "justify" }}
                        >
                          {supplie.nameStudent}
                        </TableCell>
                        <TableCell
                          align="left"
                          style={{ textAlign: "justify" }}
                        >
                          {supplie.description}
                        </TableCell>
                        <TableCell align="right">
                          <a
                            href={supplie.url}
                            style={{ textDecoration: "none" }}
                            target="_blank"
                          >
                            <Button
                              variant="contained"
                              size="small"
                              style={{
                                backgroundColor: "rgba(126,64,144,1)",
                                color: "#fff",
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
              ""
            )}
          </Grid>
          <Box pt={4}>
            <Copyright />
          </Box>
        </Container>
      </main>
    </div>
  );
}
