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
import { admin, protect } from '../middleware/authMiddlleware.js';

export const router = express.Router();
// /api/users

// @ -> public route | -> admin route
router.route('/').post(registerUser).get(protect, admin, getUsers);

// @ --> public routes
router.post('/logout', logoutUser);
router.post('/login', loginUser);

// @ -> private routes
router
  .route('/profile')
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile);

// @ -> admin routes
router
  .route('/:id')
  .get(protect, admin, getUser)
  .delete(protect, admin, deleteUser)
  .put(protect, admin, updateUser);
