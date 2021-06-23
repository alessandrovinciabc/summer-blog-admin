import React from 'react';

import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';

function Header(props) {
  let { auth } = props;
  return (
    <Navbar className={props.className + ''} variant="light" expand="md">
      <Navbar.Brand href="#/home">
        <h1>☀⛱Admin</h1>
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="header-navbar" />
      <Navbar.Collapse id="header-navbar">
        <Nav className="ml-auto main-navigation">
          <Nav.Link className="px-3" href="#/home">
            Posts
          </Nav.Link>
          <Nav.Link className="px-3" href="#/create">
            Create new post
          </Nav.Link>
          {auth ? (
            <Nav.Link className="px-3 bg-danger rounded" href="#/logout">
              <span className="text-white">Logout</span>
            </Nav.Link>
          ) : (
            <Nav.Link className="px-3" href="#/login">
              Login
            </Nav.Link>
          )}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default Header;
