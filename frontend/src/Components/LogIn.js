import React, { useState, useContext } from "react";
import AuthService from "../Services/AuthService";
import { AuthContext } from "../Services/AuthContent";
import { Container, Row, Col, Button, Form } from "react-bootstrap";
import Message from '../Components/Message';

const LogIn = props=> {
  const [user, setUser] = useState({ username: "", password: "" });
  const [message, setMessage] = useState(null);
  const authContext = useContext(AuthContext);

  const onChange = (event) => {
    event.preventDefault();
    setUser({ ...user, [event.target.name]: event.target.value });
  };

  const onSubmit = (event) => {
    event.preventDefault();
    AuthService.logIn(user).then((data) => {
      const { isAuthenticated, user, message } = data;
      if (isAuthenticated) {
        authContext.setUser(user);
        authContext.setIsAuthenticated(isAuthenticated);
        props.history.push("/quiz");
      } else setMessage(message);
    });
  };

  return (
    <Container>
      <Row>
        <Col className="w-50 primary-success">
          <Form onSubmit={onSubmit}>
            <Form.Group as={Row}>
              <Form.Label column sm={2}>
                Username
              </Form.Label>
              <Col sm={10}>
                <Form.Control
                  type="text"
                  name="username"
                  placeholder="Username"
                  onChange={onChange}
                />
              </Col>
            </Form.Group>
            <Form.Group as={Row}>
              <Form.Label column sm={2}>
                Password
              </Form.Label>
              <Col sm={10}>
                <Form.Control
                  type="password"
                  name="password"
                  placeholder="Password"
                  onChange={onChange}
                />
              </Col>
            </Form.Group>
            <Form.Group as={Row}>
                <Button type="submit">Log In</Button>
            </Form.Group>
            {message ? <Message message={message} /> : null}
          </Form>
        </Col>
      </Row>
    </Container>
  );
}

export default LogIn;