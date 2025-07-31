import Post from '../models/Post.js';
import User from '../models/User.js';


export const createPost = async (req, res) => {
  try {
    const { title, content, author } = req.body;

    if (!title || !content || !author) {
      return res.status(400).json({ message: 'Title, content, and author are required.' });
    }

    if (title.length < 3 || content.length < 10) {
      return res.status(400).json({ message: 'Title or content is too short.' });
    }

    const userExists = await User.findById(author);
    if (!userExists) return res.status(404).json({ message: 'Author not found' });

    const newPost = await Post.create({ title, content, author });
    res.status(201).json(newPost);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


export const getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find()
      .populate('author', 'username');
    res.status(200).json(posts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


export const getPostById = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id)
      .populate('author', 'username');
    if (!post) return res.status(404).json({ message: 'Post not found' });

    res.status(200).json(post);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


export const updatePost = async (req, res) => {
  try {
    const { title, content } = req.body;
    const post = await Post.findById(req.params.id);

    if (!post) return res.status(404).json({ message: 'Post not found' });

    if (title && title.length < 3) return res.status(400).json({ message: 'Title too short' });
    if (content && content.length < 10) return res.status(400).json({ message: 'Content too short' });

    if (title) post.title = title;
    if (content) post.content = content;

    const updated = await post.save();
    res.status(200).json(updated);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


export const deletePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ message: 'Post not found' });

    await post.deleteOne();
    res.status(200).json({ message: 'Post deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
