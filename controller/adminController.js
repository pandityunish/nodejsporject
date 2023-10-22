const AdminNotification = require("../models/AdminNotification");
const User = require("../models/User");
const AdminModel = require("../models/adminmodel");
const GeoJSON = require('geojson');

module.exports.findadminuser=async(req,res)=>{
    try {
        const{email}=req.body;
        let user=await AdminModel.findOne({email});
        res.json(user);
    } catch (e) {
        res.status(500).json({mes:e.message})
    }
}
module.exports.getunapproveduser=async(req,res)=>{
    try {
       const {email}=req.body;
        let users=await User.find({});
        let filteredUsers = users.filter(user => user.email !== email);
        filteredUsers=filteredUsers.filter(user=>user.status === ''||user.status === 'block'|| user.status === 'report');
        res.json(filteredUsers);
    } catch (e) {
        res.status(500).json({mes:e.message});
    }
}

module.exports.updateuserstatus=async(req,res)=>{
    try {
       const {email}=req.body;
        let user=await User.updateOne({email},{$set:{
            status:"approved"
        }});
       
        res.json(user);
    } catch (e) {
        res.status(500).json({mes:e.message});
    }
}
module.exports.searchuserbyemail=async(req,res)=>{
    try {
      const {searchemail,email}=req.body;
      let users=await User.find({email:searchemail});
      let filteredUsers = users.filter(user => user.email !== email);
      res.json(filteredUsers);
    } catch (e) {
      res.status(500).json({mes:e.message})
    }
  }
  module.exports.searchuserbyid=async(req,res)=>{
    try {
      const {puid,email}=req.body;
      let users=await User.find({puid:puid});
      let filteredUsers = users.filter(user => user.email !== email);
      res.json(filteredUsers);
    } catch (e) {
      res.status(500).json({mes:e.message})
    }
  }
  module.exports.searchuserbyphoneunmber=async(req,res)=>{
    try {
      const {phonenumber,email}=req.body;
      let users=await User.find({phone:phonenumber});
      let filteredUsers = users.filter(user => user.email !== email);
      res.json(filteredUsers);
    } catch (e) {
      res.status(500).json({mes:e.message})
    }
  }
  module.exports.searchuserbyname=async(req,res)=>{
    try {
      const {name,email}=req.body;
      console.log(name);
      let users=await User.find({name:name});
      let filteredUsers = users.filter(user => user.email !== email );
      console.log(filteredUsers);
      res.json(filteredUsers);
    } catch (e) {
      res.status(500).json({mes:e.message})
    }
  }
  module.exports.searchuserbysurname=async(req,res)=>{
    try {
      const {surname,email}=req.body;
      let users=await User.find({surname});
      let filteredUsers = users.filter(user => user.email !== email );
      res.json(filteredUsers);
    } catch (e) {
      res.status(500).json({mes:e.message})
    }
  }
  module.exports.updateuserverifystatus=async(req,res)=>{
    try {
      const {email}=req.body;
      
      let users=await User.updateOne({email},{
        $set:{
        verifiedstatus:"verified"
      }});
      res.json(users);
    } catch (e) {
      res.status(500).json({mes:e.message})
    }
  }
  module.exports.updateuserunverifystatus=async(req,res)=>{
    try {
      const {email}=req.body;
      
      let users=await User.updateOne({email},{
        $set:{
        verifiedstatus:"unverified"
      }});
      res.json(users);
    } catch (e) {
      res.status(500).json({mes:e.message})
    }
  }
  module.exports.blockuserbyadmin=async(req,res)=>{
    try {
      const {email}=req.body;
      
      let users=await User.updateOne({email},{
        $set:{
        status:"block"
      }});
      res.json(users);
    } catch (e) {
      res.status(500).json({mes:e.message})
    }
  }
  module.exports.unblockuserbyadmin=async(req,res)=>{
    try {
      const {email}=req.body;
      
      let users=await User.updateOne({email},{
        $set:{
        status:""
      }});
      res.json(users);
    } catch (e) {
      res.status(500).json({mes:e.message})
    }
  }
  module.exports.reportuserbyadmin=async(req,res)=>{
    try {
      const {email}=req.body;
      
      let users=await User.updateOne({email},{
        $set:{
        status:"report"
      }});
      res.json(users);
    } catch (e) {
      res.status(500).json({mes:e.message})
    }
  }
  module.exports.unreportuserbyadmin=async(req,res)=>{
    try {
      const {email}=req.body;
      
      let users=await User.updateOne({email},{
        $set:{
        status:""
      }});
      res.json(users);
    } catch (e) {
      res.status(500).json({mes:e.message})
    }
  }
  module.exports.searchusers=async(req,res)=>{
    try {
        const {email,gender,page,ages,
           religionList,
          kundaliDoshList,
          maritalStatusList,
          dietList,
          drinkList,
          smokeList,
          disabilityList,
          heightList,
          educationList,
          professionList,
          incomeList,
          location}=req.body;
        const itemsPerPage = 100;
        let users=await User.find({});   
      
          if (!email) {
            return res.status(400).json({ error: 'Email is required in the request body.' });
          }
        
          if (!gender) {
            return res.status(400).json({ error: 'Gender or religion is required in the request body.' });
          }
        
          // Filter users based on gender and religion while excluding the user's own data
          let filteredUsers = users.filter(user => user.email !== email);
        // console.log(filteredUsers);
          if (gender) {
            filteredUsers = filteredUsers.filter(user => user.gender === gender);
          }
        
          if(religionList.length){
            filteredUsers = filteredUsers.filter(user => religionList.includes(user.religion) );

         }
          if(ages.length){
            const intList = ages.map(str => parseInt(str));
            console.log(intList);  
            console.log(intList[0]);
             filteredUsers = filteredUsers.filter(user => user.age >= intList[0] && user.age <= intList[1] );

          }
          if(kundaliDoshList.length){
            console.log("ok")
            filteredUsers = filteredUsers.filter(user => kundaliDoshList.includes(user.kundalidosh) );

         }
         if(maritalStatusList.length){
          filteredUsers = filteredUsers.filter(user => maritalStatusList.includes(user.martialstatus) );

       }
       if(dietList.length){
        filteredUsers = filteredUsers.filter(user => dietList.includes(user.diet) );

     }
     if(dietList.length){
      filteredUsers = filteredUsers.filter(user => dietList.includes(user.diet) );

   }
   if(drinkList.length){
    filteredUsers = filteredUsers.filter(user => drinkList.includes(user.drink) );

 }
 if(smokeList.length){
  filteredUsers = filteredUsers.filter(user => smokeList.includes(user.smoke) );

}
if(disabilityList.length){
  filteredUsers = filteredUsers.filter(user => disabilityList.includes(user.disability) );

}
if(heightList.length){
  filteredUsers = filteredUsers.filter(user => heightList.includes(user.height) );

}
if(educationList.length){
  filteredUsers = filteredUsers.filter(user => educationList.includes(user.education) );

}
if(professionList.length){
  filteredUsers = filteredUsers.filter(user => professionList.includes(user.profession) );

}
if(incomeList.length){
  filteredUsers = filteredUsers.filter(user => incomeList.includes(user.income) );

}
if(location.length){
  filteredUsers = filteredUsers.filter(user => location.includes(user.location) );

}
filteredUsers.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

          console.log(filteredUsers);
          // Paginate the results
          const startIndex = (page - 1) * itemsPerPage;
          const endIndex = startIndex + itemsPerPage;
          const paginatedUsers = filteredUsers.slice(startIndex, endIndex);
        
          res.json(
           paginatedUsers,
          );
    } catch (e) {
        res.status(500).json({mes:e.message})
    }
}

