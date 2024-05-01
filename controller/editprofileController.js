
const express = require("express");
const EditProfiles = require("../models/Editprofile");
const AdminSearch = require("../models/AdminSearchProfile");

const editprofileRouter = express.Router();

editprofileRouter.post("/createeditprofile",async(req,res)=>{
    try {
        const { images,aboutme,patnerpref, userid ,isBlur,gender,phone,timeofbirth,placeofbirth,kundalidosh,martialstatus,profession,religion,
            location1,city,state,country,name,surname,lat,lag,diet,age,disability,puid,drink,education,height,income} = req.body;

        let user = await EditProfiles({ userid,images,aboutme,patnerpref,isBlur,gender,phone,timeofbirth,placeofbirth,kundalidosh,martialstatus,profession,religion,
            location1,city,state,country,name,surname,lat,lag,diet,age,disability,puid,drink,education,height,income });
        user = await user.save();
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
        const { searchidprofile,searchnameprofile,searchphoneprofile,searchsurprofile,searchemailprofile, searchDistance, age, religion, kundlidosh, marital_status, diet, smoke, drink, disability, height, education, profession, income, location, email,adminname } = req.body;

        let user = await AdminSearch({ searchidprofile,searchnameprofile,searchphoneprofile,searchsurprofile,searchemailprofile, searchDistance, age, religion, kundlidosh, marital_status, diet, smoke, drink, disability, height, education, profession, income, location, email,adminname });
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