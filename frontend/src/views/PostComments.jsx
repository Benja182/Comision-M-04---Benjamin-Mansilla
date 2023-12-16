// Home.js
import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import { useParams } from "react-router-dom";
import api from "../services/api";

const formatCreatedAt = (createAt) => {
  const date = new Date(createAt);

  return date.getDay() + " " + date.getMonth() + " " + date.getFullYear();
};

const PostComment = () => {
  const [post, setPost] = useState({});
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);
  const params = useParams();

  useEffect(() => {
    const fetchPost = async () => {
      const id = params.postId;
      const result = await api.get("/post/" + id);

      if (result.data) {
        setPost(result.data.post);
      }
    };

    fetchPost();
  }, [params]);

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
              {post && post.author} {formatCreatedAt(post && post.createAt)} ART
            </div>
            <div>{post && post.description}</div>
          </div>
        </Col>
      </Row>
      <Row className="mt-4">
        <Col>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>Comentarios</Form.Label>
            <Form.Control type="text" placeholder="Agregar Comentario" />
          </Form.Group>
          {Array.from({ length: 10 }).map((_, index) => (
            <div className="ms-4 mb-2">
              <h6>pepito fuentes</h6>
              <div>un comentario {index}</div>
            </div>
          ))}
        </Col>
      </Row>
    </Container>
  );
};

export default PostComment;
