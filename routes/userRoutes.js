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
        message:"Updated with succesfuly",
        account: user
    })  
  } catch (error) {
    console.log(error);
    res.status(501).json({
      message: "Internal servar error",
    });
  }
});

module.exports = router;
