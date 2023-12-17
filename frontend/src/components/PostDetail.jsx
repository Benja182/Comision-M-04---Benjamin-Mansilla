// Home.js
import React from "react";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import { formatCreatedAt } from "../views/Home";

const PostCard = ({ post, index, onVisitePost }) => {
  return (
    <Col key={index}>
      <Card>
        <Card.Img variant="top" src={post.imageURL} />
        <Card.Body>
          <Card.Title>{post.title}</Card.Title>
          <Card.Text>
            {post.author && post.author.fullname}{" "}
            {formatCreatedAt(post.createdAt)} ART
          </Card.Text>
          <Card.Text>{post.description}</Card.Text>
          <Button variant="primary" onClick={() => onVisitePost(post._id)}>
            Visitar
          </Button>
        </Card.Body>
      </Card>
    </Col>
  );
};

export default PostCard;
