// CreatePost.js
import React, { useCallback, useState } from "react";
import { Container, Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

const CreatePost = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    imageURL: "",
  });

  const navigate = useNavigate();

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
        await api.post("/posts", formData);
        navigate("/mis-posts");
      } catch (error) {
        console.error("Error creating post:", error);
      }
    },
    [formData, navigate]
  );

  return (
    <Container className="mt-4">
      <h2>Create a New Post</h2>
      <Form onSubmit={onSubmit}>
        <Form.Group className="mt-4" controlId="formTitle">
          <Form.Label>Titulo</Form.Label>
          <Form.Control
            type="text"
            placeholder="Titulo"
            name="title"
            value={formData.title}
            onChange={onChange}
            required
          />
        </Form.Group>

        <Form.Group className="mt-4" controlId="formDescription">
          <Form.Label>Experiencia</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            placeholder="Experiencia"
            name="description"
            value={formData.description}
            onChange={onChange}
            required
          />
        </Form.Group>

        <Form.Group className="mt-4" controlId="formImageURL">
          <Form.Label>Image URL</Form.Label>
          <Form.Control
            type="text"
            placeholder="URL de imagen"
            name="imageURL"
            value={formData.imageURL}
            onChange={onChange}
          />
        </Form.Group>

        <Button className="mt-4" variant="primary" type="submit">
          Crear Post
        </Button>
      </Form>
    </Container>
  );
};

export default CreatePost;
