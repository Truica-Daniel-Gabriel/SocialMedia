const express = require("express");
require("dotenv").config();
const mongoose = require("mongoose");

const { verifyUser } = require("./middleware/verify-token");
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const postRoutes = require("./routes/postRoutes")

const app = express();
const port = process.env.PORT || 5000;

//middleware
app.use(express.json({limit:'4mb'}));
app.use("/api/auth", authRoutes);
app.use("/api/user", verifyUser, userRoutes);
app.use("/api/post", verifyUser, postRoutes);

//db connecting
mongoose.connect(process.env.DATABACE_ACCESS, () =>
  console.log("DB Connected")
);

app.listen(port, () => console.log(`Sv run on port ${port}`));
