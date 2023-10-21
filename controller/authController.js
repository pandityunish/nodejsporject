const DeleteUser = require("../models/DeleteModel");
const notification = require("../models/Notification");
const SavedPrefer = require("../models/Save_Pref");
const User = require("../models/User");

module.exports.createuser=async(req,res)=>{
try {
    const {aboutme,age,puid,diet,lat,lng,disability,drink,imageurls,placeofbirth,timeofbirth,education,height,income,patnerprefs,smoke,displayname,email,religion,name,surname,phone,gender,kundalidosh,martialstatus,profession,location,city,state,country,token,dob}=req.body;
         let existingUser=await User.findOne({email});
        
        if(existingUser){
        return  res.status(400).json({mes:"Email is not available"})
        }
            
        let user=User({aboutme,age,diet,disability,
          puid,
          status:"",
          placeofbirth,timeofbirth,
          drink,education,lat,lng,height,imageurls,income,patnerprefs,smoke,displayname,email,religion,name,surname,phone,gender,kundalidosh,martialstatus,profession,location,city,state,country,token,dob});
        
        user=await user.save();
        res.json(user);
} catch (e) {
    res.status(500).json({mes:e.message})
}
}
module.exports.getuserdata=async(req,res)=>{
  try {
    const {email}=req.params;
    let user=await User.findOne({email});
   
    res.json(user);
  } catch (e) {
      res.status(500).json({mes:e.message})
  }
}
module.exports.getuserdatabyid=async(req,res)=>{
  try {
    const {_id}=req.params;
    let user=await User.findOne({_id});
   
    res.json(user);
  } catch (e) {
      res.status(500).json({mes:e.message})
  }
}
module.exports.getallusers=async(req,res)=>{
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
          lat,
          lng,
          location}=req.body;
        const itemsPerPage = 100;
        let users=await User.find({
         
        });   
        users = users.map(user => user.toObject());
        console.log(gender,
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
          location)
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
            filteredUsers = filteredUsers.filter(user => religionList.includes(user.religion) && user.status === 'approved');

         }
          if(ages.length){
            const intList = ages.map(str => parseInt(str));
            console.log(intList);  
            console.log(intList[0]);
             filteredUsers = filteredUsers.filter(user => user.age >= intList[0] && user.age <= intList[1] && user.status === 'approved');

          }
          if(kundaliDoshList.length){
            console.log("ok")
            filteredUsers = filteredUsers.filter(user => kundaliDoshList.includes(user.kundalidosh) && user.status === 'approved');

         }
         if(maritalStatusList.length){
          filteredUsers = filteredUsers.filter(user => maritalStatusList.includes(user.martialstatus) && user.status === 'approved');

       }
       if(dietList.length){
        filteredUsers = filteredUsers.filter(user => dietList.includes(user.diet) && user.status === 'approved');

     }
     if(dietList.length){
      filteredUsers = filteredUsers.filter(user => dietList.includes(user.diet) && user.status === 'approved');

   }
   if(drinkList.length){
    filteredUsers = filteredUsers.filter(user => drinkList.includes(user.drink) && user.status === 'approved');

 }
 if(smokeList.length){
  filteredUsers = filteredUsers.filter(user => smokeList.includes(user.smoke) && user.status === 'approved');

}
if(disabilityList.length){
  filteredUsers = filteredUsers.filter(user => disabilityList.includes(user.disability) && user.status === 'approved');

}
if(heightList.length){
  filteredUsers = filteredUsers.filter(user => heightList.includes(user.height) && user.status === 'approved');

}
if(educationList.length){
  filteredUsers = filteredUsers.filter(user => educationList.includes(user.education) && user.status === 'approved');

}
if(professionList.length){
  filteredUsers = filteredUsers.filter(user => professionList.includes(user.profession) && user.status === 'approved');

}
if(incomeList.length){
  filteredUsers = filteredUsers.filter(user => incomeList.includes(user.income) && user.status === 'approved');

}
if(location.length){
  filteredUsers = filteredUsers.filter(user => location.includes(user.location) && user.status === 'approved');

}
filteredUsers = filteredUsers.map(user => ({
  ...user,
  distance: calculateDistance(lat, lng, user.lat, user.lng),
}));

filteredUsers.sort((a, b) => a.distance - b.distance);


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
function calculateDistance(lat1, lon1, lat2, lon2) {
  const R = 6371; // Earth radius in kilometers
  const dLat = toRadians(lat2 - lat1);
  const dLon = toRadians(lon2 - lon1);

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRadians(lat1)) * Math.cos(toRadians(lat2)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return R * c;
}

