const express = require("express");
const router = express.Router();
const postController = require("../controllers/postController");
const authMiddleware = require("../middlewares/authMiddleware");

// Obtener todas las publicaciones
router.get("/", postController.getPosts);

router.get("/mis-posts", authMiddleware, postController.getPostsByAuthor);
// Crear una nueva publicación (requiere autenticación)
router.post("/", authMiddleware, postController.createPost);

// Obtener una publicación por su ID
router.get("/:id", postController.getPostById);

router.put("/:id", authMiddleware, postController.updatePost);

router.delete("/:id", authMiddleware, postController.deletePost);

module.exports = router;
