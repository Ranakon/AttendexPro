const express = require("express");
const router = express.Router();
const { createClass, getClasses, deleteClass } = require("../controllers/classController");
const protect = require("../middleware/authMiddleware");

router.post("/", protect, createClass);
router.get("/", protect, getClasses);
router.delete("/:classId", protect, deleteClass);


module.exports = router;
