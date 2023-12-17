// Home.js
import React, { useCallback, useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import PostCard from "../components/PostDetail";

export const formatCreatedAt = (createAt) => {
  const date = new Date(createAt);

  return date.getDay() + " " + date.getMonth() + " " + date.getFullYear();
};

const Home = () => {
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const results = await api.get("/posts");
        if (results.data.posts) {
          console.log(results.data.posts);
          setPosts(results.data.posts || []);
        }
      } catch {}
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
          <PostCard post={post} onVisitePost={onVisitePost} index={index} />
        ))}
      </Row>
    </Container>
  );
};

export default Home;
