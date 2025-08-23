const student = require("../models/student.model.js")

exports.Createstudent = async (req, res) => {
    try {
        const {name, class: className, section} = req.body

     if(!name||!className||!section){
        return res
        .status(400)
        .json({message: "Please fill all the fields."});

      }
      const exists = await student.findOne({className, section});
      if (exists) {
        return res
        .status(400)
        .json({error:"student with this name already exist in the class"})

      }
      const Student = new student({name, class: className, section});
      await Student.save();
      res
      .status(201)
      .json({message: "Student created successfully."});

    } catch (error) {
        res
        .status(201)
        .json({error:error.message});
        
    }
};

//get all the student,roup by performance, or above 70% attendance

const attendance = require("../models/attendance.model.js");
exports.Getstudent = async (req, res) => {
  try {
    const{performance,above70,class:className,section,month,year} = req.query; 
    if ((performance || above70) && className && section && month && year) {
      // Calculate attendance % for each student in class/section/month
      const start = new Date(year, month - 1, 1);
      const end = new Date(year, month, 0, 23, 59, 59);
      let agg = [
        {
          $match: {
            class: className,
            section,
            date: { $gte: start, $lte: end },
          },
        },
        {
          $group: {
            _id: "$student",
            total: { $sum: 1 },
            present: {
              $sum: { $cond: [{ $eq: ["$status", "Present"] }, 1, 0] },
            },
          },
        },
        {
          $project: {
            percent: { $multiply: [{ $divide: ["$present", "$total"] }, 100] },
          },
        },
        {
          $lookup: {
            from: "students",
            localField: "_id",
            foreignField: "_id",
            as: "student",
          },
        },
        { $unwind: "$student" },
      ];
      if (above70) agg.push({ $match: { percent: { $gte: 70 } } });
      const result = await attendance.aggregate(agg);
      return res.status(200).json(result);
    }
    // Default: get all students
    const students = await student.find();
    res.status(200).json(students);
 
  }
    catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

