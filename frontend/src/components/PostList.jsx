// PostList.js
import React, { useEffect, useState } from "react";
import api from "../../services/api";
import { Link } from "react-router-dom"; // Agrega esta importación
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";

const PostList = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await api.get("/posts");
        setPosts(response.data);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    fetchPosts();
  }, []);

  return (
    <Col xs={12} md={8} className="mx-auto">
      <h2 className="mt-4">Post List</h2>
      {posts.map((post) => (
        <Card key={post._id} className="my-3">
          <Card.Body>
            <Card.Title>{post.title}</Card.Title>
            <Card.Text>{post.description}</Card.Text>
            <Card.Img src={post.imageURL} alt={post.title} className="mb-3" />
            <Button
              as={Link}
              to={`/post/${post._id}`}
              variant="info"
              className="btn-animate"
            >
              {" "}
              {/* Agrega la clase "btn-animate" aquí */}
              Ver detalles
            </Button>
          </Card.Body>
        </Card>
      ))}
    </Col>
  );
};

export default PostList;
