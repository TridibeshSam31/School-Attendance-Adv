const mongoose = require('mongoose');

const teacherSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    class:{
        type:String,
        required:true,
    },
    section:{
        type:String,
        required:true,
    },
    subject:{
        type:String,
        required:true
    }

})

module.exports = mongoose.model("teacher",teacherSchema);