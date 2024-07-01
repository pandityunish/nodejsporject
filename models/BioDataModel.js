const mongoose=require("mongoose");

const editprofileUser=mongoose.Schema({
    userid:{
        type:String,
    },
    images:[{
        type:String,
     
    }],
    aboutme:{
        type:String,
    },
    patnerpref:{
        type:String,
    },
    isBlur:{
        type:Boolean,
        default:false
      },
     
     
      profession:{
        type:String,
        
      },
      
      education:{
        type:String,
        
      },
     
      editname:{
        type:String
      }
},{
    timestamps:true
   });

const BioDataProfile=mongoose.model("biodata",editprofileUser);
module.exports=BioDataProfile;