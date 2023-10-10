const mongoose = require("mongoose");
require('dotenv').config();
//const mongoURI = "mongodb://127.0.0.1:27017/LinkedInPost";

const { MONGO_USERNAME, MONGO_PASSWORD, MONGO_IP, MONGO_PORT, MONGO_DATABASE_NAME } = require("./environments");
const a = require('./environments')
const DATABASE_URL = `mongodb://${MONGO_USERNAME}:${MONGO_PASSWORD}@${MONGO_IP}:${MONGO_PORT}/${MONGO_DATABASE_NAME}?authSource=admin`


const connectToMongo = () => {
  console.log(DATABASE_URL);
  console.log(a);
  mongoose
  .connect(DATABASE_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log(`Database Connected`))
  .catch((error) => {
      console.log(error);
      setTimeout(connectToMongo, 1000)
  })
};  
module.exports = connectToMongo; 




// const connectToMongo = async () => {
//   try {
//     mongoose.set("strictQuery", false);
//     mongoose.connect(mongoURI);
//     console.log("Connected to Mongo Successfully  2 (user)!");
//   } catch (error) {
//     console.log(error);
//   }
// };
// module.exports = connectToMongo;