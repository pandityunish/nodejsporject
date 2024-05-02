const mongoose = require("mongoose");

const unapproveacitivites = mongoose.Schema({
    senduserid: {
        type: String,
        required: true,
    },
    reciveuserid: {
        type: String,
        required: true
    },
    isSeen: {
        type: Boolean,
        default: false,
    },
    userimage: {
        type: String,
        default: ""
    },
    title: {
        type: String,
        required: true
    },
    token: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
}, {
    timestamps: true
});
module.exports = unapproveacitivites;