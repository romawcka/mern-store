import { asyncHandler } from '../middleware/asyncHandler.js';
import { User } from '../models/user.model.js';
import { generateToken } from '../utils/generateToken.js';

// @desc -> fetch aurh user + get token
// @ route -> POST 'api/users/login'
// @access -> public
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    generateToken(res, user._id);

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
    generateToken(res, user._id);

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
  const user = await User.findById(req.user._id);

  if (user) {
    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});

// @desc -> update user profile
// @route -> PUT 'api/users/profile'
// @access -> private
const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    user.name = req.body.name || user.name; // для обновление user name будет использовано либо то что будет в body.name или то, что уже есть
    user.email = req.body.email || user.email;

    if (req.body.password) {
      user.password = req.body.password; // нужно проверять, есть ли что-то в поле password для обновления, тк у нас захеширован пароль в базе данных, и его просто так не получится использовать как user.name / email
    }

    const updatedUser = await user.save();

    res.status(200).json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
    });
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});

// @desc -> get list of users/users
// @route -> GET 'api/users'
// @access -> private/Admin
const getUsers = asyncHandler(async (req, res) => {
  const users = await User.find({});
  res.status(200).json(users);
});

// @desc -> get specific user, by id
// @route -> GET 'api/users/:id'
// @access -> private/Admin
const getUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id).select('-password');
  if (user) {
    res.status(200).json(user);
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});

// @desc -> delete users
// @route -> DELETE 'api/users/:id'
// @access -> private/Admin
const deleteUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    if (user.isAdmin) {
      res.status(400);
      throw new Error('Cannot delete admin user');
    }
    await User.deleteOne({ _id: user._id });
    res.status(201).json({ message: 'User was successfully deleted' });
  } else {
    res.status(400);
    throw new Error('User was not found');
  }
});

// @desc -> update user
// @route -> PUT 'api/users/:id'
// @access -> private/Admin
const updateUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    user.name = req.body.name || user.name; // для обновление user name будет использовано либо то что будет в body.name или то, что уже есть
    user.email = req.body.email || user.email;
    user.isAdmin = Boolean(req.body.isAdmin);

    if (req.body.password) {
      user.password = req.body.password; // нужно проверять, есть ли что-то в поле password для обновления, тк у нас захеширован пароль в базе данных, и его просто так не получится использовать как user.name / email
    }

    const updatedUser = await user.save();

    res.status(200).json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
    });
  } else {
    res.status(404);
    throw new Error('User not found');
  }
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
