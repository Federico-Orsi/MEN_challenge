import { check } from 'express-validator';
import errorCodes from '../../../constants/errorCodes.js';
import { MIN_PASSWORD_LENGTH } from '../../../models/user.js';

const { PASSWORD_INVALID_LENGTH, PASSWORD_INVALID } = errorCodes;

const validatePassword = check('password', PASSWORD_INVALID)
  .isString()
  .isLength({ min: MIN_PASSWORD_LENGTH })
  .withMessage(PASSWORD_INVALID_LENGTH);

export default validatePassword;
