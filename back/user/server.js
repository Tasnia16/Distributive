const express= require('express')
const app=express()

//const cleanNotificationJob = require('./cleanNotificationJob');  //todo

const routes = require('./route/routes');

const cors=require('cors');
app.use(cors())

const port = process.env.PORT || 3000;

//body parser configutation
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//database connection
const connectDB = require('./config/db')
connectDB();

app.use("/api/user",routes);


app.listen((port), function check(error)
{
 if (error)
    {
        console.log("Error............");
        
    }

   else
   {
    
    console.log(`Server listening on port: ${port}`);
   } 
}
)


