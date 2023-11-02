const mongoose=require("mongoose");
const notification = require("./Notification");
const activity = require("./Activities");
const userMessage = require("./user_message");

const userSchema=mongoose.Schema({
    aboutme:{
      type:String,
     default:""
    },

    diet:{
        type:String,
        required:true,
      },
      age:{
        type:String,
        required:true,
      },
      disability:{
        type:String,
        required:true,
      },
      puid:{
        type:String,
        required:true,
      },
      drink:{
        type:String,
        required:true,
      },
      education:{
        type:String,
        required:true,
      },
      height:{
        type:String,
        required:true,
      },
      income:{
        type:String,
        required:true,
      },
      patnerprefs:{
        type:String,
        default:""
      },
      smoke:{
        type:String,
        required:true,
      },
      displayname:{
        type:String,
        required:true,
      },
      email:{
        type:String,
        required:true,
      },
      religion:{
        type:String,
        required:true,
      },
      name:{
        type:String,
        required:true,
      },
      surname:{
        type:String,
        required:true,
      },
      lat:{
        type:Number,
      },
      lng:{
        type:Number,
      },
      adminlat:{
        type:Number,
      },
      adminlng:{
        type:Number,
      },
      gender:{
        type:String,
        required:true,
      },
      phone:{
        type:String,
        required:true,
      },
      timeofbirth:{
      type:String,
      },
      placeofbirth:{
        type:String,
      },
      kundalidosh:{
        type:String,
      },
      martialstatus:{
        type:String,
        required:true,
      },
      profession:{
        type:String,
        required:true,
      },
      location1:{
        type:String,
      },
      city:{
        type:String,
        required:true,
      },
      state:{
        type:String,
        required:true,
      },
      country:{
        type:String,
        required:true,
      },
      token:{
        type:String,
        required:true,
      },
      dob:{
        type:Number,
      },
      isLogOut:{
        type:String,
        default:"false"
      },
      status:{
        type:String,
        default:""
      },
      verifiedstatus:{
        type:String,
        default:""
      },
      videolink:{
        type:String,
        default:""
      },
      videoname:{
        type:String,
        default:""
      },

      imageurls:[
        {
            type: String,
        }
      ],
      blocklists:[
        {
            type: String,
        }
      ],
      reportlist:[
        {
            type: String,
        }
      ],
      shortlist:[
        {
            type: String,
        }
      ],
      friends:[
         {
          type:String
         }
      ],
      pendingreq:[
        {
            type: String,
        }
      ],
      sendreq:[
        {
            type: String,
        }
      ],
      notifications:[
        
           notification
        
      ],
      chats:[
        
        userMessage
     
   ],
   location: {
    type: {
      type: String,
      enum: ['Point'],
      required: true,
    },
    coordinates: {
      type: [Number],
      required: true,
    },
  },
      activities:[
        activity
      ]
},
{
  timestamps:true
 }
);
userSchema.index({ location: '2dsphere' });
const User=mongoose.model("Users",userSchema);

module.exports=User;