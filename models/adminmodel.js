const mongoose=require("mongoose");

const adminModel=mongoose.Schema({
    username:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
    }
});
const AdminModel=mongoose.model("Admin",adminModel);
module.exports=AdminModel;