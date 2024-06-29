const mongoose=require("mongoose");
const User = require("./User");

const adminAddedUser=mongoose.Schema({
    userid:{
        type:String,
        required:true
    },
    userlist:[{
        type:String,
     
    }]
});

const AdminAddedUsers=mongoose.model("adminAddedUsers",adminAddedUser);
module.exports=AdminAddedUsers;