const router = require("express").Router();
const User = require("../module/Users");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

router.post("/login", async (req, res) => {
  const jwtSecret = process.env.JWTSECRET;
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email: email });
    !user && res.status(404).json("User not found");
    if (user.email !== email) {
      return res.status(404).json("Wrong credential");
    }
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(400).json("Wrong password");
    }
    const token = jwt.sign(
      {
        name: user.name,
        id: user._id,
        profilePicture: user.profilePicture,
        friends: user.friends,
        isAdmin: user.isAdmin,
      },
      jwtSecret
    );
    res.status(200).json({
      account: {
        name: user.name,
        id: user._id,
        profilePicture: user.profilePicture,
        friends: user.friends,
        isAdmin: user.isAdmin,
      },
      jwtToken: token,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post("/register", async (req, res) => {
  const { email, password, name } = req.body;

  try {
    const userFind = User.findOne({ email: email });
    userFind && res.status(409).json({ message: "This email already exist!" });
    //generate new passwords
    const salt = await bcrypt.genSalt(parseInt(process.env.SALT));
    const newPassword = await bcrypt.hash(password, salt);

    //Create new User
    const Newuser = new User({
      name: name,
      email: email,
      password: newPassword,
    });
    const user = await Newuser.save();
    res.status(200).json({
      message: "User created successfully",
      account: {
        name: user.name,
        id: user._id,
        profilePicture: user.profilePicture,
        friends: user.firends,
        posts: user.posts,
        isAdmin: user.isAdmin,
        rating: user.rating,
      },
    });
  } catch (error) {
    res.status(500).json("Bad request");
    console.log(error);
  }
});
module.exports = router;
