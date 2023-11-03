const express=require("express");
const { createuser, getallusers, getuserdata, finduser, createsavepref, getusersavedpref, searchuserbyid, connectnow, rejectrequest, acceptrequest, addtosortlist, addtoblocklists, canclereq, unblockuser, removeshortuser, addtoReportlist, removeReportlist, edituserprofile, uploadvideo, deletevideo, pushnotification, pushactivities, deleteaccount, getuserdatabyid, updatelocation, cleartoken, addtoken, updatelogin, searchusersbyuser } = require("../controller/authController");
const { searchuserbydistance } = require("../controller/adminController");

const authRouter=express.Router();

authRouter.post("/auth/createuser",createuser);
authRouter.post("/auth/getalluser",getallusers);
authRouter.get("/auth/getuser/:email",getuserdata);
authRouter.get("/auth/getuserbyid/:_id",getuserdatabyid);
authRouter.get("/auth/finduser/:email",finduser);
authRouter.post("/auth/createsavedpref",createsavepref);
authRouter.get("/auth/getsavedpref/:email",getusersavedpref);
authRouter.post("/auth/getuserbyid",searchuserbyid);
authRouter.post("/auth/sendconnect",connectnow);
authRouter.post("/auth/rejectreq",rejectrequest);
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

authRouter.post("/auth/cleartoken",cleartoken);
authRouter.post("/auth/addtoken",addtoken);
authRouter.post("/auth/updatelogin",updatelogin);


module.exports=authRouter;