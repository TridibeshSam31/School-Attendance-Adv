const {Parser} = require("json2csv"); //use json2csv to convert JSON data into CSV format, which is widely used for exporting data, especially in spreadsheets like Excel or Google Sheets.

//we need to edit attendance within 24 hours only

exports.editAttendance = async (req , res) => {
    try {
        const {id} = req.params; // req.params is used to identify resources like ids
        const {status} = req.body;
        const attendance = await attendance.findById(id); 
        if (!attendance) {
            return res.status(404).json({message: "Attendance not found"});
            
        }
         const now = new Date();
        const created = new Date(attendance.createdAt);
        
    } catch (error) {
        
    }
}

