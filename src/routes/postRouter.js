import express from 'express';
import { isAuthorized } from '../middlewares/common/isAuthorized.js';

import { postsBySingleAuthor } from '../controllers/singleAuthor.js';
import middle from '../middlewares/mine/middle.js';
import createPost from '../middlewares/post/createPost.js';
import findAllPosts from '../middlewares/post/findAllPosts.js';
import findPostById from '../middlewares/post/findPostById.js';
import validateAuthorExists from '../middlewares/post/validations/validateAuthorExists.js';
import validateBody from '../middlewares/post/validations/validateBody.js';
import validateId from '../middlewares/post/validations/validateId.js';
import validateTitle from '../middlewares/post/validations/validateTitle.js';

// const {
//   validateTitle,
//   validateBody: validatePostBody,
//   validateAuthorExists,
//   validateId,
// } = postValidations;

// const {validateBody: validatePostBody} = validateBody // esta línea la agregué yo (ver)

let validatePostBody

const postRouter = express.Router();

const createPostValidations = [
  validateTitle,
  validatePostBody,
  validateAuthorExists,
];

// const createPostMiddleware = validateBody(createPostValidations);

postRouter.post('/', middle, isAuthorized, validateBody, createPost);

postRouter.get('/', isAuthorized ,findAllPosts); //en este endPoint agregué el filtrado por keyword!!

postRouter.get('/:authorId', isAuthorized , postsBySingleAuthor);


postRouter.post('/addComments/:postId/:commentAuthor', isAuthorized, validateId, findPostById);

export default postRouter;
