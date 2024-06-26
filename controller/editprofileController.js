
const express = require("express");
const EditProfiles = require("../models/Editprofile");
const AdminSearch = require("../models/AdminSearchProfile");
const EditAdminModel = require("../models/EditAdmin");
const BioDataProfile = require("../models/BioDataModel");

const editprofileRouter = express.Router();

editprofileRouter.post("/createeditprofile",async(req,res)=>{
    try {
        const { images,aboutme,patnerpref, userid ,isBlur,gender,phone,timeofbirth,placeofbirth,kundalidosh,martialstatus,profession,religion,
            location1,city,state,country,name,surname,lat,lng,diet,age,disability,puid,drink,education,height,income,dateofbirth,editname} = req.body;

        let user = await EditProfiles({ userid,images,aboutme,patnerpref,isBlur,gender,phone,timeofbirth,placeofbirth,kundalidosh,martialstatus,profession,religion,
            location1,city,state,country,name,surname,lat,lng,diet,age,disability,puid,drink,education,height,income,dateofbirth,editname });
        user = await user.save();
        res.json(user);
    } catch (e) {
        res.status(500).json({ mes: e })
    } 
});
editprofileRouter.post("/createbiodata",async(req,res)=>{
    try {
        const { images,aboutme,patnerpref, userid ,profession,education,editname} = req.body;

        let user = await BioDataProfile({ images,aboutme,patnerpref, userid ,profession,education,editname});
        user = await user.save();
        res.json(user);
    } catch (e) {
        res.status(500).json({ mes: e })
    } 
});
editprofileRouter.post("/getbiodata",async(req,res)=>{
    try {
        const { userid } = req.body;
        let user = await BioDataProfile.find({userid});
        res.json(user);
    } catch (e) {
        res.status(500).json({ mes: e })
    } 
});
editprofileRouter.post("/createeditadminprofile",async(req,res)=>{
    try {
        const { email, username, permissions,editname } = req.body;
      
          let user = await EditAdminModel({ email, username, permissions,editname })
          user = await user.save();
    
          res.json({ user });
        
    } catch (e) {
        res.status(500).json({ mes: e })
    } 
});
editprofileRouter.post("/getadmineditprofile",async(req,res)=>{
    try {
        const { email } = req.body;
        let user = await EditAdminModel.find({email});
        res.json(user);
    } catch (e) {
        res.status(500).json({ mes: e })
    } 
});
editprofileRouter.post("/geteditprofile",async(req,res)=>{
    try {
        const { userid } = req.body;
        let user = await EditProfiles.find({userid});
        res.json(user);
    } catch (e) {
        res.status(500).json({ mes: e })
    } 
});
editprofileRouter.post("/addadminsearch", async (req, res) => {
    try {
        const { searchidprofile,searchnameprofile,searchphoneprofile,searchsurnameprofile,searchemailprofile, searchDistance, age, religion, kundlidosh, marital_status, diet, smoke, drink, disability, height, education, profession, income, location, email,adminname } = req.body;

        let user = await AdminSearch({ searchidprofile,searchnameprofile,searchphoneprofile,searchsurnameprofile,searchemailprofile, searchDistance, age, religion, kundlidosh, marital_status, diet, smoke, drink, disability, height, education, profession, income, location, email,adminname });
        user = await user.save();
        res.json(user);
    } catch (e) {
        res.status(500).json({ mes: e })
    }
});
editprofileRouter.get("/getadminsearch",async(req,res)=>{
    try {
        
        let user = await AdminSearch.find({}).sort({createdAt:-1});
        res.json(user);
    } catch (e) {
        res.status(500).json({ mes: e })
    } 
});
module.exports=editprofileRouter;