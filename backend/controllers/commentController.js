// comments.js
const Comment = require('../models/comment');
const Post = require('../models/post');

exports.createComment = async (req, res) => {
  try {
    const { description } = req.body;
    const author = req.user.id;
    const postId = req.params.postId;

    const newComment = new Comment({ description, author });
    await newComment.save();

    const post = await Post.findById(postId);
    post.comments.push(newComment);
    await post.save();

    res.status(201).json(newComment);
  } catch (error) {
    console.error('Create comment error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.getCommentsByPostId = async (req, res) => {
  try {
    const postId = req.params.postId;
    const post = await Post.findById(postId).populate('comments');
    const comments = post.comments;
    res.status(200).json(comments);
  } catch (error) {
    console.error('Get comments by post ID error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
