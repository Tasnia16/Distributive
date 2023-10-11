const express= require('express')
const app=express()
const mongoose= require('mongoose');
mongoose.set('strictQuery', false);

//const cleanNotificationJob = require('./cleanNotificationJob');  //todo

const routes = require('./route/routes');

const cors=require('cors');



app.use(cors({
    origin: "http://localhost:4200"
  }));



  app.use(express.json());
  


  mongoose.connect(
        "mongodb://127.0.0.1:27017/LinkedInPost",
        {useNewUrlParser: true, useUnifiedTopology: true}
    )
    .then( () => 
        app.listen(4002, () => console.log("Connected successfullyyyyyyy 2"))
    )
    .catch(err => console.log(err));

    //mongoose.set('bufferCommands', false);

// app.listen((3002), function check(error)
// {
//  if (error)
//     {
//         console.log("Error............");
        
//     }

//    else
//    {
//     //cleanNotificationJob();
//     console.log("Success........");
//    } 
// }
// )



// //database connection

// const connectDB = require('./config/db')
// connectDB();


app.use(express.json());
app.use("/",routes);






//http://127.0.0.1:9001/buckets