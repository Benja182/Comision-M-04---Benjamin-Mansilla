const express = require('express');
const router = express.Router();
const postController = require('../controllers/postController');
const authMiddleware = require('../middlewares/authMiddleware');

// Obtener todas las publicaciones
router.get('/', postController.getPosts);

// Crear una nueva publicación (requiere autenticación)
router.post('/', authMiddleware, postController.createPost);

// Obtener una publicación por su ID
router.get('/:id', postController.getPostById);

module.exports = router;
