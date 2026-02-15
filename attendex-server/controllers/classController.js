const Class = require("../models/Class");
const Attendance = require("../models/Attendance");

// CREATE CLASS
exports.createClass = async (req, res) => {
  try {
    const { className } = req.body;

    const newClass = await Class.create({
      teacherId: req.teacher,   // comes from middleware
      className
    });

    res.status(201).json(newClass);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//delete class
exports.deleteClass = async (req, res) => {
  try {
    const { classId } = req.params;

    // Ensure teacher owns class
    const classData = await Class.findOne({
      _id: classId,
      teacherId: req.teacher
    });

    if (!classData) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    // Delete attendance first
    await Attendance.deleteMany({ classId });

    // Delete class
    await Class.deleteOne({ _id: classId });

    res.json({ message: "Class deleted successfully" });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};





// GET ALL CLASSES FOR LOGGED-IN TEACHER
exports.getClasses = async (req, res) => {
  try {
    const classes = await Class.find({
      teacherId: req.teacher
    });

    res.json(classes);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