module.exports.addtonotification=async(req,res)=>{
  try {
    const {userid,useremail,title,userimage}=req.body;
    let notifications=AdminNotification({
      userid,useremail,userimage,title
    });
    notifications=notifications.save();
    res.json(notifications);
  } catch (e) {
    res.status(500).json({mes:e.message})
  }
}
module.exports.getallnotification=async(req,res)=>{
  try {
    let notifications=await AdminNotification.find({}).sort({_id:1});

    res.json(notifications);
  } catch (e) {
    res.status(500).json({mes:e.message})
  }
}
module.exports.searchuserbydistance=async(req,res)=>{
  try {
    const{longitude,latitude,maxDistanceKm,email}=req.body;
    // const earthRadiusKm = 6371; // Approximate radius of the Earth in kilometers
  // const maxDistanceRadians = maxDistanceKm / earthRadiusKm;
  // const point = GeoJSON.Point([longitude, latitude]);
  const lon = parseFloat(longitude);
  const lat = parseFloat(latitude);


  


  const users = await User.find({$and:[
  {  lng: { $gte: lon - (maxDistanceKm / 111.32), $lte: lon + (maxDistanceKm / 111.32) },},
    {lat: { $gte: lat - (maxDistanceKm / (111.32 * Math.cos(lat * (Math.PI / 180)))), $lte: lat + (maxDistanceKm / (111.32 * Math.cos(lat * (Math.PI / 180)))) }}
  ]});
  let filteredUsers = users.filter(user => user.email !== email);
//     const users = await User.find({
//       $and: [
//         {
//           lng: {
//             $gte: longitude - maxDistanceRadians, // Adjust the distance as needed
//             $lte: longitude + maxDistanceRadians,
//           },
//         },
//         {
//           lat: {
//             $gte: latitude - maxDistanceRadians, // Adjust the distance as needed
//             $lte: latitude + maxDistanceRadians,
//           },
//         },
//       ],
//     });
res.json(filteredUsers);
  } catch (e) {
    res.status(500).json({mes:e.message})
  }
}