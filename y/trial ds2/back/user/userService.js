var userModel = require('./userModel.js');
var bcrypt=require('bcrypt');
var crypto1 = require('crypto');
var hashpass=crypto1.randomBytes(32).toString('hex');
var email;

module.exports.hashpass=hashpass;

module.exports.createUserDBService= async (userDetails, res) =>{

    const hash=await bcrypt.hash(userDetails.password,12);
    email=userDetails.email
    const user = await userModel.findOne({ email: userDetails.email });
    
    if (user) {
        res.json({"status":false,"message":"user exists in the database"});
    }

    else{
        res.send({"status":true,"message":"user created successfully"});
    console.log('in here you', userDetails);
       var userModelData = await new userModel({
        firstname: userDetails.firstname, 
        lastname: userDetails.lastname, 
        email: userDetails.email, 
        password:hash
       });
       console.log(userModelData);

       await userModelData.save();
    }
     
}

module.exports.loginuserDBService = async (userDetails,res)=> 
{

    const user = await userModel.findOne({ email: userDetails.email }).maxTimeMS(30000);
    const isMatch = await bcrypt.compare(userDetails.password, user.password);

    const pass = await userModel.findOne({ password: userDetails.password }).maxTimeMS(30000);

    if (user && isMatch) {
        res.send({"status":true,"message":"hoise"});
        module.exports.email =userDetails.email;
        
    }

    else{
        res.send({"status":false,"message":"hoy naaa"});

    }
              
}





   



