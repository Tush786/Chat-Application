const express = require("express");
const { getUsersForSidebar } = require("../controllers/user.controller.js");
const { protectRoute } = require("../middlewares/middleware.js");

const Userrouter = express.Router();

Userrouter.get("/", protectRoute, getUsersForSidebar);



module.exports = {
    Userrouter
   }