const mongoose=require("mongoose");

const adminModel=mongoose.Schema({
    username:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
    },
    lat:{
        type:Number,
        default:0.4
    },
    lng:{
        type:Number,
        default:0.4
    },
    permissions:[
        {
            type:String
        }
    ],
    token:{
        type:String,
        default:""
    },
    isLogOut:{
        type:String,
        default:"false"
    }
});
const AdminModel=mongoose.model("Admin",adminModel);
module.exports=AdminModel;