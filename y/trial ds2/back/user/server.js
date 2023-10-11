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


app.listen((3001), function check(error)
{
 if (error)
    {
        console.log("Error............");
        
    }

   else
   {
    //cleanNotificationJob();
    console.log("Success........");
   } 
}
)



//database connection

const connectDB = require('./config/db')
connectDB();


app.use(express.json());
app.use("/",routes);






//http://127.0.0.1:9001/buckets