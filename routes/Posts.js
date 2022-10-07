const express = require("express");
const Post = require("../models/Stories");
const Likes = require("../models/Likes");
const fetchuser = require("../middleware/fetchuser");
const router = express.Router();
const { body, validationResult } = require("express-validator");

//**||**\\Route 1 : Get all the post : GET "api/posts/fetchallposts" , login required
router.get("/fetchallpost", fetchuser, async (req, res) => {
  try {
    const posts = await Post.find({ username: req.user.id });
    res.json(posts);
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Some Error occured");
  }
});

//**||**\\Route 2 : add a new post : POST "api/posts/addpost" , login required
router.post(
  "/addpost",
  fetchuser,
  [
    body("title", "Enter a valid title").isLength({ min: 3 }),
    body("description", "decription must be atleast 5 ").isLength({ min: 5 }),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      const { title, description, tag } = req.body;
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.arrey() });
      }
      const post = new Post({
        title,
        description,
        tag,
        username: req.user.id,
      });
      const savePost = await post.save();
      res.json(savePost);
    } catch (error) {
      console.log(error.message);
      res.status(500).send("some error occurred");
    }
  }
);
//**||**\\Route 3: delete a existing post : DELETE "/api/posts/deletepost",Login required
router.delete("/deletepost/:id", fetchuser, async (req, res) => {
  try {
    //Find the post to be deleted
    let post = await Post.findById(req.params.id);
    if (!post) {
      res.status(404).send("not found");
    }
    //allow deletion if the user is
    if (post.username.toString() !== req.user.id) {
      return res.status(401).send("not allowed");
    }
    post = await Post.findByIdAndDelete(req.params.id);
    let likes = await Likes.find({post:req.params.id});
    for (let index = 0; index < likes.length; index++) {
      const element = await Likes.findByIdAndDelete(likes[index].id);
    }
    res.json({ Success: "note has been deleted ", post: post });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Some Error occured");
  }
});
module.exports = router;
