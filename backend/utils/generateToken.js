import jwt from 'jsonwebtoken';

export const generateToken = (res, userID) => {
  const token = jwt.sign({ userID }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  });

  //@ Set jwt as http-only cookie
  res.cookie('jwt', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV !== 'development',
    sameSite: 'strict',
    maxAge: 30 * 23 * 60 * 60 * 1000, // 30 Days
  });
};
