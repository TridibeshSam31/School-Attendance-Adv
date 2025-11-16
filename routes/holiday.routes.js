const express = require("express");
const router = express.Router();
const {
  CreateHoliday,
  GetHolidays,
} = require("../controllers/holiday.controller.js");

// POST /api/holidays - create a holiday
router.post("/", CreateHoliday);

// GET /api/holidays - list all holidays
router.get("/", GetHolidays);

module.exports = router;