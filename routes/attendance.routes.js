const express = require('express');
const router = express.Router();
const { markAttendance, getAttendance, editAttendance, exportAttendanceCSV } = require('../controllers/attendance.controller.js');

router.post('/', markAttendance);
router.get('/', getAttendance);
router.patch('/:id', editAttendance);
router.get('/export', exportAttendanceCSV);

module.exports = router;