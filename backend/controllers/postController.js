import Post from "../models/postModel.js";
import User from "../models/userModel.js";
import generateToken from "../utils/generateToken.js";

/* CREATE */
export const createPost = async (req, res) => {
  try {
    const { userId, description, picturePath } = req.body;
    const user = await User.findById(userId);
    const newPost = new Post({
      userId,
      name: user.name,

      description,
      userPicturePath: user.picturePath,
      picturePath,
      likes: {},
      comments: [],
    });
    if (user) {
      generateToken(res, user._id);

      await newPost.save();

      const post = await Post.find();

      res.status(201).json(post);
    }
  } catch (err) {
    res.status(409).json({ message: err.message });
  }
};
//Update
export const editPost = async (req, res) => {
  try {
    const { postId, description, picturePath } = req.body;

    const post = await Post.findById(postId);

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    post.description = description;
    post.picturePath = picturePath;

    await post.save();

    const posts = await Post.find();
    res.status(200).json(posts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

//Delete

export const deletePost = async (req, res) => {
  const postId = req.body._id;

  try {
    const deletedPost = await Post.findByIdAndDelete(postId);

    if (!deletedPost) {
      return res.status(404).json({ message: "Post not found" });
    }

    return res.status(200).json({ message: "Post deleted successfully" });
  } catch (error) {
    return res
      .status(500)
      .json({ error: "An error occurred while deleting the user" });
  }
};

/* READ */
export const getFeedPosts = async (req, res) => {
  try {
    const post = await Post.find();
    if (post) {
      generateToken(res, post.userId);
      res.status(200).json(post);
    }
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

// Get a single post by its ID
export const getPostById = async (req, res) => {
  try {
    const postId = req.params.id; // Assuming you're passing the post ID as a parameter in the route

    const post = await Post.findById(postId);

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    res.status(200).json(post);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getUserPosts = async (req, res) => {
  try {
    const { userId } = req.params;
    const post = await Post.find({ userId });
    res.status(200).json(post);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

/* UPDATE */

export const likePost = async (req, res) => {
  try {
    const { id } = req.params;
    const { userId } = req.body;
    const post = await Post.findById(id);
    const isLiked = post.likes.get(userId);

    if (isLiked) {
      post.likes.delete(userId);
    } else {
      post.likes.set(userId, true);
    }

    const updatedPost = await Post.findByIdAndUpdate(
      id,
      { likes: post.likes },
      { new: true }
    );

    res.status(200).json(updatedPost);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

export const createComment = async (req, res) => {
  try {
    const { postId } = req.params;
    const { text, userId } = req.body;

    const post = await Post.findById(postId);
    const user = await User.findById(userId);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    const newComment = {
      userId,
      text,
      username: user.name,
    };

    post.comments.push(newComment);
    await post.save();

    return res.status(201).json({ post });
  } catch (error) {
    return res.status(500).json({ message: "Error creating comment", error });
  }
};

// Update comment
export const commentPost = async (req, res) => {
  try {
    const { postId, commentId } = req.params;
    const { newText } = req.body;

    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    const comment = post.comments.id(commentId);
    if (!comment) {
      return res.status(404).json({ message: "Comment not found" });
    }

    comment.text = newText;
    await post.save();

    return res.status(200).json({ post });
  } catch (error) {
    return res.status(500).json({ message: "Error updating comment", error });
  }
};
