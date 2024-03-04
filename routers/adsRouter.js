const express=require("express");
const { createads, getallads, deleteads } = require("../controller/adsController");

 const adsRouter=express.Router();

 adsRouter.post("/createads",createads);
 adsRouter.post("/getads",getallads);
 adsRouter.post("/deleteads",deleteads);

module.exports=adsRouter;