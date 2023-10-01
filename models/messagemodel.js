const mongoose=require("mongoose");

const messageSchema=mongoose.Schema({
   
    text:{
        type:String,
        required:true,
    },
   
   
   users:Array,
   sender:{
      type:String,
      required:true,
   },
   uid:{
      type:String,
      required:true,
   },
  time:{
    type:Number,
    required:true
  },
  status:{
   type:String,
   required:true
  }
},
{
   timestamps:true
  }
);
const Message=mongoose.model("Messages",messageSchema);
module.exports=Message;
