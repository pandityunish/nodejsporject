const mongoose=require("mongoose");

const querySchema=mongoose.Schema({
    email:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    }
});
const Query=mongoose.model("Queries",querySchema);
module.exports=Query;