const mongoose=require("mongoose");

const activity=mongoose.Schema({
    username:{
        type:String,
    },
    isSeen:{
type:Boolean
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
   module.exports=activity;