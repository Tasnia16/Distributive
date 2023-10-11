
var bcrypt=require('bcrypt');
var userModel = require('./userModel.js');
var crypto1 = require('crypto');
var hashpass=crypto1.randomBytes(32).toString('hex');

var createUserControllerFn= async(req,res) =>{
    console.log('COde is here');
    try{
      
        
            const userDetails=req.body;
            const hash=await bcrypt.hash(userDetails.password,12);
            email=userDetails.email
            const user = await userModel.findOne({ email: userDetails.email });
            
            if (user) {
                res.json({status:false,message:"user exists in the database"});
            }

            else{
                res.send({"status":true,"message":"user created successfully"});
        
            var userModelData = await new userModel({
                firstname: userDetails.firstname, 
                lastname: userDetails.lastname, 
                email: userDetails.email,
                password:hash

            });
            

            await userModelData.save();
            }   

    }
    catch(err){
            console.log(err);
    }
}

    
var loginUserControllerFn = async (req, res) => {
   
    try {
        const userDetails=req.body;    

    const user = await userModel.findOne({ email: userDetails.email }).maxTimeMS(30000);
    const isMatch = await bcrypt.compare(userDetails.password, user.password);

    if (user && isMatch) {
        res.send({status:true,message:"hoise"});
        module.exports.email =userDetails.email;
        
    }

    else{
        res.send({status:false,message:"hoy naaa"});

    }
       
    } catch (error) {
        console.log(error);
        
    }
}

module.exports ={createUserControllerFn,loginUserControllerFn};