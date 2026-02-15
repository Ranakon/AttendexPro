const express = require("express");
const router = express.Router();
const protect = require("../middleware/authMiddleware");

const { uploadAttendance, downloadAttendance, getAttendance } = require("../controllers/attendanceController");

//view attendance for a class
router.get("/view/:classId", protect, getAttendance);

// download (THIS IS IMPORTANT)
router.get("/download/:classId", protect, downloadAttendance);

router.get("/:classId", protect, downloadAttendance);
//upload
router.post("/upload", protect, uploadAttendance);

module.exports = router;
