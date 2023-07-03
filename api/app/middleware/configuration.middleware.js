import { defaultConfig } from '../providers/index.js';

/**
 * Configuration middleware
 * @param {import('express').Request} req Request Object
 * @param {import('express').Response} res Response Object
 * @param {import('express').NextFunction} next Callback function
 */
export const configuration = (req, res, next) => {
  req.config = defaultConfig;
  next();
};
