const express= require('express')
const app=express()
const mongoose= require('mongoose');
mongoose.set('strictQuery', false);
const cleanNotificationJob=require('./cleanNotificationJob');

//const cleanNotificationJob = require('./cleanNotificationJob');  //todo

//const routes = require('./route/routes');
const routes=require('./route/routes')

const cors=require('cors');



app.use(cors({
    origin: "http://localhost:4200"
  }));



  app.use(express.json());


const connectDB = require('./config/db')
connectDB();


app.listen((3003), function check(error)
{
 if (error)
    {
        console.log("Error............");
        
    }

   else
   {
    //cleanNotificationJob();
    cleanNotificationJob();
    
    console.log("Success........");
   } 
}
)



// const connectDB = require('./config/db')
// connectDB();


app.use(express.json());
app.use("/",routes);

