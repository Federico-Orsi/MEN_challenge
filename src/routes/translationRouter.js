import express from 'express';

import { isAuthorized } from '../middlewares/common/isAuthorized.js';
import runValidations from '../middlewares/common/validations/validateBody.js';
import getTranslationsByLang from '../middlewares/translation/getTranslations.js';
import validateLanguage from '../middlewares/translation/validations/validateLanguage.js';

const translationRouter = express.Router();

translationRouter.get(
  '/:lang',
  isAuthorized,
  runValidations([validateLanguage]),
  getTranslationsByLang,
);

export default translationRouter;
