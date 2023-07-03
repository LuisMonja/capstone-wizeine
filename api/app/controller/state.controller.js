import { constants } from "http2";
import { StateService } from "../services/index.js";

export const StateController = {
  /** Get handler for set cookie
   *
   * @param {import('express').Request} req Request body
   * @param {import('express').Response} res Response body
   * @param {import('express').NextFunction} next Next function
   */
  getToken: async (req, res, next) => {
    try {
      const token = await StateService.getToken(req, res);
      const message = {
        token,
      };
      res.status(constants.HTTP_STATUS_OK).json(message);
    } catch (err) {
      next(err);
    }
  },
  /** Get handler for set cookie
   *
   * @param {import('express').Request} req Request body
   * @param {import('express').Response} res Response body
   * @param {import('express').NextFunction} next Next function
   */
  signup: async (req, res, next) => {
    try {
      const token = await StateService.signup(req, res);
      const message = {
        token,
      };
      res.status(constants.HTTP_STATUS_OK).json(message);
    } catch (err) {
      next(err);
    }
  },
};
