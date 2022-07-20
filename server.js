const express = require("express");
require("dotenv").config();
const mongoose = require("mongoose");

const { verifyUser } = require("./middleware/verify-token");
const authRoutes = require("./routes/authRoutes");

const app = express();
const port = process.env.PORT || 5000;

//middleware
app.use(express.json());
app.use("/api/auth", authRoutes);

//db connecting
mongoose.connect(process.env.DATABACE_ACCESS, () =>
  console.log("DB Connected")
);

app.get("/", verifyUser, (req, res) => {
  res.send("hello");
});

app.listen(port, () => console.log(`Sv run on port ${port}`));
