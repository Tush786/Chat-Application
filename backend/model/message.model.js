const mongoose = require("mongoose");

const messageShema = new mongoose.Schema(
  {
    senderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    reciverId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    message: {
      type: String,
      // required: true,
    },
    img: {
      type: String,
      default: "",
    },
    seen: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);


const  Message=mongoose.model("Message",messageShema)

module.exports = {
      Message
   }