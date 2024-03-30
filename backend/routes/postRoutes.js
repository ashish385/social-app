
const express = require("express");
const userAuth = require("../middleware/authMiddleware");
const { createPost, getPost, getPosts, likePost, getComments, commentPost, deletePost, editPost } = require("../controllers/postController");

const postRouter = express.Router();

postRouter.post("/create-post", userAuth, createPost);
postRouter.put("/edit-post/:postId", userAuth, editPost);
postRouter.post("/get-all-post", userAuth, getPosts);

// get comments
postRouter.get("/comments/:postId", getComments);

// like and comments
postRouter.post("/like/:id", userAuth, likePost);
postRouter.post("/comments/:id", userAuth, commentPost);

// delete post
postRouter.delete("/delete/:id", userAuth, deletePost);

module.exports = postRouter;
