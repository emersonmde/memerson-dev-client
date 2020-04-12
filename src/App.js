import React, { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import { LinkContainer } from "react-router-bootstrap";
import { Nav, Navbar } from "react-bootstrap";
import { Auth } from "aws-amplify";
import Routes from "./Routes";
import "./App.css";

function App(props) {
  const [isAuthenticated, userHasAuthenticated] = useState(false);
  const [isAuthenticating, setIsAuthenticating] = useState(true);

  useEffect(() => {
    onLoad();
  }, []);

  async function onLoad() {
    try {
      await Auth.currentSession();
      userHasAuthenticated(true);
    } catch(e) {
      if (e !== 'No current user') {
        alert(e);
      }
    }

    setIsAuthenticating(false);
  }

  async function handleLogout() {
    await Auth.signOut();
    userHasAuthenticated(false);

    props.history.push("/login");
  }


  return (
    !isAuthenticating &&
    <div className="App container">
      <Navbar expand="lg">
        <LinkContainer to="/">
          <Navbar.Brand>Matthew Emerson</Navbar.Brand>
        </LinkContainer>
        <Navbar.Toggle aria-controls="navbar" />
        <Navbar.Collapse id="navbar">
          <Nav className="ml-auto">
            {isAuthenticated
                ? <>
                    <Nav.Item>
                      <LinkContainer to="/post/new">
                        <Nav.Link>New Post</Nav.Link>
                      </LinkContainer>
                    </Nav.Item>
                    <Nav.Item onClick={handleLogout}>
                      <Nav.Link>Logout</Nav.Link>
                    </Nav.Item>
                  </>
                : <>
                    <Nav.Item>
                      <LinkContainer to="/login">
                        <Nav.Link>Login</Nav.Link>
                      </LinkContainer>
                    </Nav.Item>
                  </>
            }
            {/* {isAuthenticated
                ? <NavItem onClick={handleLogout}>Logout</NavItem>
                : <>
                    <LinkContainer to="/login">
                      <NavItem>Login</NavItem>
                    </LinkContainer>
                  </>
            } */}
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      <hr />
      <Routes appProps={{ isAuthenticated, userHasAuthenticated }} />
    </div>
  );
}

export default withRouter(App);
