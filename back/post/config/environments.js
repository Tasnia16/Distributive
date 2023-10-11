require('dotenv').config()


module.exports = {

    MONGO_USERNAME: process.env.MONGO_USERNAME,
    MONGO_PASSWORD: process.env.MONGO_PASSWORD,
    MONGO_IP: process.env.MONGO_IP || 'mongo',      //docker mongo
    MONGO_PORT: process.env.MONGO_PORT || 27017,
    MONGO_DATABASE_NAME: process.env.MONGO_DATABASE_NAME || 'testdb2'

}