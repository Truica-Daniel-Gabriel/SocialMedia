const router = require("express").Router();
const User = require("../module/Users");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

router.post("/login", async (req, res) => {
  const jwtSecret = process.env.JWTSECRET;
  const { email, password } = req.body;

  try {
    if (password && email) {
      const user = await User.findOne({ email: email });
      if (!user) {
        return res.status(404).json({ message: "Invalid credentials" });
      }

      const validPassword = await bcrypt.compare(password, user.password);

      if (!validPassword) {
        return res.status(404).json({ message: "Invalid credentials" });
      }
      const token = jwt.sign(
        {
          firstName: user.firstName,
          lastName: user.lastName,
          id: user._id,
          city: user.city,
          birthday: user.age,
          profilePicture: user.profilePicture,
          friends: user.friends,
          isAdmin: user.isAdmin,
        },
        jwtSecret
      );
      res.status(200).json({
        message: "You have successfully logged in!",
        account: {
          firstName: user.firstName,
          lastName: user.lastName,
          _id: user._id,
          city: user?.city,
          birthday: user.age,
          email: user.email,
          profilePicture: user.profilePicture,
          followers: user.followers,
          follow_ups: user.follow_ups,
          posts: user.posts,
          isAdmin: user.isAdmin,
        },
        jwtToken: token,
      });
    } else {
      return res.status(501).json({
        message: "Contact us",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Internal server error",
      error,
    });
  }
});

router.post("/register", async (req, res) => {
  const { email, password, firstName, lastName, birthday, city } = req.body;

  try {
    const userFind = await User.findOne({ email: email });
    if (userFind) {
      return res.status(409).json({ message: "This email already exist!" });
    }

    const salt = await bcrypt.genSalt(parseInt(process.env.SALT));
    const newPassword = await bcrypt.hash(password, salt);

    const Newuser = new User({
      firstName,
      lastName,
      city,
      birthday,
      email,
      password: newPassword,
    });

    await Newuser.save();
    res.status(200).json({
      message: "User created successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: "Bad request",
      error,
    });
    console.log(error);
  }
});
module.exports = router;
