const mongoose=require("mongoose");
const notification = require("./Notification");
const activity = require("./Activities");
const userMessage = require("./user_message");
const ADS = require("./AdsModel");
const userads = require("./user_ads");
const unapproveacitivites = require("./Unapproveactivities");

const userSchema=mongoose.Schema({
    aboutme:{
      type:String,
     default:""
    },

    diet:{
        type:String,
        default:""
      },
      age:{
        type:String,
        default:""
      },
      disability:{
        type:String,
        default:""
      },
      puid:{
        type:String,
        default:""
      },
      drink:{
        type:String,
        default:""
      },
      education:{
        type:String,
        default:""
      },
      height:{
        type:String,
        default:""
      },
      income:{
        type:String,
       default:""
      },
      patnerprefs:{
        type:String,
        default:""
      },
      smoke:{
        type:String,
        default:""
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
 default:""
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
         default:0.32
      },
      lng:{
        type:Number,
        default:0.32

      },
      adminlat:{
        type:Number,
        default:1.2
      },
      adminlng:{
        type:Number,
        default:0.2
      },
      gender:{
        type:String,
        default:""

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
 default:""

      },
      martialstatus:{
        type:String,
        default:""

      },
      profession:{
        type:String,
        default:""

      },
      location1:{
        type:String,
 default:""

      },
      city:{
        type:String,
        default:""

      },
      state:{
        type:String,
        default:""

      },
      country:{
        type:String,
        default:""

      },
      token:{
        type:String,
        default:""

      },
      dob:{
        type:Number,
 default:32323

      },
      isLogOut:{
        type:String,
        default:"false"
      },
      status:{
        type:String,
        default:""
      },
      sendlink:[
           {type:String,
        
            }
      ],
      editstatus:{
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
      someoneblocklists:[
        {
            type: String,
        }
      ],
      unapprovedSendlists:[
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
      boostprofile:[
        {
            type: String,
        }
      ],
      invisibleprofile:[
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
      ],
      onlineuser:{
        type:Boolean,
        default:false,
      },
      downloadbiodata:{
        type:Boolean,
        default:false,
      },
      chatnow:{
        type:Number,
        default:0,
      },
      support:{
        type:Number,
        default:0
      },
      share:{
        type:Number,
        default:0
      },
      freepersonmatch:{
        type:Number,
        default:0
      },
      marriageloan:{
        type:Number,
        default:0
      },
      isBlur:{
        type:Boolean,
        default:false
      },
      showads:[
        userads
      ],
      otp:{
        type:String,
        default:""
      },
      numofinterest:{
        type:Number,
        default:0
      },
      numofprofileviewer:{
        type:Number,
        default:0
      },
      numofprofileviewed:{
        type:Number,
        default:0
      },
      unapproveacitivites:[
        unapproveacitivites
      ]
},
{
  timestamps:true
 }
);
userSchema.index({ location: '2dsphere' });
// userSchema.plugin(require('mongoose-paginate-v2'));

const User=mongoose.model("Users",userSchema);

module.exports=User;