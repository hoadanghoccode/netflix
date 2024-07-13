import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import useAuth from "../hooks/useAuth";
import "../css/login.css";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get(
        `http://localhost:9999/users?username=${username}&password=${password}`
      );
      const user = response.data[0];
      console.log(user.id);
      if (user) {
        login(user.role, user.id);
        navigate("/managerment");
      } else {
        alert("Invalid credentials");
      }
    } catch (error) {
      console.error("Login failed", error);
    }
  };

  return (
    <>
      <Container className="d-flex align-items-center justify-content-between">
        <nav>
          <div className="logo-login">
            <a href="/">Netflix</a>
          </div>
        </nav>
      </Container>
      <div className="background-img">
        <img src="./images/background.jpg" alt="Background" />
      </div>
      <div className="floating-form-container">
        <Row className="justify-content-md-center">
          <Col md={4} className="floating-form">
            <h2>Login</h2>
            <Form onSubmit={handleLogin}>
              <Form.Group controlId="formBasicUsername">
                <Form.Label style={{ color: "white" }}>Username</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </Form.Group>

              <Form.Group controlId="formBasicPassword">
                <Form.Label style={{ color: "white" }}>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Enter password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </Form.Group>

              <Form.Label style={{ color: "white" }}>
                New to Netflix?
                <Link style={{ textDecoration: "none" }} to={"/register"}>
                  <strong style={{ color: "white" }}>Sign up now.</strong>
                </Link>
              </Form.Label>

              <Button variant="danger" type="submit">
                Login
              </Button>
            </Form>
          </Col>
        </Row>
      </div>
    </>
  );
};

export default Login;
