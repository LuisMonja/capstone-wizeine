/* eslint-disable no-unused-vars */
import { constants } from 'http2';

/**
 * Log Error middleware
 * @param {Error} err Error object
 * @param {import('express').Request} req Request Object
 * @param {import('express').Response} res Response Object
 * @param {import('express').NextFunction} next Callback function
 */
export const logError = (err, req, res, next) => {
  console.log(err.message);
  next(err);
};

/**
 * Handle Error middleware
 * @param {Error} err Error object
 * @param {Request} req Request Object
 * @param {Response} res Response Object
 * @param {import('express').NextFunction} next Callback function
 */
export const handleError = (err, req, res, next) => {
  res
    .status(err.status || constants.HTTP_STATUS_INTERNAL_SERVER_ERROR)
    .json({ error: err.message });
};
