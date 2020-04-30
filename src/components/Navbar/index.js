import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import React from 'react';
import { Link } from 'react-router-dom';
import Logo from '../../assets/logo.png';
import { istAuthenticated } from '../../services/auth';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },

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
  const classes = useStyles();

  return (
    <AppBar position="static" style={{ backgroundColor: 'rgba(126,64,144,1)' }}>
      <Toolbar>
        <Typography
          component="h1"
          variant="h6"
          color="inherit"
          noWrap
          className={classes.title}
        >
          <Link style={{ textDecoration: 'none', color: '#fff' }} to="/">
            <Typography variant="h6" color="inherit" noWrap>
              {/* <img
                src={Logo}
                style={{ maxHeight: 90, padding: 0, margin: 0, width: 60 }}
                alt="Logo"
              /> */}
              <b>{`<JACODE/> XD`}</b>
            </Typography>
          </Link>
        </Typography>

        {!istAuthenticated() ? (
          <>
            <Link
              to="/sign-in"
              style={{
                marginLeft: 10,
                marginRight: 10,
                textDecoration: 'none',
              }}
            >
              <Button
                variant="contained"
                style={{ backgroundColor: '#318F6B', color: '#fff' }}
              >
                Login
              </Button>
            </Link>
          </>
        ) : (
          <div>
            <Link
              to="/dashboard"
              style={{
                marginLeft: 10,
                marginRight: 10,
                textDecoration: 'none',
              }}
            >
              <Button
                variant="contained"
                size="small"
                style={{ backgroundColor: '#318F6B', color: '#fff' }}
              >
                Voltar para dashboard
              </Button>
            </Link>
          </div>
        )}
      </Toolbar>
    </AppBar>
  );
}
