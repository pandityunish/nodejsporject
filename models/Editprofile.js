const mongoose=require("mongoose");

const editprofileUser=mongoose.Schema({
    userid:{
        type:String,
        required:true
    },
    images:[{
        type:String,
     
    }],
    aboutme:{
        type:String,
        required:true
    },
    patnerpref:{
        type:String,
        required:true
    }
},{
    timestamps:true
   });

const EditProfiles=mongoose.model("editprofile",editprofileUser);
module.exports=EditProfiles;