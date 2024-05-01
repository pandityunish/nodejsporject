const mongoose=require("mongoose");

const adminnotiSchema=mongoose.Schema({
    userid:{
        type:String,
        required:true,
    },
    userimage:{
        type:String,
        default:""
        // required:true,
    },
    useremail:{
        type:String,
        required:true,
    },
    title:{
        type:String,
        required:true,
    },
    subtitle:{
        type:String,
        default:""
    },
    isSeen:{
        type:Boolean,
        default:true
    },
    adminemail:{
        type:String,
        default:""
    }
},{
    timestamps:true
   });
   adminnotiSchema.index({ title: "text" });

   const AdminNotification=mongoose.model("adminNotification",adminnotiSchema);
   module.exports=AdminNotification;