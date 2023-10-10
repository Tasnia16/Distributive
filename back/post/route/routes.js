var express=require("express");


var postController=require('../postController');
const router=express.Router();
const imageController=require('../imageController');
const postService=require('../postService')
const multer=require('multer');

const upload = multer({ dest: 'uploads/' });



//router.post('/post',  postController.createPost);
router.get('/', postService.getPost);
router.post('/post',upload.single('image'),imageController.imageProcessing);
router.get('/image/:imageName',imageController.getImage);


module.exports = router;
