const holiday = require("../models/holiday.model.js");

//create holiday and get a holiday


exports.Createholiday = async (req, res) => {
    try {
        const{date,description} = req.body;
        if (!date) return res.status(400).json({error:"Date is required"});
        const Holiday = new holiday({date,description});
        await Holiday.save();
        res.status(201).json(Holiday);
        
    } catch (error) {
        res.status(400).json({error:error.message});
        
    }
};



//get all the holiday

exports.Getholiday = async (req, res) => {
    try {
        const Holidays = await holiday.find();
        res.status(200).json(Holidays);
        
    } catch (error) {
        res.status(400).json({error:error.message});
        
    }
};