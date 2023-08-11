import mongoose from "mongoose";
import { users } from "../demoData/Data.js";
import User from "../models/userModel.js";
import Post from "../models/postModel.js";
import { posts } from "../demoData/Data.js";

const dbConnect = async () => {
  try {
    const conn = await mongoose.connect(process.env.DATABASE_URI);
    //User.insertMany(users);
    //Post.insertMany(posts);

    console.log(`MongoDB Connected to ${conn.connection.host} ,biatch!`);
  } catch (error) {
    console.log(`${error.message}`);
    process.exit(1);
  }
};

export default dbConnect;
