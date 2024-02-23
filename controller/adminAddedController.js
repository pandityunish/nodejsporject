const AdminAddedUsers = require("../models/AdminAddedUser");
const User = require("../models/User");


module.exports.getalldata=async(req,res)=>{
    try {
        const {userid}=req.body;
        let finduser=await AdminAddedUsers.findOne({userid:userid});
        console.log()
        let allusers=await User.find({ puid: { $in: finduser.userlist } });
        res.json(allusers);
    } catch (e) {
        res.status(500).json({mes:e.message})
    }
}

module.exports.postalldata=async(req,res)=>{
    try {
        const {id,listofids}=req.body;
        for (let index = 0; index < listofids.length; index++) {
            const element = listofids[index];
            let user=await AdminAddedUsers.findOne({userid:element});
        if(!user){
           let newuser=AdminAddedUsers({userid:listofids[index],userlist:[id]});
           newuser.save();
        //    res.json(newuser);
        }else{
            const users=await AdminAddedUsers.updateOne({userid:listofids[index]},{$addToSet:{
                userlist:id
            }})
            // res.json(users);
        }
        }
        res.json({mes:"Successfully added"})
       
    } catch (e) {
        res.status(500).json({mes:e.message})
    }
}

module.exports.updateallvalue=async(req,res)=>{
    try {
      let user=await  User.updateMany({}, { $set: { ["invisibleprofile"]: [] } },);
      res.json(user);
    } catch (e) {
        res.status(500).json({mes:e.message})
    }
}

module.exports.addtosendlink=async(req,res)=>{
    try {
      const {email,value}=req.body;
      let user=await User.updateOne({email:email},{$addToSet:{
        sendlink:value
      }});
    
      
      res.json({user});
    } catch (e) {
      res.status(500).json({mes:e.message})
    }
  }

  module.exports.addtoboostprofile=async(req,res)=>{
    try {
      const {puid,id}=req.body;
      let user=await User.updateOne({puid:puid},{$addToSet:{
        boostprofile:id
      }});
    
      
      res.json({user});
    } catch (e) {
      res.status(500).json({mes:e.message})
    }
  }

  module.exports.boosttoall=async(req,res)=>{
    try {
        const {id}=req.body;
      let user=await  User.updateMany({}, {$addToSet:{
        boostprofile:id
      }});
      res.json(user);
    } catch (e) {
        res.status(500).json({mes:e.message})
    }
}
module.exports.addtoinvisibleprofile=async(req,res)=>{
    try {
      const {puid,id}=req.body;
      let user=await User.updateOne({puid:puid},{$addToSet:{
        invisibleprofile:id
      }});
    
      
      res.json({user});
    } catch (e) {
      res.status(500).json({mes:e.message})
    }
  }

  module.exports.invisibletoall=async(req,res)=>{
    try {
        const {id}=req.body;
      let user=await  User.updateMany({}, {$addToSet:{
        invisibleprofile:id
      }});
      res.json(user);
    } catch (e) {
        res.status(500).json({mes:e.message})
    }
}

module.exports.getboostprofile=async(req,res)=>{
    const {userIds} = req.body;

  try {
    const users = await User.find({ _id: { $in: userIds } });

   

    return res.status(200).json({ users });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
}
module.exports.getinvisibleprofile=async(req,res)=>{
    const {userIds} = req.body; 

  try {
    const users = await User.find({ _id: { $in: userIds } });

   

    return res.status(200).json({ users });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
}