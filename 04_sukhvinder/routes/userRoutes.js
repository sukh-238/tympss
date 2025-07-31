import express from 'express';
import {
  createUser,
  getAllUsers,
  getUserById
} from '../controllers/userController.js';

const router = express.Router();

router.post('/', createUser);
router.get('/users', getAllUsers);
router.get('/users/:id', getUserById);

export default router;
