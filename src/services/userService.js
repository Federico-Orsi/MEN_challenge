/* eslint-disable object-curly-newline */
import errorCodes from '../constants/errorCodes.js';
import User from '../models/user.js';
import { signJwt } from '../utils/jwtUtil.js';

const { USER_NOT_EXISTS, PASSWORD_NOT_VALID } = errorCodes;
// const { User } = models;

const findByEmail = (email) => User.findOne({ email });

const findById = (id) => User.findById(id);

const create = (user) => User.create(user);

const authenticate = async (credentials) => {
  try {
    const user = await findByEmail(credentials.email);
    if (!user) throw new Error(USER_NOT_EXISTS);
    const isPasswordValid = await user.validatePassword(credentials.password);
    if (!isPasswordValid) {
      throw new Error(PASSWORD_NOT_VALID);
    }
    const token = signJwt(user);
    return { ...user.toJSON(), ...{ token } };
  } catch (err) {
    return Promise.reject(err.message);
  }
};

const userService = { findById, findByEmail, create, authenticate };

export default userService;
