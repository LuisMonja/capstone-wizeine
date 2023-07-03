import mongoose from 'mongoose';

const PostSchema = new mongoose.Schema({
  username: { type: String, required: true },
  title: { type: String, required: true },
  body: { type: String, required: true },
  images: { type: Array, required: false } 
});

export const Post = mongoose.model('Posts', PostSchema);