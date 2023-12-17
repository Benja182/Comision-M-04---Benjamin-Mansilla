// CreatePost.js
import React, { useCallback, useContext, useEffect, useState } from "react";
import { Container, Form, Button } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import api from "../services/api";
import { AuthContext } from "../hooks/AuthContext";

const CreatePost = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    imageURL: "",
  });
  const { token } = useContext(AuthContext);
  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }, [navigate, token]);

  useEffect(() => {
    const fetchPost = async () => {
      const id = params.postId;
      const result = await api.get("/posts/" + id);

      if (result.data.post) {
        setFormData(result.data.post);
      }
      setRefresh(false);
    };

    fetchPost();
  }, [params, token]);

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
        console.log(params.postId, "aiudyhaw8i7dhuaiwhdauiw");
        if (params.postId) {
          await api.put("/posts/" + params.postId, formData, {
            headers: { authorization: token },
          });
        } else {
          await api.post("/posts", formData, {
            headers: { authorization: token },
          });
        }
        navigate("/mis-posts");
      } catch (error) {
        console.error("Error creating post:", error);
      }
    },
    [formData, navigate, token, params.postId]
  );

  return (
    <Container className="mt-4">
      <h2>{params.postId ? "Actualizar Post" : "Crear un nuevo Post"}</h2>
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
          <Form.Label>URL de la imagen</Form.Label>
          <Form.Control
            type="text"
            placeholder="URL de imagen"
            name="imageURL"
            value={formData.imageURL}
            onChange={onChange}
          />
        </Form.Group>

        <Button className="mt-4" variant="primary" type="submit">
          {params.postId ? "Actualizar Post" : "Crear Post"}
        </Button>
      </Form>
    </Container>
  );
};

export default CreatePost;
