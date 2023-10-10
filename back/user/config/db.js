const mongoose = require("mongoose");
require('dotenv').config();
//const mongoURI = "mongodb://127.0.0.1:27017/LinkedInUser";//change

const { MONGO_USERNAME, MONGO_PASSWORD, MONGO_IP, MONGO_PORT, MONGO_DATABASE_NAME } = require("./environments");
const DATABASE_URL = `mongodb://${MONGO_USERNAME}:${MONGO_PASSWORD}@${MONGO_IP}:${MONGO_PORT}/${MONGO_DATABASE_NAME}?authSource=admin`

const connectToMongo = () => {
  mongoose
  .connect(DATABASE_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log(`Database Connected`))
  .catch((error) => {
      console.log(error);
      setTimeout(connectToMongo, 1000)
  })
};  
module.exports = connectToMongo; 



