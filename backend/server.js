// Required dependencies
const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const cloudinary = require("cloudinary").v2;
const cookieParser = require("cookie-parser");
const path = require("path");
const bodyParser = require("body-parser");
const { connectToMongoDBAtlas } = require("./db/connection.js");
const { createServer } = require("http");
const { initSocket } = require("./socket/getReceiverSocketId.js");

// Load environment variables
dotenv.config();

const app = express();
const PORT = 5000; // Set the port

// Cloudinary configuration
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET_KEY,
});

// Middleware
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
app.use(cookieParser());
app.use(cors({ origin: "*" })); // Allow all origins for CORS

// Serve static files from my-vue-app/dist
app.use(express.static(path.join(__dirname, "../my-vue-app"))); // Adjust the path

// Routes
const { authrouter } = require("./routes/auth.routes.js");
const { Userrouter } = require("./routes/user.routes.js");
app.use("/api/auth", authrouter);
app.use("/api/users", Userrouter);

// Serve the frontend
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../my-vue-app", "index.html")); // Adjust the path
});

// Create an HTTP server
const server = createServer(app); // Use createServer with app

// Initialize Socket.IO
initSocket(server); // Pass the server instance to the Socket.IO init function

// Start the server and MongoDB connection
server.listen(PORT, () => {
  connectToMongoDBAtlas();
  console.log(`Server running on port ${PORT}`);
});
