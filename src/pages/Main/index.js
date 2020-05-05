import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Background from '../../assets/background-default.jpg';
import Copyright from '../../components/Copyright';
import CoursesList from '../../components/CoursesList';
import Navbar from '../../components/Navbar';
import { istAuthenticated } from '../../services/auth';
import FacebookIcon from '@material-ui/icons/Facebook';
import InstagramIcon from '@material-ui/icons/Instagram';
import LinkedInIcon from '@material-ui/icons/LinkedIn';
import DiscordIcon from '../../assets/discord.png';
import BlogIcon from '../../assets/blog.png';

const useStyles = makeStyles((theme) => ({
  icon: {
    width: 50,
    height: 50,
    margin: 10,
    color: '#fff',
    '&:hover': {
      opacity: 0.5,
    },
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

export default function Main(props) {
  const classe = useStyles();
  const [history, setHistory] = useState(props.history);

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
              style={{ color: '#fff', textShadow: '2px 2px #000' }}
            >
              {/* <b>JACODE CURSOS</b> */}
            </Typography>
            <Typography
              variant="h5"
              align="center"
              color="textSecondary"
              paragraph
              style={{
                color: '#fff',
                textShadow: '2px 2px #000',
                boxShadow: '5px',
              }}
            >
              Bem vindo à JACODE CURSOS!
              <br />
              Aqui você embarca de um jeito e sai de outro!
            </Typography>
            <Typography
              variant="h5"
              align="center"
              color="textSecondary"
              paragraph
              style={{
                color: '#fff',
                textShadow: '2px 2px #000',
                boxShadow: '5px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <a href="https://www.facebook.com/danieljacode" target="_blank">
                <FacebookIcon className={classe.icon} />
              </a>
              <a
                href="https://www.instagram.com/danieldeandradelopes/"
                target="_blank"
              >
                <InstagramIcon className={classe.icon} />
              </a>
              <a
                href="https://www.linkedin.com/in/daniel-de-andrade-lopes-5242b4b1/"
                target="_blank"
              >
                <LinkedInIcon className={classe.icon} />
              </a>
              <a href="http://blog.jacode.com.br/" target="_blank">
                <img
                  src={BlogIcon}
                  alt="blog"
                  className={classe.icon}
                  style={{ width: 40, height: 40 }}
                />
              </a>
              <a href="https://discord.gg/3Wmcp86" target="_blank">
                <img
                  src={DiscordIcon}
                  alt="discord community"
                  className={classe.icon}
                />
              </a>
            </Typography>

            {!istAuthenticated() ? (
              <div className={classe.heroButtons}>
                <Grid container spacing={2} justify="center">
                  <Grid item>
                    <Link to="/sign-in" style={{ textDecoration: 'none' }}>
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
                    <Link to="/sign-up" style={{ textDecoration: 'none' }}>
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
        <Container className={classe.cardGrid} maxWidth="lg">
          {/* End hero unit */}
          <Grid
            container
            spacing={6}
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'center',
            }}
          >
            <CoursesList buy={true} history={history} />
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