// Helper function to convert degrees to radians
function toRadians(degrees) {
  return degrees * (Math.PI / 180);
}
module.exports.finduser=async(req,res)=>{
  try {
    const {email}=req.params;
    let user=await User.findOne({email});
    if(!user){
      res.status(400).json({mes:"User not found"})
    }else{
      res.status(200).json({mes:"User found",user})
    }
   
  } catch (e) {
    res.status(500).json({mes:e.message})
  }
}
module.exports.createsavepref=async(req,res)=>{
  try {
    const {
      email,
      ageList,
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
  let user=await SavedPrefer.findOne({email});
  if(!user){
    let saved_pref=await SavedPrefer({
      ageList,
      email,
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
      location});
      saved_pref=await saved_pref.save();
      res.json(saved_pref);
  }else{
    const query={email:email};
    const data=await SavedPrefer.updateOne(query,
      {$set:{
          ageList:ageList,
          religionList: religionList, 
          kundaliDoshList: kundaliDoshList, 
  
       
          maritalStatusList: maritalStatusList, 
          dietList: dietList,       
          drinkList: drinkList, 
          smokeList:smokeList,
          disabilityList:disabilityList,
          heightList:heightList,
          educationList:educationList,
          professionList:professionList,
          incomeList:incomeList,
          location:location
        
    }});
    res.json(data);
  }
  
  } catch (e) {
    res.status(500).json({mes:e.message})
  }
}
module.exports.getusersavedpref=async(req,res)=>{
  try {
    const {email}=req.params;
    let user=await SavedPrefer.findOne({email});
    if(!user){
      res.status(404).json({mes:"User Not Found"})
    }else{
      res.json(user) 

    }
  } catch (e) {
    res.status(500).json({mes:e.message})
  }
}
module.exports.edituserprofile=async(req,res)=>{
  try {
    const {imageurls,aboutme,patnerprefs,email}=req.body;
    let user=await User.updateOne({email:email},{aboutme:aboutme,patnerprefs:patnerprefs,imageurls:imageurls,status:""});
    console.log(user);
  } catch (e) {
    res.status(500).json({mes:e.message})
  }
}
module.exports.searchuserbyid=async(req,res)=>{
  try {
    const {puid,email}=req.body;
    
    let users=await User.find({puid});
    let filteredUsers = users.filter(user => user.email !== email && user.status === 'approved');
    res.json(filteredUsers);
  } catch (e) {
    res.status(500).json({mes:e.message})
  }
}
module.exports.connectnow=async(req,res)=>{
  try {
    const {uid,email,sendemail,senduid}=req.body;
    let user=await User.updateOne({email:email},{$addToSet:{
      sendreq:senduid
    }});
    let senduser=await User.updateOne({email:sendemail},{$addToSet:{
      pendingreq:uid
    }});
    
    res.json({user});
  } catch (e) {
    res.status(500).json({mes:e.message})
  }
}
module.exports.rejectrequest=async(req,res)=>{
  try {
    const {uid,email,sendemail,senduid}=req.body;
    let user=await User.updateOne({email:email},{$pull:{
      pendingreq:senduid
    }});
    let senduser=await User.updateOne({email:sendemail},{$pull:{
      sendreq:uid
    }});
    
    res.json({user,senduser});
  } catch (e) {
    res.status(500).json({mes:e.message})
  }
}

module.exports.acceptrequest=async(req,res)=>{
  try {
    const {uid,email,sendemail,senduid}=req.body;
    let user=await User.updateOne({email:email},{$addToSet:{
      friends:senduid
    }},{$pull:{
      pendingreq:senduid
    }});
    let senduser=await User.updateOne({email:sendemail},{$addToSet:{
      friends:uid
    }},{$pull:{
      sendreq:uid
    }});
    
    res.json({user,senduser});
  } catch (e) {
    res.status(500).json({mes:e.message})
  }
}
module.exports.addtosortlist=async(req,res)=>{
  try {
    const {email,senduid}=req.body;
    let user=await User.updateOne({email:email},{$addToSet:{
      shortlist:senduid
    }});
  
    
    res.json({user});
  } catch (e) {
    res.status(500).json({mes:e.message})
  }
}
module.exports.addtoblocklists=async(req,res)=>{
  try {
    const {email,senduid}=req.body;
    let user=await User.updateOne({email:email},{$addToSet:{
      blocklists:senduid
    }});
  
    
    res.json({user});
  } catch (e) {
    res.status(500).json({mes:e.message})
  }
}
module.exports.unblockuser=async(req,res)=>{
  try {
    const {email,senduid}=req.body;
    let user=await User.updateOne({email:email},{$pull:{
      blocklists:senduid
    }});
  
    
    res.json({user});
  } catch (e) {
    res.status(500).json({mes:e.message})
  }
}
module.exports.addtoReportlist=async(req,res)=>{
  try {
    const {email,senduid}=req.body;
    let user=await User.updateOne({email:email},{$addToSet:{
      reportlist:senduid
    }});
  
    
    res.json({user});
  } catch (e) {
    res.status(500).json({mes:e.message})
  }
}
module.exports.removeReportlist=async(req,res)=>{
  try {
    const {email,senduid}=req.body;
    let user=await User.updateOne({email:email},{$pull:{
      reportlist:senduid
    }});
  
    
    res.json({user});
  } catch (e) {
    res.status(500).json({mes:e.message})
  }
}
module.exports.addtosortlist=async(req,res)=>{
  try {
    const {email,senduid}=req.body;
    let user=await User.updateOne({email:email},{$addToSet:{
      shortlist:senduid
    }});
  
    
    res.json({user});
  } catch (e) {
    res.status(500).json({mes:e.message})
  }
}
module.exports.removeshortuser=async(req,res)=>{
  try {
    const {email,senduid}=req.body;
    let user=await User.updateOne({email:email},{$pull:{
      shortlist:senduid
    }});
  
    
    res.json({user});
  } catch (e) {
    res.status(500).json({mes:e.message})
  }
}
module.exports.canclereq=async(req,res)=>{
  try {
    const {uid,email,sendemail,senduid}=req.body;
    let user=await User.updateOne({email:email},{$pull:{
      sendreq:senduid
    }});
    let senduser=await User.updateOne({email:sendemail},{$pull:{
      pendingreq:uid
    }});
    
    res.json({user,senduser});
  } catch (e) {
    res.status(500).json({mes:e.message})
  }
}

module.exports.uploadvideo=async(req,res)=>{
  try {
    const {email,videourl}=req.body;
    let user=await User.updateOne({email:email},{
      videolink:videourl
    });
    res.json(user)
  } catch (e) {
    res.status(500).json({mes:e.message})
  }
}
module.exports.deletevideo=async(req,res)=>{
  try {
    const {email}=req.body;
    let user=await User.updateOne({email:email},{
      videolink:""
    });
    res.json(user)
  } catch (e) {
    res.status(500).json({mes:e.message})
  }
}
module.exports.pushnotification=async(req,res)=>{
  try {
    const {title,email}=req.body;
   
    console.log(notification)
    let user=await User.updateOne({email:email},{$push:{
       notifications:{
        title:title
       }
    }});
    res.json(user);
  } catch (e) {
    res.status(500).json({mes:e.message})
  }
}
module.exports.pushactivities=async(req,res)=>{
  try {
    const {title,email,username,userimage,userid}=req.body;
   
    console.log(notification)
    let user=await User.updateOne({email:email},{$push:{
       activities:{
        title:title,
        username:username,
        userimage:userimage,
        userid:userid
       }
    }});
    res.json(user);
  } catch (e) {
    res.status(500).json({mes:e.message})
  }     
}

module.exports.deleteaccount=async(req,res)=>{
  try {
    const {aboutme,age,puid,diet,lat,lng,disability,drink,imageurls,placeofbirth,timeofbirth,education,height,income,patnerprefs,smoke,displayname,email,religion,name,surname,phone,gender,kundalidosh,martialstatus,profession,location,city,state,country,token,dob,reasontodeleteuser}=req.body;
    let user=await User.deleteOne({email:email});
    let deleteaccount=DeleteUser({
      aboutme,age,puid,diet,lat,lng,disability,drink,imageurls,placeofbirth,timeofbirth,education,height,income,patnerprefs,smoke,displayname,email,religion,name,surname,phone,gender,kundalidosh,martialstatus,profession,location,city,state,country,token,dob,reasontodeleteuser
    })
    deleteaccount=await deleteaccount.save();

    // let sharedpref=await SavedPrefer.deleteOne({email:email})
    res.json(deleteaccount);
  } catch (e) {
    res.status(500).json({mes:e.message})
  }
}
module.exports.updatelocation=async(req,res)=>{
  try {
    const {email,lat,lng}=req.body;
    let user=await User.updateOne({email:email},{$set:{
      lat:lat,
      lng:lng,
      
    }});
    res.json(user);
  } catch (e) {
    res.status(500).json({mes:e.message})
  }
}
