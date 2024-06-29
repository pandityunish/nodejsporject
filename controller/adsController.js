const ADS = require("../models/AdsModel")

module.exports.createads = async (req, res) => {
    try {
        const { description, adsid, image,video,name } = req.body;
        let ads = await ADS({
            description, adsid, image,video,name
        });
        ads = await ads.save();
        res.json(ads);
    } catch (e) {
        res.status(500).json({ mes: e.message })

    }
}
module.exports.getallads = async (req, res) => {
    try {
        const { adsid } = req.body;
        let ads = await ADS.find({adsid:adsid});
        ads.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

        res.json(ads);
    } catch (e) {
        res.status(500).json({ mes: e.message })

    }
}
module.exports.deleteads = async (req, res) => {
    try {
        const { id } = req.body;
        let ads = await ADS.deleteOne({_id:id});

        res.json(ads);
    } catch (e) {
        res.status(500).json({ mes: e.message })

    }
}