const mongoose=require("mongoose");

const adminModel=mongoose.Schema({
   
    email:{
        type:String,
        required:true,
    },
    aboutme:{
        type:Number,
        default:0
    },
    patnerpref:{
        type:Number,
        default:0
    },
    success:{
        type:Number,
        default:0
    },
    video:{
        type:Number,
        default:0
    },
    savepref:{
        type:Number,
        default:0
    },
    useapp:{
        type:Number,
        default:0
    },
    professionManually:{
        type:Number,
        default:0
    },
    educationManually:{
        type:Number,
        default:0
    },
    rating:{
        type:Number,
        default:0
    },
    photo:{
        type:Number,
        default:0
    },
    biodata:{
        type:Number,
        default:0
    },
    share:{
        type:Number,
        default:0
    },
    support:{
        type:Number,
        default:0
    },
},{
    timestamps:true
   });
const SendLinkModel=mongoose.model("sendlinks",adminModel);
module.exports=SendLinkModel;