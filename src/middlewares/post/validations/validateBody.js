import { check } from 'express-validator';
import errorCodes from '../../../constants/errorCodes.js';
import { MAX_BODY_LENGTH } from '../../../models/post.js';

const { POST_BODY_INVALID_LENGTH, POST_BODY_INVALID } = errorCodes;

const validateTitle = check('body', POST_BODY_INVALID)
  .isString()
  .isLength({ min: 0, max: MAX_BODY_LENGTH })
  .withMessage(POST_BODY_INVALID_LENGTH);

export default validateTitle;
