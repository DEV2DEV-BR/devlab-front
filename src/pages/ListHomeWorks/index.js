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
}));

export default function ListHomeWork(props) {
  const classes = useStyles();

  const [suppliesDate, setSuppliesDate] = useState([]);
  const [progress, setProgress] = useState(false);
  const [valueGrade, setValueGrade] = React.useState();
  const [valueSupplie, setValueSupplie] = React.useState();

  const handleChangeSupplie = (event) => {
    setValueSupplie(event.target.value);
  };

  const handleChangeGrade = (event) => {
    setValueGrade(event.target.value);
  };

  const loadData = async () => {
    const db = firebase.firestore();
    const suppliesRef = db.collection("supplies").orderBy("createdAt", "desc");

    await suppliesRef
      .where("discipline", "==", `1`)
      .where("grade", "==", `1`)
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
              <h1>Lição de Casa</h1>

              <FormControl
                component="fieldset"
                style={{
                  border: 1,
                  borderStyle: "solid",
                  borderRadius: 4,
                  padding: 5,
                  marginBottom: 10,
                  borderColor: "#BBB5BC",
                }}
              >
                <FormLabel component="legend">Série</FormLabel>
                <RadioGroup
                  aria-label="grade"
                  name="grade"
                  value={valueGrade}
                  onChange={handleChangeGrade}
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    marginBottom: 10,
                  }}
                >
                  <FormControlLabel value="1" control={<Radio />} label="1º" />
                  <FormControlLabel value="2" control={<Radio />} label="2º" />
                  <FormControlLabel value="3" control={<Radio />} label="3º" />
                  <FormControlLabel value="4" control={<Radio />} label="4º" />
                  <FormControlLabel value="5" control={<Radio />} label="5º" />
                  <FormControlLabel value="6" control={<Radio />} label="6º" />
                  <FormControlLabel value="7" control={<Radio />} label="7º" />
                  <FormControlLabel value="8" control={<Radio />} label="8º" />
                  <FormControlLabel value="9" control={<Radio />} label="9º" />
                </RadioGroup>
              </FormControl>

              <FormControl
                component="fieldset"
                style={{
                  border: 1,
                  borderStyle: "solid",
                  borderRadius: 4,
                  borderColor: "#BBB5BC",
                  padding: 5,
                  marginBottom: 10,
                }}
              >
                <FormLabel component="legend">Disciplina</FormLabel>
                <RadioGroup
                  aria-label="supplie"
                  name="supplie"
                  value={valueSupplie}
                  onChange={handleChangeSupplie}
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    marginBottom: 10,
                  }}
                >
                  <FormControlLabel
                    value="6"
                    control={<Radio />}
                    label="Arte"
                  />
                  <FormControlLabel
                    value="5"
                    control={<Radio />}
                    label="Ciências"
                  />
                  <FormControlLabel
                    value="7"
                    control={<Radio />}
                    label="Educação Fís."
                  />
                  <FormControlLabel
                    value="4"
                    control={<Radio />}
                    label="Geografia"
                  />
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
                </RadioGroup>
              </FormControl>

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
                    Consultar
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
