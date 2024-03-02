const express=require("express");
const { createads, getallads } = require("../controller/adsController");

 const adsRouter=express.Router();

 adsRouter.post("/createads",createads);
 adsRouter.post("/getads",getallads);

module.exports=adsRouter;