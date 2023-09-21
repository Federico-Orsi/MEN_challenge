import { check } from 'express-validator';
import errorCodes from '../../../constants/errorCodes.js';


const validateId = check('id', errorCodes.ID_INVALID).isString();

export default validateId;
