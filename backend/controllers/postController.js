const Post = require('../models/post');

exports.getPosts = async (req, res) => {
  try {
    const posts = await Post.find().populate('author').populate('comments');
    res.status(200).json(posts);
  } catch (error) {
    console.error('Get posts error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
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
    console.error('Create post error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.getPostById = async (req, res) => {
  try {
    const postId = req.params.id;
    const post = await Post.findById(postId).populate('author').populate('comments');
    res.status(200).json(post);
  } catch (error) {
    console.error('Get post by ID error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
