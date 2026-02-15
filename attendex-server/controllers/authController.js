const Teacher = require("../models/Teacher");
const Class = require("../models/Class");
const Attendance = require("../models/Attendance");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// SIGNUP
exports.signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const existing = await Teacher.findOne({ email });
    if (existing) {
      return res.status(400).json({ message: "Email already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const teacher = await Teacher.create({
      name,
      email,
      password: hashedPassword
    });

    res.status(201).json({ message: "Account created successfully" });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteAccount = async (req, res) => {
  try {
    const teacherId = req.teacher;

    const classes = await Class.find({ teacherId });

    const classIds = classes.map(c => c._id);

    // Delete attendance of all classes
    await Attendance.deleteMany({ classId: { $in: classIds } });

    // Delete classes
    await Class.deleteMany({ teacherId });

    // Delete teacher
    await Teacher.deleteOne({ _id: teacherId });

    res.json({ message: "Account deleted successfully" });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// LOGIN
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const teacher = await Teacher.findOne({ email });
    if (!teacher) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, teacher.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { id: teacher._id },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.json({
      token,
      teacher: {
        id: teacher._id,
        name: teacher.name,
        email: teacher.email
      }
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
