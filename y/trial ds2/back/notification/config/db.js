const mongoose = require("mongoose");
const mongoURI = "mongodb://127.0.0.1:27017/LinkedNotification";

const connectToMongo = async () => {
  try {
    mongoose.set("strictQuery", false);
    mongoose.connect(mongoURI);
    console.log("Connected to Mongo Successfully  3 (user)!");
  } catch (error) {
    console.log(error);
  }
};
module.exports = connectToMongo;