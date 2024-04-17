const express=require("express");
const { createuser, getallusers, getuserdata, finduser, createsavepref, getusersavedpref, searchuserbyid, connectnow, rejectrequest, acceptrequest, addtosortlist, addtoblocklists, canclereq, unblockuser, removeshortuser, addtoReportlist, removeReportlist, edituserprofile, uploadvideo, deletevideo, pushnotification, pushactivities, deleteaccount, getuserdatabyid, updatelocation, cleartoken, addtoken, updatelogin, searchusersbyuser, addtounapproveblock, removefromunapproveblock, getuserdatabypuid, updateeditstatus, updateblur, updateemail, deleteaccountfromadmin, pushadstouser, pulladstouser } = require("../controller/authController");
const { searchuserbydistance, findthedeleteuser } = require("../controller/adminController");
const { getalldata, addtoboostprofile, boosttoall, addtoinvisibleprofile, invisibletoall, getboostprofile, getinvisibleprofile, getshareprofile, addtoshareprofile, countofnotification, updatenotification } = require("../controller/adminAddedController");

const authRouter=express.Router();

authRouter.post("/auth/createuser",createuser);
authRouter.post("/auth/getalluser",getallusers);
authRouter.get("/auth/getuser/:email",getuserdata);
authRouter.get("/auth/getuserbyid/:_id",getuserdatabyid);
authRouter.get("/auth/finduser/:email",finduser);
authRouter.get("/auth/getuserbypuid/:puid",getuserdatabypuid);

authRouter.post("/auth/createsavedpref",createsavepref);
authRouter.get("/auth/getsavedpref/:email",getusersavedpref);
authRouter.post("/auth/getuserbyid",searchuserbyid);
authRouter.post("/auth/sendconnect",connectnow);
authRouter.post("/auth/rejectreq",rejectrequest);
authRouter.post("/auth/addtounapproveblock",addtounapproveblock);
authRouter.post("/auth/removeunapproveblock",removefromunapproveblock);
authRouter.post("/auth/acceptreq",acceptrequest);
authRouter.post("/auth/addtosortlist",addtosortlist);
authRouter.post("/auth/addtoblocklist",addtoblocklists)
authRouter.post("/auth/canclereq",canclereq)
authRouter.post("/auth/unblock",unblockuser)
authRouter.post("/auth/unshortlist",removeshortuser)
authRouter.post("/auth/addtoreportlist",addtoReportlist)
authRouter.post("/auth/removereportlist",removeReportlist)
authRouter.post("/auth/editprofile",edituserprofile)
authRouter.post("/auth/uploadvideo",uploadvideo)
authRouter.post("/auth/delete",deletevideo)
authRouter.post("/auth/pushnotification",pushnotification)
authRouter.post("/auth/pushactivities",pushactivities);
authRouter.post("/auth/deleteaccount",deleteaccount);
authRouter.post("/auth/updatelocation",updatelocation);
authRouter.post("/auth/searchbydistance",searchuserbydistance);
authRouter.post("/auth/searchusersbyuser",searchusersbyuser);
authRouter.post("/auth/updateeditstatus",updateeditstatus);

authRouter.post("/auth/cleartoken",cleartoken);
authRouter.post("/auth/addtoken",addtoken);
authRouter.post("/auth/updatelogin",updatelogin);
authRouter.post("/auth/getadminuser",getalldata);
authRouter.post("/auth/addtoboostprofile",addtoboostprofile);
authRouter.post("/auth/boostallprofile",boosttoall);
authRouter.post("/auth/addtoinvisibleprofile",addtoinvisibleprofile);
authRouter.post("/auth/inivisibletoall",invisibletoall);
authRouter.post("/auth/getboostprofile",getboostprofile);
authRouter.post("/auth/getinvisibleprofile",getinvisibleprofile);
authRouter.post("/auth/getshareprofile",getshareprofile);
authRouter.post("/auth/addtoshareprofile",addtoshareprofile);
authRouter.post("/auth/updateblur",updateblur);
authRouter.post("/auth/numberofnoti",countofnotification);
authRouter.post("/auth/updatenoti",updatenotification);
authRouter.post("/auth/editemail",updateemail);
authRouter.post("/auth/addads",pushadstouser);
authRouter.post("/auth/removeads",pulladstouser);

authRouter.post("/auth/deleteaccountfromadmin",deleteaccountfromadmin);
authRouter.post("/auth/findthedeleteuser",findthedeleteuser);

module.exports=authRouter;