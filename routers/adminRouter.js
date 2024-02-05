const express=require("express");
const { findadminuser, getunapproveduser, updateuserstatus, searchuserbyemail, searchuserbyname, searchuserbysurname, blockuserbyadmin, unblockuserbyadmin, reportuserbyadmin, unreportuserbyadmin, updateuserverifystatus, updateuserunverifystatus, searchusers, searchuserbyid, searchuserbyphoneunmber, addtonotification, getallnotification, searchnotification, findnumberofusers, updateeditstatus, getoldestfirst, getmalefirst, gefemalefirst, getminagefirst, getmaxagefirst, getmaxheightfirst, getminheightfirst, getminincomefirst, getmaxincomefirst, getwithphoto, getwithoutphoto, findnumberofunseennoti, searchnotibydate, searchuserbydate } = require("../controller/adminController");
const { postalldata, updateallvalue, addtosendlink } = require("../controller/adminAddedController");

const adminRouter=express.Router();
adminRouter.post("/admin/findadminuser",findadminuser);
adminRouter.post("/admin/getusers",getunapproveduser);
adminRouter.post("/admin/updateuserstatus",updateuserstatus);
adminRouter.post("/admin/updateuserverifystatus",updateuserverifystatus);
adminRouter.post("/admin/updateuserunverifystatus",updateuserunverifystatus);
adminRouter.post("/admin/blockuserbyadmin",blockuserbyadmin);
adminRouter.post("/admin/unblockuserbyadmin",unblockuserbyadmin);
adminRouter.post("/admin/reportuserbyadmin",reportuserbyadmin);
adminRouter.post("/admin/unreportuserbyadmin",unreportuserbyadmin);
adminRouter.post("/admin/searchuserbyemail",searchuserbyemail);
adminRouter.post("/admin/searchuserbyname",searchuserbyname);
adminRouter.post("/admin/searchuserbysurname",searchuserbysurname);
adminRouter.post("/admin/searchusers",searchusers);
adminRouter.post("/admin/searchusersbyid",searchuserbyid);
adminRouter.post("/admin/searchusersbyphone",searchuserbyphoneunmber);
adminRouter.post("/admin/addnotification",addtonotification);
adminRouter.get("/admin/getallnotification",getallnotification);
adminRouter.post("/admin/searchnotification",searchnotification);
adminRouter.post("/admin/postadminid",postalldata);
adminRouter.post("/admin/updateeditstatus",updateeditstatus);
adminRouter.get("/admin/getnumberofusers",findnumberofusers);
adminRouter.get("/admin/addthefield",updateallvalue);
adminRouter.post("/admin/addtosendlink",addtosendlink);
adminRouter.get("/admin/getoldestfirst",getoldestfirst);
adminRouter.get("/admin/getmalefirst",getmalefirst);
adminRouter.get("/admin/getfemalefirst",gefemalefirst);
adminRouter.get("/admin/getminiagefirst",getminagefirst);
adminRouter.get("/admin/getmaxagefirst",getmaxagefirst);
adminRouter.get("/admin/getminiheightfirst",getminheightfirst);
adminRouter.get("/admin/getmaxheightfirst",getmaxheightfirst);
adminRouter.get("/admin/getminiincomefirst",getminincomefirst);
adminRouter.get("/admin/getmaxincomefirst",getmaxincomefirst);
adminRouter.get("/admin/getwithphtotfirst",getwithphoto);
adminRouter.get("/admin/getwithoutphtotfirst",getwithoutphoto);
adminRouter.get("/admin/getnumberofunreadnoti",findnumberofunseennoti);
adminRouter.post("/admin/searchnotibyid",searchnotibydate);
adminRouter.post("/admin/searchuserbydate",searchuserbydate)


// adminRouter.get()


module.exports=adminRouter;