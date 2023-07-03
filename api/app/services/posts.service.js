import { constants } from "http2";
import { Post } from "../models/index.js";

export const PostsService = {
  /**
   * Set cookie service
   * @param {import('express').Request} req Response body
   * * @param {import('express').Response} res Response body
   */
  getPost: async (req, res) => {
    const { postId } = req.params;
    const post = await Post.findById(postId);
    if (!post) {
      res
        .status(constants.HTTP_STATUS_NOT_FOUND)
        .json({ message: "Post not found" });
    }
    return post;
  },

  getPosts: async (req) => {
    let { page, itemsPerPage } = req.query;
    page = page ?? 0;
    itemsPerPage = itemsPerPage ?? 16;
    const posts = await Post.find()
      .skip(page * itemsPerPage)
      .limit(itemsPerPage);
    posts.forEach( p => {
      p.images = [p.images[0]];
      p.body = p.body.substr(0,100)
    })
    return posts;
  },

  publishPost: async (req) => {
    const { title, body, images } = req.body;
    const { username } = req.user;
    const post = new Post({ username, title, body, images });
    const result = await post.save();
    const id = result._id.toHexString();
    req.io.emit('AddedPost');
    return id;
  },
};
