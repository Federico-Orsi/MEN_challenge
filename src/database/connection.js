import mongoose from 'mongoose';
import { MONGO_DATABASE, MONGO_HOST, MONGO_PASSWORD, MONGO_PORT, MONGO_USERNAME } from '../../config.js';
import ENVIRONMENTS from '../constants/environments.js';
import logger from '../utils/logger.js';
import seedDatabase from './seeds/index.js';



const connectToDatabase = async () => {
  try {
    // const {
    //   MONGO_USERNAME,
    //   MONGO_PASSWORD,
    //   MONGO_HOST,
    //   MONGO_PORT,
    //   MONGO_DATABASE,
    // } = process.env;

    const mongoOptions = {
      useCreateIndex: true,
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 1000,
    };

    const withCredentials = MONGO_USERNAME && MONGO_PASSWORD;

    const mongoCredentials = withCredentials && {
      user: MONGO_USERNAME,
      pass: MONGO_PASSWORD,
    };

    await mongoose.connect(
      `mongodb://${MONGO_HOST}:${MONGO_PORT}/${MONGO_DATABASE}`
      // { ...mongoCredentials, ...mongoOptions },
    );


    if (process.env.NODE_ENV !== ENVIRONMENTS.TEST) {
      seedDatabase();
    }
  } catch (error) {
    logger.error(error);
  }
};

export default { connectToDatabase, seedDatabase };
