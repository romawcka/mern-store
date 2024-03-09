import jwt from 'jsonwebtoken';
import { User } from '../models/user.model.js';
import { asyncHandler } from './asyncHandler.js';

export const protect = asyncHandler(async (req, res, next) => {
  let token;

  //  read jwt token from cookie
  token = req.cookies.jwt;

  if (token) {
    try {
      // need to decode id from token
      const decodeded = jwt.verify(token, process.env.JWT_SECRET); // проверка, чтобы JWT_SECRET сошелся с тем что в роуте
      req.user = await User.findById(decodeded.userID).select('-password');

      next();
    } catch (error) {
      console.log(error);
      res.status(401);
      throw new Error('Not authorized');
    }
  } else {
    res.status(401);
    throw new Error('Not authorized, no token');
  }
});

export const admin = asyncHandler(async (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    res.status(401);
    throw new Error('Not authorized as admin');
  }
});
