const express=require("express");
const { mongoose } = require("mongoose");

const conversationShema=new mongoose.shema(
    {
        participants: [
            {
              type: mongoose.Schema.Types.ObjectId,
              ref: "User",
            },
          ],
          messages: [
            {
              type: mongoose.Schema.Types.ObjectId,
              ref: "Message",
              default: [],
            },
          ],
    },
    {
        Timestamp:true
    }
)

const Conversation=mongoose.model("Conversation",conversationShema);

module.exports={
    Conversation
}