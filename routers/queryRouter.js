const express=require("express");
const { postQuery } = require("../controller/queryController");

 const queryRouter=express.Router();

queryRouter.post("/postquery",postQuery);

module.exports=queryRouter;