import React, { useContext, Fragment } from "react";
import { NavLink, Link } from "react-router-dom";
import { Navbar, Nav, Button } from "react-bootstrap";
import { AuthContext } from "../Services/AuthContent";
import AuthService from "../Services/AuthService";

export default function NavBar(props) {
  const {  setUser, isAuthenticated, setIsAuthenticated } =
    useContext(AuthContext);

  const onClickLogout = () => {
    AuthService.logout().then((data) => {
      if (data.session) {
        setUser(data.user);
        setIsAuthenticated(false);
      }
    });
  };

  const unAuthenticatedNavBar = () => {
    return (
      <Link to="/">
        <div className="navbar-brand">Quiz Manager</div>
      </Link>
    );
  };
  const authenticatedNavBar = () => {
    return (
      <Fragment>
        <NavLink to="/quiz" className="mr-5">
          <div className="navbar-brand">Quiz Manager</div>
        </NavLink>
        <NavLink to="/" className="mr-5">
          <Button onClick={onClickLogout}>Log Out</Button>
        </NavLink>
      </Fragment>
    );
  };
  return (
    <Fragment>
      <Navbar bg="dark" variant="dark" className="justify-content-center">
        <Nav className="justify">
          <Navbar.Brand></Navbar.Brand>
          {!isAuthenticated ? unAuthenticatedNavBar() : authenticatedNavBar()}
        </Nav>
      </Navbar>
      <br />
    </Fragment>
  );
}
