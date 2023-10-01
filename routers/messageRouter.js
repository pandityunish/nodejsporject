const { addmessage, getallmessage, createusermessage, updatelastmessage, findthenumberofunseen, updatestatusofmessage } = require("../controller/messageController");

const messageRouter=require("express").Router();

messageRouter.post("/addmessage/",addmessage);
messageRouter.post("/getallmessages/",getallmessage);
messageRouter.post("/user/userchats",createusermessage);
messageRouter.post("/user/updatelastmessage",updatelastmessage);
messageRouter.post("/user/findnumberofunseen",findthenumberofunseen);
messageRouter.post("/user/updatestatusofmessage",updatestatusofmessage);

module.exports=messageRouter;