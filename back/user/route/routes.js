var express=require("express");
var userController=require("../userController")

const router=express.Router();


router.post('/create',userController.createUserControllerFn);

router.post('/login',userController.loginUserControllerFn);


module.exports = router;
