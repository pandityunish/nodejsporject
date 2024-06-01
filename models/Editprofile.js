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
      gender:{
        type:String,
        
      },
      phone:{
        type:String,
        
      },
      timeofbirth:{
      type:String,
      },
      placeofbirth:{
        type:String,
      },
      dateofbirth:{
        type:String,
        
      },
      kundalidosh:{
        type:String,
      },
      martialstatus:{
        type:String,
        
      },
      profession:{
        type:String,
        
      },
      location1:{
        type:String,
      },
      city:{
        type:String,
        
      },
      state:{
        type:String,
        
      },
      country:{
        type:String,
        
      },
      religion:{
        type:String,
        
      },
      name:{
        type:String,
        
      },
      surname:{
        type:String,
        
      },
      lat:{
        type:Number,
      },
      lng:{
        type:Number,
      },
      diet:{
        type:String,
        
      },
      age:{
        type:String,
        
      },
      disability:{
        type:String,
        
      },
      puid:{
        type:String,
        
      },
      drink:{
        type:String,
        
      },
      education:{
        type:String,
        
      },
      height:{
        type:String,
      },
      income:{
        type:String,
      },
      editname:{
        type:String
      }
},{
    timestamps:true
   });

const EditProfiles=mongoose.model("editprofile",editprofileUser);
module.exports=EditProfiles;