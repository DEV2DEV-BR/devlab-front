import React from 'react';
import Copyright from '../Copyright';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  container: {
    height: '150px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    marginTop: '150px',
    bottom: -10,
    right: 0,
    left: 0,
    backgroundColor: '#ceccce',
    opacity: '0.9',
  },
  top: {
    display: 'flex',
    width: '100%',
    padding: '0px 50px 0px 50px',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  contact: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
}));

function Footer() {
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <div className={classes.top}>
        <div>
          <b>{`<JACODE/> XD`}</b>
        </div>
        <div>
          <Copyright />
        </div>
        <div className={classes.contact}>
          <h3 style={{ margin: 0 }}>CONTATO</h3>
          <p style={{ margin: 0 }}>Email: danieldeandradelopes@gmail.com</p>
        </div>
      </div>
    </div>
  );
}

export default Footer;
