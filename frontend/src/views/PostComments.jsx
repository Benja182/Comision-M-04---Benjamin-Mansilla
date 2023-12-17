// Home.js
import React, { useEffect, useState, useCallback, useContext } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import { useNavigate, useParams } from "react-router-dom";
import api from "../services/api";
import { Button } from "react-bootstrap";
import { formatCreatedAt } from "./Home";
import { AuthContext } from "../hooks/AuthContext";

const PostComment = () => {
  const [post, setPost] = useState({});
  const [comment, setComment] = useState({
    description: "",
  });
  const [refresh, setRefresh] = useState(false);
  const { token, user } = useContext(AuthContext);
  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPost = async () => {
      const id = params.postId;
      const result = await api.get("/posts/" + id);

      if (result.data.post) {
        setPost(result.data.post);
      }
      setRefresh(false);
    };

    fetchPost();
  }, [params, refresh]);

  const onChange = useCallback(
    (event) => {
      setComment({
        ...comment,
        [event.target.name]: event.target.value,
      });
    },
    [comment]
  );

  const onSubmit = useCallback(
    async (event) => {
      event.preventDefault();

      try {
        await api.post(
          "/comments/" + post._id,
          { ...comment, author: user },
          {
            headers: { authorization: token },
          }
        );
        setComment({ description: "" });
        setRefresh(true);
      } catch (error) {
        console.error("Error creating post:", error);
      }
    },
    [comment, token, user, post]
  );

  const onLogin = useCallback(() => {
    !token && navigate("/login");
  }, [token, navigate]);

  return (
    <Container className="mt-4">
      <Row
        xs={1}
        md={1}
        style={{ border: "1px solid #dee2e6", borderRadius: "15px" }}
      >
        <Col className="p-0 m-0">
          <img
            src={post && post.imageURL}
            style={{ width: "100%", height: "auto" }}
          />
        </Col>
        <Col>
          <div
            className="mb-4"
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <h1>{post && post.title}</h1>
            <div>
              {post.author && post.author.fullname}{" "}
              {formatCreatedAt(post && post.createdAt)} ART
            </div>
            <div>{post && post.description}</div>
          </div>
        </Col>
      </Row>
      <Row className="mt-4">
        <Col>
          <Form onSubmit={onSubmit}>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Comentarios</Form.Label>
              <Form.Control
                type="text"
                placeholder="Agregar Comentario"
                onChange={onChange}
                name="description"
                value={comment.description}
              />
            </Form.Group>
            <Button variant="primary" type="submit" onClick={onLogin}>
              {token ? "Publicar" : "Iniciar Sesion para comentar"}
            </Button>
          </Form>
          {post.comments &&
            post.comments.map((comment, index) => (
              <div className="ms-4 mb-2" key={index}>
                <h6>{comment.author.fullname}</h6>
                <div>{comment.description}</div>
              </div>
            ))}
        </Col>
      </Row>
    </Container>
  );
};

export default PostComment;
