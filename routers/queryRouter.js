const express=require("express");
const { postQuery, updateMaintenance, getMaintenance, getBubbles, createBubbles, updateBubbles, getQuery } = require("../controller/queryController");

 const queryRouter=express.Router();

queryRouter.post("/postquery",postQuery);
queryRouter.post("/getquery",getQuery);
queryRouter.post("/updatemaintenance",updateMaintenance);
queryRouter.get("/findmaintenance",getMaintenance);
queryRouter.get("/getbubbles",getBubbles);
queryRouter.get("/createbubbles",createBubbles);
queryRouter.post("/updatebubbles",updateBubbles);

module.exports=queryRouter;