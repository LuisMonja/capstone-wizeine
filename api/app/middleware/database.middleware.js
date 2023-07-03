import { connect } from 'mongoose';

/**
 * Database connection middleware
 * @param {import('express').Request} req Request Object
 * @param {import('express').Response} res Response Object
 * @param {import('express').NextFunction} next Callback function
 */
export const dbConnection = async (req, res, next) => {
  try {
    await connect(req.config.dbConnectionSting);
    next();
  } catch (err) {
    next(err);
  }
};
