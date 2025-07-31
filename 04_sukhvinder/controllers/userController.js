import User from '../models/User.js';


export const createUser = async (req, res) => {
  try {
    const { username } = req.body;

    console.log(username)

    if (!username || username.length < 3) {
      return res.status(400).json({ message: 'Username is required and must be at least 3 characters long.' });
    }

    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: 'Username already exists.' });
    }

    const user = await User.create({ username });
    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().sort({ createdAt: -1 });
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


export const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
