const mongoose=require("mongoose");

const notification=mongoose.Schema({
 
   
    title:{
        type:String,
    }
},{
    timestamps:true
   });
   module.exports=notification;