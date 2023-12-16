// Comments.js
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../services/api';
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';

const Comments = () => {
  const { postId } = useParams();
  const [comments, setComments] = useState([]);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await api.get(`/comments/${postId}`);
        setComments(response.data);
      } catch (error) {
        console.error('Error fetching comments:', error);
      }
    };

    fetchComments();
  }, [postId]);

  return (
    <Container className="mt-4">
      <h2>Comments</h2>
      {comments.map(comment => (
        <Card key={comment._id} className="my-3">
          <Card.Body>
            <Card.Text>{comment.description}</Card.Text>
          </Card.Body>
        </Card>
      ))}
    </Container>
  );
};

export default Comments;
