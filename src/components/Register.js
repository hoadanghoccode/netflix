import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import "../css/register.css";

const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [userId, setUserId] = useState("");
  const [role, setRole] = useState("user");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:9999/users", {
        username,
        password,
        role,
        name,
      });
      alert("Register successfully!!");
      //   setUsername("");
      //   setPassword("");
      //   setName("");
      //   setRole("user");
      navigate("/login");
    } catch (error) {
      console.error("Error adding user:", error);
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
            <h2>Register</h2>
            <Form onSubmit={handleSubmit}>
              <Form.Group controlId="formUserName">
                <Form.Label className="form-label">User Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter user name"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </Form.Group>
              <Form.Group controlId="formPassword">
                <Form.Label className="form-label">Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Enter password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </Form.Group>
              <Form.Group controlId="formName">
                <Form.Label className="form-label">Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </Form.Group>
              <Form.Label className="link-label">
                Already have an account? <Link to="/login">Login here.</Link>
              </Form.Label>
              <Button variant="danger" type="submit">
                Register
              </Button>
            </Form>
          </Col>
        </Row>
      </div>
    </>
  );
};

export default Register;
