import React from 'react';
import { Button, Form, Nav, Navbar } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { istAuthenticated } from '../../services/auth';
import { Container, IconContainerButton } from './styles'
import Badge from '@material-ui/core/Badge';
import IconButton from '@material-ui/core/IconButton';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import StorefrontIcon from '@material-ui/icons/Storefront';
import { logout } from '../../services/auth';
import firebase from 'firebase';
import { notify } from '../../util/toast'


function ResponsiveNavbar(props) {

  const redirectToShop = () => {
    props.history.push('/');
  };

  const redirectToCart = () => {
    props.history.push('/cart');
  };

  const handleLogout = () => {
    logout();
    firebase.auth().signOut();
    localStorage.clear();
    notify('Até logo, já estamos com saudades!', 2000, "info");
    props.history.push('/');
  };
  return (
    <>
      <Navbar expand="lg" style={{ backgroundColor: 'rgba(126,64,144,0.9)' }}>
        <Navbar.Brand href="#home" style={{ color: '#fff' }}>
          <b>{`<JACODE/> XD`}</b>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto"></Nav>
          <IconContainerButton>
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
                    size="small"
                    style={{ backgroundColor: '#318F6B', color: '#fff' }}
                  >
                    Login
                  </Button>
                </Link>
              </>
            ) : (
                <Link
                  to="/dashboard"
                  style={{
                    marginLeft: 10,
                    marginRight: 10,
                    textDecoration: 'none',
                  }}
                >
                  <IconButton
                    color="inherit"
                    onClick={redirectToShop}
                    style={{ marginRight: 15, padding: 0 }}
                  >
                    <Badge color="secondary">
                      <StorefrontIcon />
                    </Badge>
                    <p style={{ fontSize: 12, margin: 2 }}>Loja</p>
                  </IconButton>
                </Link>

              )}

            <IconButton
              color="inherit"
              onClick={redirectToShop}
              style={{ marginRight: 15, padding: 0 }}
            >
              <Badge color="secondary">
                <StorefrontIcon />
              </Badge>
              <p style={{ fontSize: 12, margin: 2 }}>Loja</p>
            </IconButton>
            <IconButton
              color="inherit"
              onClick={redirectToCart}
              style={{ marginRight: 15, padding: 0 }}
            >
              <Badge color="secondary">
                <ShoppingCartIcon />
              </Badge>
              <p style={{ fontSize: 12, margin: 2 }}>Carrinho</p>
            </IconButton>
            <IconButton
              color="inherit"
              onClick={handleLogout}
              style={{ margin: 0, padding: 0 }}
            >
              <Badge color="secondary">
                <ExitToAppIcon />
              </Badge>
              <p style={{ fontSize: 12, margin: 2 }}>Sair</p>
            </IconButton>
          </IconContainerButton>
        </Navbar.Collapse>
      </Navbar>
    </>
  );
}

export default ResponsiveNavbar;
