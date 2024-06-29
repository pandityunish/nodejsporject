const mongoose=require("mongoose");

const rating=mongoose.Schema({
   
    useremail:{
        type:String,
        required:true
    },
   
    ratingnumber:{
        type:Number,
        required:true
    },
    description:{
        type:String,
        default:""
    }
},{
    timestamps:true
   });
   module.exports=rating;
   const RatingModel=mongoose.model("rating",rating);
module.exports=RatingModel;