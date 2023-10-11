const Post = require('./postService');
const userService = require('../user/userService')



module.exports.getAllPosts = (req, res) => {

  const { userMail } = req.query; // Get the userMail from the query parameters
 // const userEmail=userService.email;
  Post.getPost(userMail,res);
};