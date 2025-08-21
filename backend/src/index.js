require("dotenv").config();
const express = require("express");
const connectDB = require("./config/database");
const cors = require("cors");
const cookieParser = require("cookie-parser");

connectDB();

const app = express();
const authRoutes = require("./api/routes/auth");
const postRoutes = require("./api/routes/post");

app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use("/api/auth", authRoutes);
app.use("/api/posts", postRoutes);
app.get("/", (req, res) => {
  res.send("Server is running!");
});

app.listen(3000, () => {
  console.log("Listening on port 3000");
});
