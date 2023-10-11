const cron = require('node-cron');
const Notification = require('./notificationModel');

  function scheduleNotificationCleanupJob() {
    cron.schedule('*/30 * * * * *', async () => { 
      try {
        const oneHourAgo = new Date();
        oneHourAgo.setSeconds(oneHourAgo.getSeconds() - 30);
        
        await Notification.deleteMany({ createdAt: { $lt: oneHourAgo } });
        console.log('Notification cleanup job completed.');
      } catch (error) {
        console.error('Error cleaning notifications:', error);
      }
    });
  }

module.exports = scheduleNotificationCleanupJob;


// const cron = require('node-cron');
// const Notification = require('./notificationModel');

// function scheduleNotificationCleanupJob() {
//   console.log("clean hiy na");
//   cron.schedule('0 * * * *', async () => { // Run at the beginning of every hour
//     try {
//       console.log("abcd");
//       const oneHourAgo = new Date();
//       oneHourAgo.setHours(oneHourAgo.getHours() - 1); // Subtract 1 hour from the current time

//       await Notification.deleteMany({ createdAt: { $lt: oneHourAgo } });
//       console.log('Notification cleanup job completed.');
//     } catch (error) {
//       console.log("dhur");
//       console.error('Error cleaning notifications:', error);
//     }
//   });
// }

// module.exports = scheduleNotificationCleanupJob;
