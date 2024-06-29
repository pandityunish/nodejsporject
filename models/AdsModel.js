const mongoose=require("mongoose");

const adsmodel=mongoose.Schema({
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
    },
    
},{
    timestamps:true
   });
   const ADS=mongoose.model("Ads",adsmodel);
   module.exports=ADS;
