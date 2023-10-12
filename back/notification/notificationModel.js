const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema({
    userMail: {
        type: String,
    },
    postId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post',
    },
    message: {
        type: String,

    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

const Notification = mongoose.model('Notification', notificationSchema);

module.exports = Notification;
