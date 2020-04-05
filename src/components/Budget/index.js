import React from "react";
import { Link } from "react-router-dom";
import Button from "@material-ui/core/Button";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/styles";
import { Card, CardContent, Grid, Typography } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100%",
  },
  content: {
    alignItems: "center",
    display: "flex",
  },
  title: {
    fontWeight: 700,
  },
}));

const Budget = (props) => {
  //   const { className, ...rest } = props;

  const classes = useStyles();

  return (
    <>
      <Card style={{ margin: "30px 0px 0px 10px" }}>
        <CardContent>
          <Grid container>
            <Grid item>
              <Typography
                className={classes.title}
                color="textSecondary"
                gutterBottom
                variant="body2"
              >
                NOVOS MATERIAIS: 1
              </Typography>
            </Grid>
          </Grid>
          <Link to="/all-new-activitys" style={{ textDecoration: "none" }}>
            <Button
              variant="contained"
              size="small"
              style={{
                backgroundColor: "#318F6B",
                color: "#fff",
                width: "100%",
              }}
            >
              Ver Novos Materiais
            </Button>
          </Link>
        </CardContent>
      </Card>
      <Card style={{ margin: "30px 0px 0px 10px" }}>
        <CardContent>
          <Grid container>
            <Grid item>
              <Typography
                className={classes.title}
                color="textSecondary"
                gutterBottom
                variant="body2"
              >
                ENVIAR TAREFAS PRONTAS
              </Typography>
            </Grid>
          </Grid>
          <Link to="/send-school-work" style={{ textDecoration: "none" }}>
            <Button
              variant="contained"
              size="small"
              style={{
                backgroundColor: "#318F6B",
                color: "#fff",
                width: "100%",
              }}
            >
              Enviar tarefa
            </Button>
          </Link>
        </CardContent>
      </Card>
    </>
  );
};

Budget.propTypes = {
  className: PropTypes.string,
};

export default Budget;
