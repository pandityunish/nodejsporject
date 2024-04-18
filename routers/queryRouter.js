const express=require("express");
const { postQuery, updateMaintenance, getMaintenance, getBubbles, createBubbles, updateBubbles, getQuery, getBubblesbydate } = require("../controller/queryController");

 const queryRouter=express.Router();

queryRouter.post("/postquery",postQuery);
queryRouter.post("/getquery",getQuery);
queryRouter.post("/updatemaintenance",updateMaintenance);
queryRouter.get("/findmaintenance",getMaintenance);
queryRouter.get("/getbubbles",getBubbles);
queryRouter.post("/getbubblesbydate",getBubblesbydate);

queryRouter.get("/createbubbles",createBubbles);
queryRouter.post("/updatebubbles",updateBubbles);

module.exports=queryRouter;