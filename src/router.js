import express from 'express';

import authRouter from './routes/authRouter.js';
import docsRouter from './routes/docsRouter.js';
import postRouter from './routes/postRouter.js';
import translationRouter from './routes/translationRouter.js';
import userRouter from './routes/userRouter.js';

const router = express.Router();

router.use('/auth', authRouter);
router.use('/users', userRouter);
router.use('/posts', postRouter);
router.use('/translations', translationRouter);
router.use('/new/docs', docsRouter);


export default router;
