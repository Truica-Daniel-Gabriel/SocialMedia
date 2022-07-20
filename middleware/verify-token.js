const jwt = require("jsonwebtoken");
const jwtSecret = process.env.JWTSECRET;

const verifyUser = (req, res, next) => {
  const token = req.header("Authorization")?.split(" ")[1];
  !token && res.status(400).json("access denied");
  try {
    const verifiedUser = jwt.verify(token, jwtSecret);
    req.user = verifiedUser;
    next();
  } catch (err) {
    res.status(400).json("Invalid token");
  }
};

const verifyAdmin = (req, res, next) => {
  const token = req.header("Authorization")?.split(" ")[1];
  !token && res.status(400).json("access denied");
  try {
    const verifiedUser = jwt.verify(token, jwtSecret);
    !verifiedUser.isAdmin && res.status(400).json("access denied");
    req.user = verifiedUser;
    next();
  } catch (err) {
    res.status(400).json("Invalid token");
  }
};

module.exports = { verifyUser, verifyAdmin };
