// Home.js
import React, { useCallback, useState, useEffect } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

const formatCreatedAt = (createAt) => {
  const date = new Date(createAt);

  return date.getDay() + " " + date.getMonth() + " " + date.getFullYear();
};

const Posts = () => {
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPosts = async () => {
      const results = await api.get("/posts");
      if (results.data) {
        setPosts(results.data.posts);
      }
    };

    fetchPosts();
  }, []);

  const onNewPost = useCallback(() => {
    navigate("/crear-post");
  }, [navigate]);

  const onEditPost = useCallback(
    (id) => {
      navigate("/editar-post/" + id);
    },
    [navigate]
  );

  const onDeletePost = useCallback(async (id) => {
    await api.delete("/post/" + id);
  }, []);

  const onViewComment = useCallback(
    (id) => {
      navigate("/post/" + id);
    },
    [navigate]
  );

  return (
    <Container className="mt-4">
      <Row className="g-4 justify-content-md-center">
        <Col>
          <div
            className="mb-4"
            style={{ display: "flex", justifyContent: "space-between" }}
          >
            <h1>Mis Posts</h1>
            <Button onClick={onNewPost} variant="primary">
              Nuevo Post
            </Button>
          </div>
        </Col>
      </Row>
      <Row xs={1} md={2} className="g-4">
        {posts.map((post, index) => (
          <Col key={index}>
            <Card>
              <Card.Img variant="top" src={post.imageURL} />
              <Card.Body>
                <Card.Title>{post.title}</Card.Title>
                <Card.Text>
                  {post.author} {formatCreatedAt(post.createAt)} ART
                </Card.Text>
                <Card.Text>{post.description}</Card.Text>
                <Button
                  variant="success"
                  onClick={() => onViewComment(post.id)}
                >
                  Ver comentarios
                </Button>
                <Button
                  className="ms-4"
                  variant="primary"
                  onClick={() => onEditPost(post.id)}
                >
                  Editar
                </Button>
                <Button
                  onClick={() => onDeletePost(post.id)}
                  className="ms-4"
                  variant="danger"
                >
                  Borrar
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default Posts;
