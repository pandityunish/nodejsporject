const mongoose=require("mongoose");

const maintainanceSchema=mongoose.Schema({
   isUnder:{
    type:Boolean,
    default:false
   }
});
const Maintenance=mongoose.model("maintenance",maintainanceSchema);
module.exports=Maintenance;