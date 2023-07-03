import express from "express";
import { PostsController } from "../controller/index.js";
import { mdlAuthenticated } from "../middleware/index.js";

/**
 * Route definitions of the State page
 * @param {express.Express} app Instance of an Express application.
 */
export const PostsRoute = (app) => {
  const router = express.Router();
  app.use("/posts", router);
  router.get("/", PostsController.getPosts);
  router.post("/", mdlAuthenticated, PostsController.publishPost);
  router.get("/:postId", PostsController.getPost);
};
