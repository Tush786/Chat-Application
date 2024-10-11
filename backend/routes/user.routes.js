import express from "express";
import protectRoute from "../middleware/protectRoute.js";
import { getUsersForSidebar } from "../controllers/user.controller.js";

const Userrouter = express.Router();

Userrouter.get("/", protectRoute, getUsersForSidebar);



module.exports = {
    Userrouter
   }