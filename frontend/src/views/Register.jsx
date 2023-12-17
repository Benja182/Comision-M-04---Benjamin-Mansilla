// Register.js
import React, { useState, useCallback } from "react";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    email: "",
    avatarURL: "",
    fullname: "",
  });

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
        await api.post("/users/register", formData).then((res) => res.token);
        navigate("/");
      } catch (error) {
        console.error("Error creating post:", error);
      }
    },
    [formData, navigate]
  );

  return (
    <Container
      className="mt-4"
      style={{ display: "flex", justifyContent: "center" }}
    >
      <div style={{ maxWidth: "500px", width: "100%" }}>
        <h2>Registro</h2>
        <Form onSubmit={onSubmit}>
          <Form.Group className="mb-3" controlId="username">
            <Form.Label>Nombre de usuario</Form.Label>
            <Form.Control
              type="text"
              placeholder="Usuario"
              name="username"
              onChange={onChange}
              value={formData.username}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="fullname">
            <Form.Label>Nombre completo</Form.Label>
            <Form.Control
              type="text"
              placeholder="Nombre Completo"
              name="fullname"
              onChange={onChange}
              value={formData.fullname}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="password">
            <Form.Label>Contraseña</Form.Label>
            <Form.Control
              type="password"
              placeholder="Contraseña"
              name="password"
              onChange={onChange}
              value={formData.password}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="password">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="text"
              placeholder="Email"
              name="email"
              onChange={onChange}
              value={formData.email}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="password">
            <Form.Label>Avatar</Form.Label>
            <Form.Control
              type="text"
              placeholder="Avatar"
              name="avatarURL"
              onChange={onChange}
              value={formData.avatarURL}
            />
          </Form.Group>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <Button variant="primary" type="submit">
              Enviar
            </Button>
          </div>
        </Form>
      </div>
    </Container>
  );
};

export default Register;
