const Post = require('./postService');


module.exports.getAllPosts = (req, res) => {

//edit
  const { userMail } = req.query; // Get the userMail from the query parameters
  // const userEmail=userService.email;
   Post.getPost(userMail,res);

  // const userEmail=userController.email
  // Post.getPost(userEmail,res);
};