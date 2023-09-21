import winston from 'winston';
import { LOGGER_ERROR_FILE, LOGGER_FILE } from '../../config.js';

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({
      filename: LOGGER_ERROR_FILE,
      level: 'error',
    }),
    new winston.transports.File({ filename: LOGGER_FILE }),
  ],
});

export default logger;
