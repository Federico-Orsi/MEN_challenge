import cookieParser from 'cookie-parser';
import cors from 'cors';
// import { } from 'dotenv/config';
import express from 'express';
import expressOasGenerator from 'express-oas-generator';
import mongoose from 'mongoose';
import logger from 'morgan';
import path from 'path';
import ENVIRONMENTS from './constants/environments.js';
import TAGS from './constants/tags.js';
import errorHandler from './middlewares/common/errorHandler.js';
import apiRouter from './router.js';
import indexRouter from './routes/index.js';

const { TEST, DEVELOPMENT, PRODUCTION } = ENVIRONMENTS;
const { SPEC_OUTPUT_FILE_BEHAVIOR } = expressOasGenerator;

const server = express();

const mongooseModels = mongoose.modelNames();

const specOutputFileBehaviorOptions = {
  [TEST]: SPEC_OUTPUT_FILE_BEHAVIOR.RECREATE,
  [DEVELOPMENT]: SPEC_OUTPUT_FILE_BEHAVIOR.PRESERVE,
  [PRODUCTION]: SPEC_OUTPUT_FILE_BEHAVIOR.PRESERVE,
};

expressOasGenerator.handleResponses(server, {
  specOutputPath: './api_docs.json',
  mongooseModels,
  tags: mongooseModels.concat(TAGS),
  specOutputFileBehavior:
    specOutputFileBehaviorOptions[process.env.NODE_ENV || DEVELOPMENT],
  ignoredNodeEnvironments: [DEVELOPMENT, PRODUCTION],
  alwaysServeDocs: true,
});


server.use(logger('dev'));
server.use(cors());

server.use(express.json());
server.use(express.urlencoded({ extended: true }));
server.use(errorHandler);
server.use(cookieParser());
server.use(express.static(path.join(process.cwd(), 'public')));

server.use('/', indexRouter);
server.use('/api', apiRouter);

server.use(errorHandler);
expressOasGenerator.handleRequests();

export default server;
