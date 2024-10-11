const express = require("express");
const { login, logout, signup } = require("../controllers/auth.controller.js");

const authrouter = express.Router();

authrouter.post("/signup", signup);
authrouter.post("/login", login);
authrouter.post("/logout", logout);
console.log(authrouter)


module.exports = {
    authrouter
   }