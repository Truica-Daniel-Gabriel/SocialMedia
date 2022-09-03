const router = require("express").Router();
const User = require("../module/Users");

router.patch("/editAccountImage/:id", async (req, res) => {
  try {
    const user = await User.findOneAndUpdate(
      { _id: req.params.id },
      { profilePicture: req.body.profilePicture },
      {
        new: true,
      }
    );
    !user &&
      res.status(404).json({
        message: "Wrong",
      });

    res.status(201).json({
      message: "Updated with succesfuly",
      account: user,
    });
  } catch (error) {
    console.log(error);
    res.status(501).json({
      message: "Internal server error, contact us",
    });
  }
});

router.get("/profilePost/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({
        message: "This user dont exist anymore",
      });
    }
    res.status(200).json({
      message: "Succesfuly",
      user: {
        _id: user._id,
        profilePicture: user.profilePicture,
        firstName: user.firstName,
        lastName: user.lastName,
      },
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal server error, contact us",
    });
  }
});

router.get("/getUser/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }
    res.status(200).json({
      user,
      message: "Succes",
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal server error, contact us",
    });
  }
});

router.patch("/follow", async (req, res) => {
  const { friendId, userId } = req.query;

  try {
    const user = await User.findById(userId);
    const friend = await User.findById(friendId);

    if (!user.follow_ups.includes(friendId)) {
      await user.updateOne(
        { $push: { follow_ups: friendId } },
        {
          new: true,
        }
      );

      await friend.updateOne(
        { $push: { followers: userId } },
        {
          new: true,
        }
      );

      return res
        .status(201)
        .json({
          message: `You are now following ${friend.firstName}`,
          follow: true,
        });
    } else {
      await user.updateOne(
        { $pull: { follow_ups: friendId } },
        {
          new: true,
        }
      );

      await friend.updateOne(
        { $pull: { followers: userId } },
        {
          new: true,
        }
      );

      return res
        .status(200)
        .json({
          message: `You are no longer following ${friend.firstName}`,
          follow: false,
        });
    }
  } catch (error) {
    res.status(500).json({
      message: "Internal server error, contact us",
    });
  }
});

router.post("/getSepcificUsers", async (req, res) => {
  try {
    const users = await User.find({
      _id: { $in: req.body.users },
    });
    if(!users){
     return  res.status(404).json({
        message: "Users not found"
      })
    }
    res.status(200).json({
      message:"Succesfuly",
      users
    })
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Internal server error, contact us",
    });
  }
});

router.get("/getAllUsers/:ownerId", async (req, res) => {
  try {
    const users = await User.find({
      _id: { $nin: req.params.ownerId },
    }).select({
      firstName: 1,
      lastName: 1,
      profilePicture: 1,
    });
    res.status(200).json({
      users,
      message: "Success",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Internal server error, contact us",
    });
  }
});

module.exports = router;
