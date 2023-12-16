const AdminAddedUsers = require("../models/AdminAddedUser");
const User = require("../models/User");


module.exports.getalldata=async(req,res)=>{
    try {
        const {userid}=req.body;
        let finduser=await AdminAddedUsers.findOne({userid:userid});
        console.log()
        let allusers=await User.find({ _id: { $in: finduser.userlist } });
        res.json(allusers);
    } catch (e) {
        res.status(500).json({mes:e.message})
    }
}

module.exports.postalldata=async(req,res)=>{
    try {
        const {id,listofids}=req.body;
        let user=await AdminAddedUsers.findOne({_id:id});
        if(!user){
           let newuser=AdminAddedUsers({userid:id,userlist:listofids});
           newuser.save();
           res.json(newuser);
        }else{
            const users=await AdminAddedUsers.updateOne({id},{$addToSet:{
                userlist:{$each:listofids}
            }})
            res.json(users);
        }
       
    } catch (e) {
        res.status(500).json({mes:e.message})
    }
}