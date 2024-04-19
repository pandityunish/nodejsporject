
const express = require("express");
const EditProfiles = require("../models/Editprofile");

const editprofileRouter = express.Router();

editprofileRouter.post("/createeditprofile",async(req,res)=>{
    try {
        const { images,aboutme,patnerpref, userid } = req.body;

        let user = await EditProfiles({ userid,images,aboutme,patnerpref });
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