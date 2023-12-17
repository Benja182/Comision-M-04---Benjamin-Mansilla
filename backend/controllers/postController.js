const Post = require("../models/post");

exports.getPosts = async (req, res) => {
  try {
    const posts = await Post.find().populate("author").populate("comments");
    res.status(200).json({ posts: posts });
  } catch (error) {
    console.error("Get posts error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.getPostsByAuthor = async (req, res) => {
  const author = req.user.id;
  try {
    const posts = await Post.find({ author })
      .populate("author")
      .populate("comments");
    res.status(200).json({ posts: posts });
  } catch (error) {
    console.error("Get posts error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.createPost = async (req, res) => {
  try {
    const { title, description, imageURL } = req.body;
    const author = req.user.id;

    const newPost = new Post({ title, description, author, imageURL });
    await newPost.save();

    res.status(201).json(newPost);
  } catch (error) {
    console.error("Create post error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.updatePost = async (req, res) => {
  try {
    const postId = req.params.id;
    const { title, description, imageURL } = req.body;

    const updatePost = await Post.findById(postId)
      .populate("author")
      .populate("comments");

    updatePost.title = title;
    updatePost.description = description;
    updatePost.imageURL = imageURL;
    await updatePost.save();

    res.status(201).json({ updatePost });
  } catch (error) {
    console.error("Create post error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.getPostById = async (req, res) => {
  try {
    const postId = req.params.id;
    const post = await Post.findById(postId)
      .populate("author")
      .populate({
        path: "comments",
        populate: {
          path: "author",
        },
      });

    res.status(200).json({ post });
  } catch (error) {
    console.error("Get post by ID error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.deletePost = async (req, res) => {
  try {
    const postId = req.params.id;
    await Post.deleteOne({ _id: postId });

    res.status(200);
  } catch (error) {
    console.error("Delete post by ID error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
