var userService=require('./userService');

var createUserControllerFn= async(req,res) =>{
    try{
        console.log(req.body);
        
        await userService.createUserDBService(req.body,res);
        

        }
        catch(err){
            console.log(err);
        }
}

    
var loginUserControllerFn = async (req, res) => {
   
    try {
        
         await userService.loginuserDBService(req.body,res);
       
    } catch (error) {
        console.log(error);
        
    }
}

    module.exports ={createUserControllerFn,loginUserControllerFn};