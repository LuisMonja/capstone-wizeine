import { constants } from "http2";
import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";
/**
 * Validations sgnup middleware
 * @param {import('express').Request} req Request Object
 * @param {import('express').Response} res Response Object
 * @param {import('express').NextFunction} next Callback function
 */
export const mdlSignup = (req, res, next) => {
  const { username, password, email } = req.body;
  if (!username || !password || !email) {
    return res
      .status(constants.HTTP_STATUS_BAD_REQUEST)
      .json({ message: "missing required parameters" });
  }
  const users = User.find({ $or: [{ username }, { email }] });
  if (users.length) {
    return res
      .status(constants.HTTP_STATUS_CONFLICT)
      .json({ message: "ser and/or email already registered" });
  }
  next();
};

export const mdlAuthenticated = (req, res, next) => {
  try {
    const authHeader = req.headers['authorization'];
    const token = authHeader.substr(7);
    req.user = jwt.decode(token);
    next();
  } catch (error) {
    res
      .status(constants.HTTP_STATUS_BAD_REQUEST)
      .json({ message: "Invalid auhtorization" });
  }
};
