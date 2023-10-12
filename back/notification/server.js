const express = require('express')
const app = express()
const mongoose = require('mongoose');
mongoose.set('strictQuery', false);
const cleanNotificationJob = require('./cleanNotificationJob');


const routes = require('./route/routes')

const cors = require('cors');

app.use(cors());

const port = process.env.PORT || 3002;

const connectDB = require('./config/db')
connectDB();



//body parser configutation
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


app.listen((port), function check(error) {
    if (error) {
        console.log("Error............");

    }

    else {
        //cleanNotificationJob();
        cleanNotificationJob();

        console.log("Success........");
        console.log(`Server listening on port: ${port}`);
    }
}
)


app.listen((port), function check(error) {
    if (error) {
        console.log("Error............");

    }

    else {

        //cleanNotificationJob();

        console.log(`Server listening on port: ${port}`);
    }
}
)



app.use(express.json());
app.use("/api/notification", routes);

