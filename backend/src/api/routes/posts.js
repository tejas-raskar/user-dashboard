const express = require("express");
const { protect } = require("../middleware");
const { postInput } = require("../../types/zodTypes");
const Post = require("../models/post");
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const posts = await Post.find({}).populate("author", "name");
    return res.status(200).json({ posts });
  } catch (e) {
    return res.status(500).json({ msg: "Server error while fetching posts." });
  }
});

router.get("/myposts", protect, async (req, res) => {
  try {
    const posts = await Post.find({ author: req.user._id });
    return res.status(200).json({ posts });
  } catch (e) {
    return res.status(500).json({ msg: "Server error while fetching posts." });
  }
});

router.get("/:id", async (req, res) => {
  const postId = req.params.id;
  try {
    const post = await Post.findById(postId).populate("author", "name");
    if (!post) {
      return res.status(404).json({ msg: "Post not found." });
    }
    return res.status(200).json({ post });
  } catch (e) {
    return res.status(500).json({ msg: "Server error while fetching posts." });
  }
});

router.post("/", protect, async (req, res) => {
  const body = req.body;
  const { success } = postInput.safeParse(body);
  if (!success) {
    return res
      .status(400)
      .json({ msg: "Incorrect inputs. Title and Content cannot be empty." });
  }

  try {
    const post = new Post({
      title: body.title,
      content: body.content,
      author: req.user._id,
    });
    const createdPost = await post.save();
    res.status(201).json({
      msg: "Post created successfully",
      createdPost,
    });
  } catch (error) {
    res.status(500).json({ msg: "Server error while creating post" });
  }
});

router.put("/:id", protect, async (req, res) => {
  const postId = req.params.id;
  const body = req.body;
  try {
    const post = await Post.findById(postId);

    if (!post) {
      return res.status(404).json({ msg: "Post not found." });
    }

    if (post.author.toString() !== req.user._id.toString()) {
      return res
        .status(403)
        .json({ msg: "Not authorized to update this post." });
    }

    const { success } = postInput.safeParse(body);
    if (!success) {
      return res.status(400).json({ msg: "Incorrect inputs." });
    }

    post.title = body.title;
    post.content = body.content;
    const updatedPost = await post.save();
    return res.status(200).json({
      msg: "Post updated successfully",
      updatedPost,
    });
  } catch (e) {
    return res
      .status(500)
      .json({ msg: "Server error while updating the post" });
  }
});

router.delete("/:id", protect, async (req, res) => {
  const postId = req.params.id;
  try {
    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({ msg: "Post not found." });
    }

    if (post.author.toString() !== req.user._id.toString()) {
      return res
        .status(403)
        .json({ msg: "Not authorized to delete this post." });
    }
    await Post.findByIdAndDelete(postId);
    return res.status(200).json({
      msg: "Post deleted successfully",
    });
  } catch (e) {
    return res
      .status(500)
      .json({ msg: "Server error while deleting the post" });
  }
});

module.exports = router;
