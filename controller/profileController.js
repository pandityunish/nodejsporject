const SavedPreferSearch = require("../models/SavePreferenceSearch");
const User = require("../models/User");
const Userkundlimatch = require("../models/UserKundaliMatch");
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
profileRouter.post("/addkundalimatch",async(req,res)=>{
    try {
       const {gname,gday,gmonth,gyear,ghour,gsec,bname,bday,bmonth,byear,bhour,bsec,bplace,userid}=req.body; 
      
       let user=await Userkundlimatch({gname,gday,gmonth,gyear,ghour,gsec,bname,bday,bmonth,byear,bhour,bsec,bplace,userid});
       user=await user.save();
       res.json(user);
    } catch (e) {
        res.status(500).json({mes:e})
    }
});
profileRouter.post("/getalluserkundli",async(req,res)=>{
    try {
const {id}=req.body;
        let users=await Userkundlimatch.find({userid:id});
        res.json(users);
    } catch (e) {
        res.status(500).json({mes:e})
    }
});
profileRouter.get("/update",async(req,res)=>{
    try {
        let users=await User.updateMany({},{
            $set: {
                support: false,

              },
        });
        res.json(users);
    } catch (e) {
        res.status(500).json({mes:e})
    }
})
profileRouter.post("/addsharepref",async(req,res)=>{
    try {
        const {
            ageList,
            email,
            religionList,
            kundaliDoshList,
            maritalStatusList,
            dietList,
            drinkList,
            smokeList,
            disabilityList,
            heightList,
            educationList,
            professionList,
            incomeList,
            citylocation,
            statelocation,
            userid,
            location}=req.body;
        let saved_pref=await SavedPreferSearch({
            ageList,
            email,
            religionList,
            kundaliDoshList,
            maritalStatusList,
            dietList,
            drinkList,
            smokeList,
            disabilityList,
            heightList,
            educationList,
            professionList,
            incomeList,
            citylocation,
            statelocation,
            userid,
            location});
saved_pref=await saved_pref.save();
res.json(saved_pref);
    } catch (e) {
        res.status(500).json({mes:e})  
    }
});
profileRouter.post("/getsearchprofilepref",async(req,res)=>{
    try {
const {id}=req.body;
        let users=await SavedPreferSearch.find({userid:id});
        res.json(users);
    } catch (e) {
        res.status(500).json({mes:e})
    }
});
profileRouter.post("/updateonlineuser",async(req,res)=>{
    try {
const {id}=req.body;
        let users=await User.updateOne({_id:id},{
            $set:{
                onlineuser:true
            }
        });
        res.json(users);
    } catch (e) {
        res.status(500).json({mes:e})
    }
});
profileRouter.post("/updatedownloadbiodata",async(req,res)=>{
    try {
const {id}=req.body;
        let users=await User.updateOne({_id:id},{
            $set:{
                downloadbiodata:true
            }
        });
        res.json(users);
    } catch (e) {
        res.status(500).json({mes:e})
    }
});
profileRouter.post("/updatechatnow",async(req,res)=>{
    try {
const {id}=req.body;
        let users=await User.updateOne({_id:id},{
            $inc:{
                chatnow:1
            }
        });
        res.json(users);
    } catch (e) {
        res.status(500).json({mes:e})
    }
});
profileRouter.post("/updatesupport",async(req,res)=>{
    try {
const {id}=req.body;
        let users=await User.updateOne({_id:id},{
            $set:{
                support:true
            }
        });
        res.json(users);
    } catch (e) {
        res.status(500).json({mes:e})
    }
});
module.exports=profileRouter;