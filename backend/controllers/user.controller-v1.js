import jwt from 'jsonwebtoken';
import { asyncHandler } from '../middleware/asyncHandler.js';
import { User } from '../models/user.model.js';

// @desc -> fetch aurh user + get token
// @ route -> POST 'api/users/login'
// @access -> public
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    const token = jwt.sign({ userID: user._id }, process.env.JWT_SECRET, {
      expiresIn: '30d',
    });

    //@ Set jwt as http-only cookie
    res.cookie('jwt', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV !== 'development',
      sameSite: 'strict',
      maxAge: 30 * 23 * 60 * 60 * 1000, // 30 Days
    });

    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  } else {
    res.status(401);
    throw new Error('Invalid email or password');
  }
});

// @desc -> register user
// @route -> POST 'api/users'
// @access -> public
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  const userExist = await User.findOne({ email });

  if (userExist) {
    res.status(400);
    throw new Error('User already exists');
  }

  const user = await User.create({
    name,
    email,
    password,
  });

  // token creation
  if (user) {
    const token = jwt.sign({ userID: user._id }, process.env.JWT_SECRET, {
      expiresIn: '30d',
    });

    //@ Set jwt as http-only cookie
    res.cookie('jwt', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV !== 'development',
      sameSite: 'strict',
      maxAge: 30 * 23 * 60 * 60 * 1000, // 30 Days
    });
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  } else {
    res.status(400);
    throw new Error('Invalid user data');
  }
});

// @desc -> logout user + clear cookie
// @route -> POST 'api/users/logout'
// @access -> private
const logoutUser = asyncHandler(async (req, res) => {
  res.cookie('jwt', '', {
    httpOnly: true,
    expires: new Date(0),
  });

  res.status(200).json({ message: 'Logout successfully' });
});

// @desc -> get user profile
// @route -> GET 'api/users/profile'
// @access -> private
const getUserProfile = asyncHandler(async (req, res) => {
  res.send('get user profile');
});

// @desc -> update user profile
// @route -> PUT 'api/users/profile'
// @access -> private
const updateUserProfile = asyncHandler(async (req, res) => {
  res.send('update user profile');
});

// @desc -> get list of users/users
// @route -> GET 'api/users'
// @access -> private/Admin
const getUsers = asyncHandler(async (req, res) => {
  res.send('get list of users');
});

// @desc -> get specific user, by id
// @route -> GET 'api/users/:id'
// @access -> private/Admin
const getUser = asyncHandler(async (req, res) => {
  res.send('get specific user');
});

// @desc -> delete users
// @route -> DELETE 'api/users/:id'
// @access -> private/Admin
const deleteUser = asyncHandler(async (req, res) => {
  res.send('delete user');
});

// @desc -> update user
// @route -> PUT 'api/users/:id'
// @access -> private/Admin
const updateUser = asyncHandler(async (req, res) => {
  res.send('update user');
});

export {
  deleteUser,
  getUser,
  getUserProfile,
  getUsers,
  loginUser,
  logoutUser,
  registerUser,
  updateUser,
  updateUserProfile,
};
