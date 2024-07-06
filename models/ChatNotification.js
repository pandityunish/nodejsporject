const mongoose=require("mongoose");

const unseenmessages=mongoose.Schema({
    username:{
        type:String,
    },
    isSeen:{
type:Boolean,
default:false,
    },
    userid:{
        type:String,
    },
    userimage:{
        type:String,
        default:""
    },
   
    title:{
        type:String,
    }
},{
    timestamps:true
   });
   module.exports=unseenmessages;