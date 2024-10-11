const mongoose = require("mongoose");

const connectToMongoDBAtlas = async () => {
  try {
    await mongoose.connect(process.env.MONGOSHURL);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.log("Error connecting to MongoDB", error.message);
  }
};



module.exports = {
    connectToMongoDBAtlas
   }