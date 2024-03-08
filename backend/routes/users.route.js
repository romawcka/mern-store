import express from 'express';
import {
  deleteUser,
  getUser,
  getUserProfile,
  getUsers,
  loginUser,
  logoutUser,
  registerUser,
  updateUser,
  updateUserProfile,
} from '../controllers/user.controller.js';

export const router = express.Router();
// /api/users
router.route('/').post(registerUser).get(getUsers);
router.post('/logout', logoutUser);
router.post('/login', loginUser);
router.route('/profile').get(getUserProfile).put(updateUserProfile);
router.route('/:id').get(getUser).delete(deleteUser).put(updateUser);
