const router = require("express").Router();
const User = require("../module/Users");
const Post = require("../module/Post");
const { updatePost } = require("../core/serviceServer");
const { v4: uuid } = require("uuid");
const Message = require("../module/Messages");

router.get("/getFollowUpsPosts/:userId", async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    const FollowUpPosts = await Post.find({
      userId: { $in: user.follow_ups },
    });

    res.status(200).json({
      message: "There is your posts",
      posts: FollowUpPosts,
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal server error, contact us",
    });
  }
});

router.patch("/like", async (req, res) => {
  const { postId, userId } = req.query;

  try {
    const post = await Post.findById(postId);

    if (!post) {
      return res.status(404).json({
        message: "You are not loged in",
      });
    }

    if (post.userId === userId) {
      return res.status(403).json({
        message: "You can not put likes on your posts",
      });
    }

    if (post.likes.includes(userId)) {
      await post.updateOne(
        {
          $pull: { likes: userId },
        },
        {
          new: true,
        }
      );

      return res.status(200).json({
        like: false,
        userId,
      });
    } else {
      await post.updateOne(
        {
          $push: { likes: userId },
        },
        {
          new: true,
        }
      );

      return res.status(200).json({
        like: true,
        userId,
      });
    }
  } catch (error) {
    res.status(500).json({
      message: "Internal server error, contact us",
    });
  }
});

const idealMessage = [
  {
    _id: "a",
    message: "",
    postId: "",
    providerId: "",
    replays: [
      {
        _id: "b",
        providerId: "",
        message: "",
        commentId: "a",
      },
      {
        _id: "c",
        providerId: "",
        message: "",
        commentId: "b",
      },
    ],
  },
];
router.post("/createComment", async (req, res) => {
  const { postId, providerId, message, commentReplay } = req.body;
  try {
    const post = await Post.findById(postId);

    if (!post) {
      return res.status(404).json({
        message: "Post not found",
      });
    }

    if (!commentReplay) {
      const comment = new Message({
        postId,
        message,
        providerId,
      });
      await comment.save();
    } else {
      const comment = await Message.findById(commentReplay.commentId);

      if (!comment) {
        return res.status(404).json({
          message: "The comment no longer exists",
        });
      }

      await comment.updateOne({
        $push: {
          replays: {
            _id: uuid(),
            providerId,
            message,
            commentReplay,
          },
        },
      });
    }
    const comments = await Message.find({ postId });

    res.status(201).json({
      message: "The comment was added",
      comments,
    });
  } catch (error) {
    console.log("error", error);
    res.status(500).json({ message: "Internal server error, contact us" });
  }
});

router.put("/editComment", async (req, res) => {});
router.delete("/deleteComment", async (req, res) => {});

router.get("/postComments/:postId", async (req, res) => {
  try {
    const postComment = await Message.find({ postId: req.params.postId });
    res.status(200).json({
      postComment,
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal server error, contact us",
    });
  }
});

router.get("/getUserPosts/:UserId", async (req, res) => {
  try {
    const posts = await Post.find({ userId: req.params.UserId });
    res.status(200).json({
      message: "There is your posts",
      posts,
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal server error, contact us",
    });
  }
});

router.post("/createPost/:UserId", async (req, res) => {
  const { location, imageUrl, description } = req.body;
  try {
    const user = await User.findOne({ _id: req.params.UserId });
    if (!user) {
      return res.status(404).json("To create a post you need to be login");
    }
    const newPost = new Post({
      imageUrl,
      location,
      description,
      userId: req.params.UserId,
    });

    await newPost.save();
    res.status(201).json({
      message: "Post created successfully",
      post: newPost,
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
    });
  }
});

router.patch("/updatePost/:UserId", async (req, res) => {
  const { location, imageUrl, description, _id: PostId } = req.body;
  try {
    const user = await User.findOne({ _id: req.params.UserId });
    if (!user) {
      return res.status(404).json({
        message: "You cant edit this post",
      });
    }

    const post = await Post.findOne({ _id: PostId });
    if (!post) {
      return res.status(404).json({
        message: "This post doesn't exist anymore",
      });
    }

    updatePost(imageUrl, location, description, post)
      .then(async (post) => {
        await post.save();

        res.status(201).json({
          message: "The post was edited",
          post,
        });
      })
      .catch((error) => {
        res.status(400).json({
          message: error.message,
        });
      });
  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
      error,
    });
  }
});

router.delete("/deletePost/:PostId", async (req, res) => {
  try {
    const deletedPost = await Post.findOneAndRemove({ _id: req.params.PostId });
    if (deletedPost) {
      return res.status(200).json({
        message: "The post was deleted",
      });
    } else {
      return res.status(404).json({
        message: "This post does not exist anymore",
      });
    }
  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
      error,
    });
  }
});

module.exports = router;
