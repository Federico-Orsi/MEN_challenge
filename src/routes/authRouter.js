import express from 'express';
import authUser from '../middlewares/user/authUser.js';
import registerUser from '../middlewares/user/registerUser.js';
// import userValidations from '../middlewares/user/validations';
import validateBody from '../middlewares/common/validations/validateBody.js';
import validateEmail from '../middlewares/user/validations/validateEmail.js';
import validatePassword from '../middlewares/user/validations/validatePassword.js';
import validateUniqueEmail from '../middlewares/user/validations/validateUniqueEmail.js';

// const { validateBody } = commonValidations;
// const { authUser, registerUser } = userMiddlewares;


const authRouter = express.Router();

const authValidations = [validateEmail, validatePassword];

const authMiddlewares = validateBody(authValidations);
authRouter.post('/', authMiddlewares, authUser);

const registerValidations = authValidations.concat(validateUniqueEmail);
const registerMiddlewares = validateBody(registerValidations);
// authRouter.post('/register', registerMiddlewares, registerUser); asi estaba originalmente

authRouter.post('/register', registerUser);

export default authRouter;
