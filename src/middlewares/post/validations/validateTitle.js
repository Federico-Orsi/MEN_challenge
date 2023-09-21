import { check } from 'express-validator';
import errorCodes from '../../../constants/errorCodes.js';
import { MAX_TITLE_LENGTH } from '../../../models/post.js';

const { POST_TITLE_INVALID_LENGTH, POST_TITLE_INVALID } = errorCodes;

const validateTitle = check('title', POST_TITLE_INVALID)
  .isString()
  .isLength({ min: 0, max: MAX_TITLE_LENGTH })
  .withMessage(POST_TITLE_INVALID_LENGTH);

export default validateTitle;
