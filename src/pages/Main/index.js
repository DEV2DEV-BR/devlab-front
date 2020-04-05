import React from "react";
import { Link } from "react-router-dom";
import Navbar from "../../components/Navbar";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import CssBaseline from "@material-ui/core/CssBaseline";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Copyright from "../../components/Copyright";
import Background from "../../assets/background.jpg";
import IMG1 from "../../assets/img1.jpg";
import IMG2 from "../../assets/img2.jpg";
import IMG3 from "../../assets/img3.jpg";

const useStyles = makeStyles((theme) => ({
  icon: {
    marginRight: theme.spacing(2),
  },
  heroContent: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(8, 0, 6),
  },
  heroButtons: {
    marginTop: theme.spacing(4),
  },
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
  card: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
  },
  cardMedia: {
    paddingTop: "56.25%", // 16:9
  },
  cardContent: {
    flexGrow: 1,
  },
  footer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(6),
  },
}));

export default function Album() {
  const classe = useStyles();

  return (
    <React.Fragment>
      <CssBaseline />
      <Navbar />

      <main>
        {/* Hero unit */}
        <div
          className={classe.heroContent}
          style={{
            backgroundImage: `url(
              ${Background}
            )`,
          }}
        >
          <Container maxWidth="sm">
            <Typography
              component="h1"
              variant="h2"
              align="center"
              color="textPrimary"
              gutterBottom
              style={{ color: "#fff", textShadow: "#000" }}
            >
              School Docs
            </Typography>
            <Typography
              variant="h5"
              align="center"
              color="textSecondary"
              paragraph
              style={{ color: "#fff", textShadow: "#000" }}
            >
              Bem vindo ao School Docs, após fazer o login você terá acesso a
              todos os materiais disponíveis para download.
            </Typography>
            <div className={classe.heroButtons}>
              <Grid container spacing={2} justify="center">
                <Grid item>
                  <Link to="/signIn" style={{ textDecoration: "none" }}>
                    <Button
                      size="large"
                      variant="contained"
                      style={{
                        backgroundColor: "rgba(126,64,144,1)",
                        color: "#fff",
                      }}
                    >
                      Fazer Login
                    </Button>
                  </Link>
                </Grid>
                <Grid item>
                  <Link to="/signUp" style={{ textDecoration: "none" }}>
                    <Button
                      size="large"
                      variant="contained"
                      style={{
                        backgroundColor: "#318F6B",
                        color: "#fff",
                      }}
                    >
                      Cadastre-se
                    </Button>
                  </Link>
                </Grid>
              </Grid>
            </div>
          </Container>
        </div>
        <Container className={classe.cardGrid} maxWidth="md">
          {/* End hero unit */}
          <Grid container spacing={4}>
            <Grid item key={1} xs={12} sm={6} md={4}>
              <Card className={classe.card}>
                <CardMedia
                  className={classe.cardMedia}
                  image={IMG1}
                  title="Image title"
                />
                <CardContent className={classe.cardContent}>
                  <Typography gutterBottom variant="h5" component="h2">
                    Arquivos
                  </Typography>
                  <Typography>Baixe os arquivos das aulas.</Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item key={2} xs={12} sm={6} md={4}>
              <Card className={classe.card}>
                <CardMedia
                  className={classe.cardMedia}
                  image={IMG3}
                  title="Image title"
                />
                <CardContent className={classe.cardContent}>
                  <Typography gutterBottom variant="h5" component="h2">
                    Vídeos
                  </Typography>
                  <Typography>
                    Confira os vídeos deixados para downloads.
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item key={3} xs={12} sm={6} md={4}>
              <Card className={classe.card}>
                <CardMedia
                  className={classe.cardMedia}
                  image={IMG2}
                  title="Image title"
                />
                <CardContent className={classe.cardContent}>
                  <Typography gutterBottom variant="h5" component="h2">
                    Praticidade
                  </Typography>
                  <Typography>
                    Você não precisa sair de casa para estudar.
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Container>
      </main>
      {/* Footer */}
      <footer className={classe.footer}>
        {/* <Typography variant="h6" align="center" gutterBottom>
          Footer
        </Typography>
        <Typography
          variant="subtitle1"
          align="center"
          color="textSecondary"
          component="p"
        >
          Something here to give the footer a purpose!
        </Typography> */}
        {/* <div>
          Ícones feitos por{" "}
          <a
            href="https://www.flaticon.com/br/autores/pixelmeetup"
            title="Pixelmeetup"
          >
            Pixelmeetup
          </a>{" "}
          from{" "}
          <a href="https://www.flaticon.com/br/" title="Flaticon">
            www.flaticon.com
          </a>
        </div> */}
        <Copyright />
      </footer>
      {/* End footer */}
    </React.Fragment>
  );
}
