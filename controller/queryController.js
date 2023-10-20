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
