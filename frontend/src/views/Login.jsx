// Login.js
import React, { useState, useCallback, useContext } from "react";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import { AuthContext } from "../hooks/AuthContext";

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const { onChangeAuthStatus } = useContext(AuthContext);
  const onChange = useCallback(
    (event) => {
      setFormData({
        ...formData,
        [event.target.name]: event.target.value,
      });
    },
    [formData]
  );

  const onSubmit = useCallback(
    async (event) => {
      event.preventDefault();

      try {
        await api
          .post("/users/login", formData)
          .then((res) => onChangeAuthStatus(res.data));
        navigate("/");
      } catch (error) {
        console.error("Error creating post:", error);
      }
    },
    [formData, navigate, onChangeAuthStatus]
  );

  const onRegister = useCallback(() => {
    navigate("/register");
  }, [navigate]);

  return (
    <Container
      className="mt-4"
      style={{ display: "flex", justifyContent: "center" }}
    >
      <div style={{ maxWidth: "500px", width: "100%" }}>
        <h2>Iniciar Sesion</h2>
        <Form onSubmit={onSubmit}>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>Nombre de usuario</Form.Label>
            <Form.Control
              type="text"
              placeholder="Usuario"
              name="username"
              value={formData.username}
              onChange={onChange}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>Contraseña</Form.Label>
            <Form.Control
              type="password"
              placeholder="Contraseña"
              name="password"
              value={formData.password}
              onChange={onChange}
            />
          </Form.Group>
          <div
            style={{ display: "flex", flexDirection: "column", width: "20%" }}
          >
            <Button
              variant="flat-primary"
              className="mb-1"
              onClick={onRegister}
            >
              registrarse
            </Button>
            <Button variant="primary" type="submit">
              Entrar
            </Button>
          </div>
        </Form>
      </div>
    </Container>
  );
};

export default Login;
