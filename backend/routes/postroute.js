const express = require('express');
const router = express.Router();
const upload = require('../Middleware/Uploads');
const Post = require("../models/Post");

// POST route to create a post
router.post('/', upload.single('file'), async (req, res) => {
  try {
    const { heading, newscontent, category } = req.body;
    const filePath = req.file?.filename || "";

    const newPost = new Post({
      heading,
      newscontent,
      category,
     filePath,
    });

    await newPost.save();
    res.status(201).json({ message: "Post created", post: newPost });
  } catch (error) {
    console.error("Post creation error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// ✅ GET route to fetch all posts
router.get('/', async (req, res) => {
  try {
    const posts = await Post.find();
    res.json(posts);
  } catch (err) {
    console.error("Error fetching posts:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;