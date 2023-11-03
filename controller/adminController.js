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
      const users = await User.aggregate([
        {
          $match: { name:{$regex: new RegExp(name, 'i'),} }, // Match documents with the specified name
        },
        {
          $group: {
            _id: '$name',
            users: { $push: '$$ROOT' },
            count: { $sum: 1 },
          },
        },
        {
          $project: {
            _id: 0, // Exclude _id field
            count: 0, // Exclude count field
          },}
        // {
        //   $match: { count: { $gt: 1 } },
        // },
      ]);
      let filteredUsers = users
      .filter(user => user.email !== email)
      .map(user => user.users)
      .flat();
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
        const {email,
          gender,page,ages,
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
          longitude,
          latitude,
          maxDistanceKm,
          citylocation,
          statelocation,
          location}=req.body;
        const itemsPerPage = 100;
        
        if(maxDistanceKm){
          const userLatitude = parseFloat(latitude);
          const userLongitude = parseFloat(longitude);
          const maxDistance = parseInt(maxDistanceKm*1000); 
          let users = await User.find(
            {
              location: {
                $near: {
                  type: 'Point',
                  coordinates: [longitude, latitude]
                },
                $maxDistance: maxDistanceKm
              }
            }
          );
          
      
//           if (!email) {
//             return res.status(400).json({ error: 'Email is required in the request body.' });
//           }
        
//           if (!gender) {
//             return res.status(400).json({ error: 'Gender or religion is required in the request body.' });
//           }
        
//           // Filter users based on gender and religion while excluding the user's own data
          let filteredUsers = users.filter(user => user.email !== email);
//         // console.log(filteredUsers);
//           if (gender) {
//             filteredUsers = filteredUsers.filter(user => user.gender === gender);
//           }
        
//           if(religionList.length){
//             filteredUsers = filteredUsers.filter(user => religionList.includes(user.religion) );

//          }
//           if(ages.length){
//             const intList = ages.map(str => parseInt(str));
//             console.log(intList);  
//             console.log(intList[0]);
//              filteredUsers = filteredUsers.filter(user => user.age >= intList[0] && user.age <= intList[1] );

//           }
//           if(kundaliDoshList.length){
//             console.log("ok")
//             filteredUsers = filteredUsers.filter(user => kundaliDoshList.includes(user.kundalidosh) );

//          }
//          if(maritalStatusList.length){
//           filteredUsers = filteredUsers.filter(user => maritalStatusList.includes(user.martialstatus) );

//        }
//        if(dietList.length){
//         filteredUsers = filteredUsers.filter(user => dietList.includes(user.diet) );

//      }
//      if(dietList.length){
//       filteredUsers = filteredUsers.filter(user => dietList.includes(user.diet) );

//    }
//    if(drinkList.length){
//     filteredUsers = filteredUsers.filter(user => drinkList.includes(user.drink) );

//  }
//  if(smokeList.length){
//   filteredUsers = filteredUsers.filter(user => smokeList.includes(user.smoke) );

// }
// if(disabilityList.length){
//   filteredUsers = filteredUsers.filter(user => disabilityList.includes(user.disability) );

// }
//   if (heightList.length) {
//     const [minHeight, maxHeight] = heightList.map(str => parseFloat(str.split(" ")[0]));
//   console.log(minHeight);
//     filteredUsers = filteredUsers.filter(user => {
//       const userHeight = parseFloat(user.height.split(" ")[0]);
//       return userHeight >= minHeight && userHeight <= maxHeight;
//     });
//   }


// if(educationList.length){
//   filteredUsers = filteredUsers.filter(user => educationList.includes(user.education) );

// }
// if(professionList.length){
//   filteredUsers = filteredUsers.filter(user => professionList.includes(user.profession) );

// }
// if(incomeList.length){
//   filteredUsers = filteredUsers.filter(user => incomeList.includes(user.income) );

// }
// if(location.length){
//   filteredUsers = filteredUsers.filter(user => location.includes(user.country) );

// }
// if(statelocation.length){
//   filteredUsers = filteredUsers.filter(user => location.includes(user.state) );

// }
// if(citylocation.length){
//   filteredUsers = filteredUsers.filter(user => location.includes(user.city) );

// }
// filteredUsers.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

//           console.log(filteredUsers);
          // Paginate the results
          // const startIndex = (page - 1) * itemsPerPage;
          // const endIndex = startIndex + itemsPerPage;
          // const paginatedUsers = filteredUsers.slice(startIndex, endIndex);
        
          res.json(
            filteredUsers,
          );
        }else{
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
            filteredUsers = filteredUsers.filter(user => kundaliDoshList.includes(user.kundalidosh) && user.religion=="Hindu" );

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

  if (heightList.length) {
    const [minHeight, maxHeight] = heightList.map(str => parseFloat(str.split(" ")[0]));
  console.log(minHeight)
    filteredUsers = filteredUsers.filter(user => {
      const userHeight = parseFloat(user.height.split(" ")[0]);
      return userHeight >= minHeight && userHeight <= maxHeight;
    });
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
  filteredUsers = filteredUsers.filter(user => location.includes(user.country) );

}
if(statelocation.length){
  filteredUsers = filteredUsers.filter(user => statelocation.includes(user.state) );

}
if(citylocation.length){
  filteredUsers = filteredUsers.filter(user => citylocation.includes(user.city) );

}
filteredUsers.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

          // console.log(filteredUsers);
          // Paginate the results
          // const startIndex = (page - 1) * itemsPerPage;
          // const endIndex = startIndex + itemsPerPage;
          // const paginatedUsers = filteredUsers.slice(startIndex, endIndex);
        
          res.json(
            filteredUsers,
          );
        }
       
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
module.exports.getallnotification = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const perPage = parseInt(req.query.perPage) || 10;

    const skipCount = (page - 1) * perPage;

    const notifications = await AdminNotification.find({})
      .sort({ _id: 1 })
      .skip(skipCount)
      .limit(perPage);

    res.json(notifications);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};

module.exports.searchuserbydistance=async(req,res)=>{
  try {
    const{longitude,latitude,maxDistanceKm,email}=req.body;
  
  const lon = parseFloat(longitude);
  const lat = parseFloat(latitude);

  const users = await User.find({$and:[
  {  lng: { $gte: lon - (maxDistanceKm / 111.32), $lte: lon + (maxDistanceKm / 111.32) },},
    {lat: { $gte: lat - (maxDistanceKm / (111.32 * Math.cos(lat * (Math.PI / 180)))), $lte: lat + (maxDistanceKm / (111.32 * Math.cos(lat * (Math.PI / 180)))) }}
  ]});
  let filteredUsers = users.filter(user => user.email !== email);

res.json(filteredUsers);
  } catch (e) {
    res.status(500).json({mes:e.message})
  }
}