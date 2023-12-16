// commentRoutes.js
const express = require('express');
const router = express.Router();
const commentController = require('../controllers/commentController');
const authMiddleware = require('../middlewares/authMiddleware');

// Crear un comentario en una publicación específica (requiere autenticación)
router.post('/:postId', authMiddleware, commentController.createComment);
router.get('/:postId/comments', commentController.getCommentsByPostId);  // Nueva ruta para obtener comentarios por ID de publicación

module.exports = router;
