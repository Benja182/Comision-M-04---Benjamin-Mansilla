// Home.js
import React, { useCallback, useEffect, useState } from "react";
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

const Home = () => {
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

  const onVisitePost = useCallback(
    (id) => {
      navigate("/post/" + id);
    },
    [navigate]
  );

  return (
    <Container className="mt-4">
      <Row xs={1} md={2} className="g-4 justify-content-md-center">
        <Col md="auto">
          <h1>Bienvenido a la plataforma de travel</h1>
          <p style={{ justifyContent: "center", display: "flex" }}>
            Comparte tus experiencias de travel.
          </p>
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
                <Button variant="primary" onClick={() => onVisitePost(post.id)}>
                  Visitar
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default Home;
