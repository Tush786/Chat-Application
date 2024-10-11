const mongoose = require("mongoose");
require("dotenv").config();

const connectToMongoDBAtlas = async () => {
  try {
    await mongoose.connect(process.env.MONGOSHURL);
    console.log("Connected to MongoDB Atlas");
  } catch (error) {
    console.log("Error connecting to MongoDB", error.message);
  }
};



module.exports = {
    connectToMongoDBAtlas
   }