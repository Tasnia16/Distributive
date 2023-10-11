const notification=require('./notificationModel');

module.exports.addNotifications=async(req,res,next)=>{

  console.log("hhhhimmnhb");
  console.log(req.body);
  const { userMail, postId, message } = req.body.notifications;
  console.log(userMail);
  console.log(postId);
  console.log(message);
    const notificationsData = {
      userMail,
      postId,
      message,
    };

    console.log('aaaaaaaaaaa',notificationsData);

    const result=await notification.insertMany(notificationsData);
    console.log('inres',result);

}



module.exports.getNotifications = async (req, res,next) => {
    try {
    
  
      const notifications = await notification.find().sort({ createdAt: -1 }).exec();


      console.log(notifications); 
      res.status(200).json(notifications);
    } catch (error) {
      console.error('Error retrieving notifications:', error);
      res.status(500).json({ message: 'Error retrieving notifications' });
    }
  };