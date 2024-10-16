const express= require("express");
const { model, get } = require("mongoose");
const { Message } = require("../model/message.model");
const { getReceiverSocketId } = require("../socket/getReceiverSocketId");
const { Conversation } = require("../model/conversation.model");

const sendMessages=async (req,res)=>{
  try {
    const { message } = req.body;
    let { img } = req.body;
    const { id: receiverId } = req.params;
    const senderId = req.user._id;

    let conversation = await Conversation.findOne({
      participants: { $all: [senderId, receiverId] },
    });

    if (!conversation) {
        conversation = await Conversation.create({
          participants: [senderId, receiverId],
        });
      }
  
      if (img) {
        let uploadedResponse = await cloudinary.uploader.upload(img);
        img = uploadedResponse.secure_url;
      }
  
      const newMessage = new Message({
        senderId,
        receiverId,
        message,
        seen: false,
        img: img || "",
      });
  
      if (newMessage) {
        conversation.messages.push(newMessage._id);
      }
  
      await Promise.all([conversation.save(), newMessage.save()]);
  
      const receiverSocketId = getReceiverSocketId(receiverId);
      if (receiverSocketId) {
        io.to(receiverSocketId).emit("newMessage", newMessage);
      }
  
      res.status(201).json(newMessage);
  } catch (error) {
    console.log("Error in sendMessage controller: ", error.message);
    res.status(500).json({ error: "Internal server error" });
  }

}


 const getMessages = async (req, res) => {
  try {
    const { id: userToChatId } = req.params;
    const senderId = req.user._id;

    const conversation = await Conversation.findOne({
      participants: { $all: [senderId, userToChatId] },
    }).populate("messages");

    if (!conversation) return res.status(200).json([]);

    const messages = conversation.messages;

    res.status(200).json(messages);
  } catch (error) {
    console.log("Error in getMessages controller: ", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports={
    sendMessages,getMessages
}