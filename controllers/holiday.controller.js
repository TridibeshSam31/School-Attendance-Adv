const Holiday = require("../models/holiday.model.js");  

exports.Createholiday = async (req, res) => {
    try {
        const {date, description} = req.body;
        if (!date) return res.status(400).json({error: "Date is required"});
        const holiday = new Holiday({date, description});  
        await holiday.save();
        res.status(201).json(holiday);
    } catch (error) {
        res.status(400).json({error: error.message});
    }
};

exports.Getholiday = async (req, res) => {
    try {
        const holidays = await Holiday.find();
        res.status(200).json(holidays);
    } catch (error) {
        res.status(400).json({error: error.message});
    }
};