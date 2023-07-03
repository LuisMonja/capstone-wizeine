import express from 'express';
import { StateController } from '../controller/index.js';
import { mdlSignup } from '../middleware/index.js'

/**
 * Route definitions of the State page
 * @param {express.Express} app Instance of an Express application.
 */
export const StatesRoute = (app) => {
  const router = express.Router();
  app.use('/states', router);
  router.post('/token', StateController.getToken);
  router.post('/signup', mdlSignup, StateController.signup);
};
