var postModel = require('./postModel.js');

var userModel = require('../user/userModel.js');

var userService = require('../user/userService');
const imageProcessing=require('./imageController.js');

const axios = require('axios'); // Import the axios library


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


     const otherUsers = postDetails.userMail;
     
     //await userModel.find({ firstname: { $ne: user.firstname } });
     const message = `${otherUsers} has created a new post.`;

    const notifications = ({
      userMail: otherUsers,
      postId: result._id,
      message,
    });

    await sendNotificationsToBackend(notifications);


    //todo

    //await Notification.insertMany(notifications);
    

    console.log(result);
    return true;
  } catch (error) {
    console.error('Error in postDBService:', error);
    throw new Error('Error saving postModelData.');
}
};


async function sendNotificationsToBackend(notifications) {
  const notificationApiUrl ='http://localhost:3003/notifications'; 
  try {
    const response = await axios.post(notificationApiUrl, { notifications });
    return response.data; // You can handle the response if needed
  } catch (error) {
    console.error('Error sending notifications to the backend:', error);
    throw new Error('Error sending notifications to the backend.');
  }
}



module.exports.getPost = async (req, res) => {
  try {
    //const user = await userModel.findOne({ email: userMail });
    
    // if (!user) {
    //   throw new Error('User not found.');
    // }

    const { userMail } = req.query; 
    
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

