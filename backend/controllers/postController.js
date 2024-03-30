const Posts = require("../models/postModel");
const Comments = require("../models/commentModel");
const Users = require("../models/userModel");
const { fileUploadToCloudinary } = require("../utils/fileUploader");

// @desc    Create post
exports.createPost = async (req, res) => {
  const { userId } = req.body.user;
  const { description } = req.body;
  const { image } = req.files;

  try {
    if (!description) {
      return res.status(401).json({
        success: false,
        message: "Description field is empty",
      });
    }
    const user = await Users.findById(userId);

    const getImageUrl = await fileUploadToCloudinary(image, process.env.FOLDER_NAME);
    // const getVideoUrl = await fileUploadToCloudinary(video, process.env.FOLDER_NAME);
    // console.log("video-url", uploadDetails.secure_url);

     const newPost = await Posts.create({
       userId,
       description,
       image:getImageUrl?getImageUrl.secure_url:"" ,
       author: user.username,
     });

    await Users.findByIdAndUpdate(
      { _id: userId },
      {
        $push: { user_posts: newPost._id },
      },
      { new: true }
    );

    res.status(200).json({
      success: true,
      message: "Post created successfully",
      post: newPost,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// @desc  edit post
exports.editPost = async (req, res) => {
  // console.log("edit post", req.body, req.params);
  const { description, image, video } = req.body;
  const { postId } = req.params;

  try {
    if (!description) {
      return res.status(402).json({
        success: false,
        message: "Description required!",
      });
    }

    const post = await Posts.findById(postId);

    if (!post) {
      return res.status(402).json({
        success: false,
        message: "post not found",
      });
    }

    if (description) post.description = description;
    if (image) post.image = image;

    await post.save();

     return res.json({
       success: true,
       message: "Post updated successfully",
       post,
     });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

// @desc  delete post
exports.deletePost = async (req, res) => {
  try {
    const { id } = req.params;

    const post = await Posts.findByIdAndDelete(id);

    if (!post) {
      return res
        .status(404)
        .json({ success: false, message: "Post not found" });
    }

    res.status(200).json({
      success: true,
      message: "Deleted successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(404).json({ success: false, message: error.message });
  }
};

// @desc  get all posts
exports.getPosts = async (req, res) => {
  const { userId } = req.body.user;
  // const { search } = req.body;
  try {
    // const user = await Users.findById(userId);
    const posts = await Posts.find()
      .populate({
        path: "userId",
        select: "username email location profileUrl -password",
      })
      .sort({ _id: -1 });

    if (!posts) {
      return res.status(403).json({
        success: false,
        message: "No posts found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Here are all posts!",
      data: posts,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};


// @desc   get comments
exports.getComments = async (req, res) => {
  const { postId } = req.params;
  try {
    const postComments = await Comments.find({ postId })
      .populate({
        path: "userId",
        select: "firstName lastName username location profileUrl -password",
      })
      .populate({
        path: "replies.userId",
        select: "firstName lastName username location profileUrl -password",
      })
      .sort({ _id: -1 });

    res.status(200).json({
      sucess: true,
      message: "successfully",
      data: postComments,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc  like post
exports.likePost = async (req, res) => {
  const { userId } = req.body.user;
  const { id } = req.params;
  // console.log("userId and id",userId, id);
  try {
    let message = "";
    const post = await Posts.findById({ _id: id });
    // console.log("post",post);

    const index = post.likes.findIndex((pid) => pid === String(userId));

    if (index === -1) {
      post.likes.push(userId);
      message = "Post Liked!";
    } else {
      post.likes = post.likes.filter((pid) => pid !== String(userId));
      message = "Post Unliked!";
    }

    const newPost = await Posts.findByIdAndUpdate(id, post, {
      new: true,
    });

    res.status(200).json({
      success: true,
      message: message,
      data: newPost,
    });
  } catch (error) {
    console.log(error);
    res.status(404).json({ success: false, message: error.message });
  }
};

// @desc   comment on post
exports.commentPost = async (req, res) => {
  const { comment, from } = req.body;
  const { userId } = req.body.user;
  const { id } = req.params;
  // console.log(comment, from, userId, id);

  try {
    if (!comment) {
      return res.status(404).json({
        success: false,
        message: "Comment is required.",
      });
    }
    const newComment = await Comments.create({
      comment,
      from,
      userId,
      postId: id,
    });
    // await newComment.save();
    if (!newComment) {
      return (
        res.status(401),
        json({
          success: false,
          message: "Failed to add the comment",
        })
      );
    }

    // console.log("new comment",newComment);

    //updating the post with the comments id
    const post = await Posts.findById(id);

    post.comments.push(newComment._id);

    const updatedPost = await Posts.findByIdAndUpdate(id, post, {
      new: true,
    });

    res.status(200).json({
      success: true,
      message: "Comment added successfully!",
      data: updatedPost,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: error.message });
  }
};
