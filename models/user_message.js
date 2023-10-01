const mongoose=require("mongoose");

const userMessage=mongoose.Schema({
    username:{
        type:String,
        required:true,
    },
    userimage:{
        type:String,
        required:true,
    },

    lastmessage:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
    },
    userid:{
        type:String,
        required:true,
    },
    lasttime:{
        type:Number,
        required:true
    }

});
module.exports=userMessage;