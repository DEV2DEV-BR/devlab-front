import React from 'react';
import { Button, Form, Nav, Navbar } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { istAuthenticated } from '../../services/auth';

function ResponsiveNavbar() {
  return (
    <>
      <Navbar expand="lg" style={{ backgroundColor: 'rgba(126,64,144,0.9)' }}>
        <Navbar.Brand href="#home" style={{ color: '#fff' }}>
          <b>{`<JACODE/> XD`}</b>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto"></Nav>
          <Form inline>
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
          </Form>
        </Navbar.Collapse>
      </Navbar>
    </>
  );
}

export default ResponsiveNavbar;
