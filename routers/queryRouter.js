const express=require("express");
const { postQuery, updateMaintenance, getMaintenance } = require("../controller/queryController");

 const queryRouter=express.Router();

queryRouter.post("/postquery",postQuery);
queryRouter.post("/updatemaintenance",updateMaintenance);
queryRouter.get("/findmaintenance",getMaintenance);

module.exports=queryRouter;