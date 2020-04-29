import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import React from 'react';
import { Link } from 'react-router-dom';
import Background from '../../assets/background.jpg';
import Copyright from '../../components/Copyright';
import Navbar from '../../components/Navbar';
import CoursesList from '../../components/CoursesList'
import { istAuthenticated } from '../../services/auth';

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
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  cardMedia: {
    paddingTop: '56.25%', // 16:9
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
              style={{ color: '#fff', textShadow: '#000' }}
            >
              JACODE CURSOS
            </Typography>
            <Typography
              variant="h5"
              align="center"
              color="textSecondary"
              paragraph
              style={{ color: '#fff', textShadow: '#000' }}
            >
              <div><p>Bem vindo à JACODE CURSOS! </p></div>
              Após fazer o login, você terá acesso a todos os materiais
              disponíveis para download.
            </Typography>

            {!istAuthenticated() ? (
              <div className={classe.heroButtons}>
                <Grid container spacing={2} justify="center">
                  <Grid item>
                    <Link to="/signIn" style={{ textDecoration: 'none' }}>
                      <Button
                        size="large"
                        variant="contained"
                        style={{
                          backgroundColor: 'rgba(126,64,144,1)',
                          color: '#fff',
                        }}
                      >
                        Fazer Login
                      </Button>
                    </Link>
                  </Grid>
                  <Grid item>
                    <Link to="/signUp" style={{ textDecoration: 'none' }}>
                      <Button
                        size="large"
                        variant="contained"
                        style={{
                          backgroundColor: '#318F6B',
                          color: '#fff',
                        }}
                      >
                        Cadastre-se
                      </Button>
                    </Link>
                  </Grid>
                </Grid>
              </div>
            ) : (
                ''
              )}
          </Container>
        </div>
        {/* <h1 style={{ textAlign: "center", color: '#6d6d6d' }}>Nossos Cursos</h1> */}
        <Container className={classe.cardGrid} maxWidth="md">
          {/* End hero unit */}
          <Grid container spacing={4}>
            <CoursesList buy={true} />
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
