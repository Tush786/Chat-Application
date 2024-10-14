const express=require("express")
const { protectRoute } = require("../middlewares/middleware");
const { getMessages, sendMessages } = require("../controllers/messages.controller");

const MessageRoute=express.Router()

MessageRoute.get('/:id',protectRoute,getMessages);
MessageRoute.get('/send/:id',protectRoute,sendMessages);

module.exports = {
    MessageRoute
   }