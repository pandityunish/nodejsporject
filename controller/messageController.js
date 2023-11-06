const User = require("../models/User");
const Message = require("../models/messagemodel");

module.exports.addmessage=async(req,res)=>{
    try {
        const {from,to,text,uid,status,time,token}=req.body;
        const data=await Message.create({
            text:text,
            users:[from,to],
            sender:from,
            uid:uid,
            status:status,
            time:time,
            token:token
        });
        if(data) return res.json({msg:"Message added successfully"});
        return res.json({msg:"Failed to add message to the database"})
    } catch (error) {
        res.status(500).json({mes:e.message})
    }
}
module.exports.getallmessage=async(req,res)=>{
    try {
        const {from,to}= req.body;
        const messages=await Message.find({
            users:{
               $all:[from,to] 
            },

        }).sort({updateAt:1});
        // const projectMessages=messages.map((msg)=>{
        //     return{
        //         fromSelf:msg.sender.toString()===from,
        //         message:msg.text,
        //     }
        // });
        res.json(messages);
    } catch (e) {
        res.status(500).json({mes:e.message})
    }
}
module.exports.createusermessage=async(req,res)=>{
    try {
        const{username,userimage,userid,lastmessage,lasttime,email,senduseremail,
            senduserimage,senduserid,sendusername
        }=req.body;

     console.log(senduseremail);
        let user=await User.updateOne({email:email},{
            $addToSet:{
              chats:{
                username:username,
                userimage:userimage,
                email:senduseremail,
                userid:userid,
                lastmessage:lastmessage,
                lasttime:lasttime
              }
            }
        });
        let senduser=await User.updateOne({email:senduseremail},{
            $addToSet:{
              chats:{
                username:sendusername,
                userimage:senduserimage,
                email:email,
                userid:senduserid,
                lastmessage:lastmessage,
                lasttime:lasttime
              }
            }
        });
        res.json({user,senduser});
    } catch (e) {
        res.status(500).json({mes:e.message})
    }
}
module.exports.updatelastmessage = async (req, res) => {
    try {
      const { email, chatemail, lastmessage1, lasttime, senduseremail, sendchatemail } = req.body;
  
      // Find the user and populate the 'chats' field
      let user = await User.findOne({ email }).populate('chats');
  
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      // Find the chat within the user's chats array
      const chat = user.chats.find(item => item.email == chatemail);
  
      if (!chat) {
        return res.status(404).json({ message: 'Chat not found' });
      }
  
      // Update the chat's properties
      chat.lastmessage = lastmessage1;
      chat.lasttime = lasttime;
  
      // Save the user document to persist the changes
      await user.save();
  
      // Find the sender user and populate the 'chats' field
      let senderuser = await User.findOne({ email: senduseremail }).populate('chats');
  
      if (!senderuser) {
        return res.status(404).json({ message: 'Sender user not found' });
      }
  
      // Find the chat within the sender user's chats array
      const senderchat = senderuser.chats.find(item => item.email == sendchatemail);
  
      if (!senderchat) {
        return res.status(404).json({ message: 'Sender chat not found43' });
      }
  
      // Update the sender chat's properties
      senderchat.lastmessage = lastmessage1;
      senderchat.lasttime = lasttime;
  
      // Save the sender user document to persist the changes
      await senderuser.save();
  
      res.json({ user, senderuser });
    } catch (e) {
      res.status(500).json({ message: e.message });
    }
  };

module.exports.findthenumberofunseen=async(req,res)=>{
try {
    const {from,to,userid}= req.body;
    const messages=await Message.find({
        users:{
           $all:[from,to] 
        },

    }).sort({updateAt:1});
  let  filteredmessage = messages.filter(message =>  message.status === 'unseen');
  filteredmessage=filteredmessage.filter(message=>message.users[1]===userid);
   res.json(filteredmessage.length);
} catch (e) {
    res.status(500).json({mes:e.message})
}
}
module.exports.findallnumberofunseen=async(req,res)=>{
  try {
      const {userid}= req.body;
      const messages=await Message.find({
        users:{
          $all:[userid] 
       },
      });
    let  filteredmessage = messages.filter(message =>  message.status === 'unseen');
    filteredmessage=filteredmessage.filter(message=>message.users[1]===userid);

     res.json(filteredmessage.length);
  } catch (e) {
      res.status(500).json({mes:e.message})
  }
  }
module.exports.updatestatusofmessage=async(req,res)=>{
    try {
        const {from,to,userid}= req.body;
        let messages=await Message.find({
            users:{
               $all:[from,to] 
            },
    
        }).sort({updateAt:1});
        messages=messages.filter(message=>message.users[1]===userid);
        const updateResult = await Message.updateMany(
            { _id: { $in: messages.map(message => message._id) } }, // Filter based on the IDs of the filtered messages
            { $set: { status: 'seen' } } // Update operation to set the status field to 'seen'
          ); 
          res.json(updateResult);
    } catch (e) {
        res.status(500).json({mes:e.message});
    }
}
