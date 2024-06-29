const mongoose = require("mongoose");

const sendnotification = mongoose.Schema({

    heading: {
        type: String,
        default: ""
    },
    title: {
        type: String,
        default: ""
    },
    type: {
        type: String,
        default: ""
    },
    name: {
        type: String,
        default: ""
    },
   

    status: {
        type: String,
        default: ""
    },
    email: {
        type: String,
        default: ""
    }
}, {
    timestamps: true
});
const SendNotification=mongoose.model("SendNotification",sendnotification);

module.exports = SendNotification;