const express = require('express');
const router = express.Router();
const {createTeacher, getTeachers} = require('../controllers/teacher.controller.js');

router.post('/', createTeacher);
router.get('/', getTeachers);

module.exports = router;