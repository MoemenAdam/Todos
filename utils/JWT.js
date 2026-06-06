import jwt from 'jsonwebtoken';
import { promisify } from 'util';

export const generateJWT = (id) => {
  return jwt.sign({ userId: id }, process.env.JWT_SECRET, {
    expiresIn: '7d',
  });
};

export const validateJWT = async (token) => {
  return await promisify(jwt.verify)(token, process.env.JWT_SECRET);
};
