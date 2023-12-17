// Header.js
import React, { useCallback, useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import { AuthContext } from "../hooks/AuthContext";

const Header = () => {
  const { token, onChangeAuthStatus } = useContext(AuthContext);

  const onLogout = useCallback(() => {
    token && onChangeAuthStatus({ token: "", user: {} });
  }, [token, onChangeAuthStatus]);

  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Navbar.Brand className="ps-4" as={Link} to="/">
        Travel Platform
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="ml-auto">
          <Nav.Link as={Link} to="/">
            Home
          </Nav.Link>
          <Nav.Link as={Link} to={token ? "/mis-posts" : "/login"}>
            Posts
          </Nav.Link>
        </Nav>
      </Navbar.Collapse>
      <Nav className="justify-content-end" activeKey="/home">
        <Nav.Link as={NavLink} to={token ? "/" : "/login"} onClick={onLogout}>
          {token ? "Cerrar Sesion" : "Iniciar Sesion"}
        </Nav.Link>
      </Nav>
    </Navbar>
  );
};

export default Header;
