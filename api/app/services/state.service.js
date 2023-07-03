import { compareSync, hashSync } from "bcrypt";
import { constants } from "http2";
import jwt from "jsonwebtoken";

import { User } from "../models/index.js";

export const StateService = {
  /**
   * Set cookie service
   * @param {import('express').Request} req Response body
   * @param {import('express').Response} res Response body
   */
  getToken: async (req, res) => {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user || !compareSync( password, user.password )) {
      res
        .status(constants.HTTP_STATUS_BAD_REQUEST)
        .json({ message: "Invalid user or password" });
    }
    return jwt.sign({ username }, req.config.jwtSecret, {
      expiresIn: req.config.jwtExpires,
    });
  },
  /**
   * Set cookie service
   * @param {import('express').Request} req Response body
   */
  signup: async (req) => {
    const { username, password, email } = req.body;
    const passwordHash = hashSync(password, 10);
    const user = new User({ username, email, password: passwordHash });
    await user.save();
  },
};
