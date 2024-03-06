const Maintenance = require("../models/maintainance");
const Query = require("../models/query_data");

module.exports.postQuery=async(req,res)=>{
    try {
        const {email,description}=req.body;
        let query=Query({email,description});
      query=await  query.save();
      res.json(query);
    } catch (e) {
        res.status(500).json({mes:e.message})
    }
}

module.exports.updateMaintenance=async(req,res)=>{
    try {
        const {id,isUnder}=req.body;
        let query=Maintenance.updateOne({_id:id},{isUnder:isUnder});
     
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