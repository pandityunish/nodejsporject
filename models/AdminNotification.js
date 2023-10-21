const mongoose=require("mongoose");

const adminnotiSchema=mongoose.Schema({
    userid:{
        type:String,
        required:true,
    },
    userimage:{
        type:String,
        required:true,
    },
    useremail:{
        type:String,
        required:true,
    },
    title:{
        type:String,
        required:true,
    },
},{
    timestamps:true
   });
   const AdminNotification=mongoose.model("adminNotification",adminnotiSchema);
   module.exports=AdminNotification;