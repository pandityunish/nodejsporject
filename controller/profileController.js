const UserSearch=require("../models/UserSearchModel")
const express=require("express");
 const profileRouter=express.Router();

profileRouter.post("/addusersearch",async(req,res)=>{
    try {
       const {searchidprofile,searchDistance,age,religion,kundlidosh,marital_status,diet,smoke,drink,disability,height,education,profession,income,location,userid}=req.body; 

       let user=await UserSearch({searchidprofile,searchDistance,age,religion,kundlidosh,marital_status,diet,smoke,drink,disability,height,education,profession,income,location,userid});
       user=await user.save();
       res.json(user);
    } catch (e) {
        res.status(500).json({mes:e})
    }
});

profileRouter.post("/getallusersearch",async(req,res)=>{
    try {
const {id}=req.body;
        let users=await UserSearch.find({userid:id});
        res.json(users);
    } catch (e) {
        res.status(500).json({mes:e})
    }
});

module.exports=profileRouter;