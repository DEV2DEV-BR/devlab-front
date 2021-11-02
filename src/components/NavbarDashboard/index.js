import Badge from '@material-ui/core/Badge';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import firebase from 'firebase';
import React, { useEffect, useState } from 'react';
import { Nav, Navbar } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Menu from '../../components/Menu';
import { customizations } from '../../configs/customizations';
import { logout } from '../../services/auth';
import { notify } from '../../util/toast';
import {
  Container,
  IconContainerButton,
  Name, StyledForm, StyledIconButton
} from './styles';

export default function NavBarDashboard(props) {
  const [userData, setuserData] = useState([]);

  useEffect(() => {
    const db = firebase.firestore();

    const usersRef = db.collection('users');

    firebase.auth().onAuthStateChanged(function (user) {
      if (user) {
        usersRef
          .where('uid', '==', user.uid)
          .get()
          .then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
              setuserData(doc.data());
            });
          });
      }
    });
  }, []);

  useEffect(() => {
    return () => {
      setuserData(false);
    };
  }, []);

  const handleLogout = () => {
    logout();
    firebase.auth().signOut();
    localStorage.clear();
    notify('Até logo, já estamos com saudades!', 2000, 'info');
    props.history.push('/');
  };

  return (
    <Navbar
      expand="lg"
      style={{ backgroundColor: `${customizations?.secondaryColor}` }}
    >
      <Menu history={props.history} />
      <Link to="/dashboard">
        <Navbar.Brand style={{ color: '#fff' }}>
          <b>{`<JACODE/> XD`}</b>
        </Navbar.Brand>
      </Link>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto"></Nav>
        <StyledForm inline>
          <Container>
            <Name>
              <b>Bem vindo:</b> {userData.name}
            </Name>
            <IconContainerButton>
              <StyledIconButton color="inherit" onClick={handleLogout}>
                <Badge color="secondary">
                  <ExitToAppIcon />
                </Badge>
                <p style={{ fontSize: 12, margin: 2 }}>Sair</p>
              </StyledIconButton>
            </IconContainerButton>
          </Container>
        </StyledForm>
      </Navbar.Collapse>
    </Navbar>
  );
}
