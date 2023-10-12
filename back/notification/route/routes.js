var express = require("express");
const router = express.Router();


const notificationController = require('../notificationController');
//require('../src/notification/notificationController');


// Define a middleware function
function logRequest(req, res, next) {
    console.log(`${req.method} ${req.url}`);
    next();
}

// Use the middleware function
router.use(logRequest);

router.post('/notifications', notificationController.addNotifications);
router.get('/notifications', notificationController.getNotifications);

module.exports = router;


