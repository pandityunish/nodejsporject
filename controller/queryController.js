const Bubbles = require("../models/Bubbles");
const Maintenance = require("../models/maintainance");
const Query = require("../models/query_data");

module.exports.postQuery=async(req,res)=>{
    try {
        const {email,description,isAdmin}=req.body;
        let query=Query({email,description,isAdmin});
      query=await  query.save();
      res.json(query);
    } catch (e) {
        res.status(500).json({mes:e.message})
    }
}
module.exports.getQuery=async(req,res)=>{
    try {
        const email=req.body;
        let query=await Query.find(email).sort({createdAt:-1});
    // let query=await Query.updateMany({},{ $currentDate: { timestamps: true }})
      res.json(query);
    } catch (e) {
        res.status(500).json({mes:e.message})
    }
}
module.exports.updateMaintenance=async(req,res)=>{
    try {
        const {isUnder}=req.body;
        let query=await Maintenance.updateMany({},{$set:{
            isUnder:isUnder
        }});
     
      res.json(query);
    } catch (e) {
        res.status(500).json({mes:e.message})
    }
}

module.exports.getMaintenance=async(req,res)=>{
    try {
        
        let query=await Maintenance.find({});
     
      res.json(query);
    } catch (e) {
        res.status(500).json({mes:e.message})
    }
}
module.exports.getBubbles=async(req,res)=>{
    try {
        
        let query=await Bubbles.find({}).sort({createdAt:-1});
    
      res.json(query);
    } catch (e) {
        res.status(500).json({mes:e.message})
    }
}
module.exports.getBubblesbydate=async(req,res)=>{
    try {
        const { dateStr } = req.body;
    
        const requestedDate = new Date(dateStr); // Assuming date is passed in req.body.date
        const startOfDay = new Date(requestedDate.getFullYear(), requestedDate.getMonth(), requestedDate.getDate());
        const endOfDay = new Date(requestedDate.getFullYear(), requestedDate.getMonth(), requestedDate.getDate() + 1);
    
        // Find bubbles created on the specified date
        const query = await Bubbles.aggregate([
            {
                $match: {
                    createdAt: { $gte: startOfDay, $lt: endOfDay }
                }
            }
        ]);;
    
        res.json(query);
    } catch (e) {
        console.error(e); // Log the error for debugging
        res.status(500).json({ message: e.message });
    }
    
    
}
module.exports.createBubbles=async(req,res)=>{
    try {
        
        let query=await Bubbles();
    query=await query.save();
      res.json(query);
    } catch (e) {
        res.status(500).json({mes:e.message})
    }
}
module.exports.updateBubbles=async(req,res)=>{
    try {
        const {image1,image2,image3,image4,image5,image6,image7,image8,image9,image10,image11,image12,image13,image14,image15,image16}=req.body;
        let query=await Bubbles(
          { image1,image2,image3,image4,image5,image6,image7,image8,image9,image10,image11,image12,image13,image14,image15,image16}
        );
    query=await query.save();
      res.json(query);
    } catch (e) {
        res.status(500).json({mes:e.message})
    }
}