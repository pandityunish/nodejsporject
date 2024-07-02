const mongoose=require("mongoose");

const userads=mongoose.Schema({
    description:{
        type:String,
    },
    adsid:{
        type:String,
    },
    image:{
        type:String,
        default:""
    },
    video:{
        type:String,
        default:""
    }
    
},{
    timestamps:true
   });
 
   module.exports=userads;
