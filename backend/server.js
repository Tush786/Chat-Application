const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const cloudinary = require("cloudinary").v2;
const { authrouter } = require("./routes/auth.routes.js");
const { Userrouter } = require("./routes/user.routes.js");
const { connectToMongoDBAtlas } = require("./db/connection.js");

const PORT = process.env.PORT || 5000;
// const {authRoutes} = require("./routes/auth.routes.js");
// const __dirname = path.resolve();
// app.use(bodyParser.json({ limit: "50mb" }));
// app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));

require("dotenv").config();
const app = express();
app.use(
  cors({
    origin: "*",
  })
);

app.use(express.json());

app.use("/api/auth", authrouter);
app.use("/api/users", Userrouter);

app.listen(PORT, () => {
  connectToMongoDBAtlas();
  console.log(`Server Running on port ${PORT}`);
});
