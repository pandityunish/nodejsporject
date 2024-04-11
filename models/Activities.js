const mongoose=require("mongoose");

const activity=mongoose.Schema({
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
    delete:{
        type:Boolean,
        default:false
    },
    title:{
        type:String,
    }
},{
    timestamps:true
   });
   module.exports=activity;