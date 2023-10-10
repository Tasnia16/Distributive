var postModel = require('./postModel.js');



// var userService = require('../user/userService');

//todo
//const Notification = require('../notification/notificationModel.js');


module.exports.postDBService = async (postDetails) => {
  try {
    
    // const user = await userModel.findOne({ email: userService.email });
    

    // if (!user) {
    //   throw new Error("User not found.");
    // }



    const postData ={
      username: postDetails.userMail, // Use the firstname from the user table
      content: postDetails.content,
    };

    if(postDetails.image){
      postData.image = postDetails.image;
    }


    const postModelData=new postModel(postData);

     const result = await postModelData.save();


    //  const otherUsers = await userModel.find({ firstname: { $ne: user.firstname } });
    //  const message = `${user.firstname} has created a new post.`;

    // const notifications = otherUsers.map((otherUser) => ({
    //   userId: otherUser._id,
    //   postId: result._id,
    //   message,
    // }));

    //todo

    //await Notification.insertMany(notifications);

    console.log(result);
    return true;
  } catch (error) {
    console.error('Error in postDBService:', error);
    throw new Error('Error saving postModelData.');
}
};



module.exports.getPost = async (req, res) => {
  try {
    // const user = await userModel.findOne({ email: userMail });
    
    // if (!user) {
    //   throw new Error('User not found.');
    // }
     
    const { userMail } = req.query;
    
    //edit
    const otherPosts = await postModel
      .find({ username: { $ne: userMail } })    //except  syntax
      .sort({ createdAt: -1 })
      .exec();

   
    const otherPostsWithImages = await Promise.all(otherPosts.map(async (post) => {
      const imageUrl = post.image
        ? `http://localhost:4002/image/${post.image}`
        : null;

      return { ...post.toObject(), imageUrl }; // syntax problem
    }));

    res.status(200).json({ otherPosts: otherPostsWithImages });
  } catch (error) {
    console.error('Error retrieving posts:', error);
    res.status(500).json({ message: 'Error retrieving posts' });
  }
};

