import { constants } from 'http2';
import { PostsService } from '../services/index.js';

export const PostsController = {
  /** Get handler for set cookie
   *
   * @param {import('express').Request} req Request body
   * @param {import('express').Response} res Response body
   * @param {import('express').NextFunction} next Next function
   */
  getPost: async (req, res, next) => {
    try {
      const post = await PostsService.getPost(req);
      res.status(constants.HTTP_STATUS_OK).json(post);
    } catch (err) {
      next(err);
    }
  },
  getPosts: async (req, res, next) => {
    try {
      const post = await PostsService.getPosts(req);
      res.status(constants.HTTP_STATUS_OK).json(post);
    } catch (err) {
      next(err);
    }
  },
  publishPost: async (req, res, next) => {
    try {
      const post = await PostsService.publishPost(req);
      res.status(constants.HTTP_STATUS_OK).json({id: post});
    } catch (err) {
      next(err);
    }
  },
};
