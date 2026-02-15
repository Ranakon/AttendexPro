const mongoose = require("mongoose");

const attendanceSchema = new mongoose.Schema({
  classId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Class",
    required: true
  },
  studentName: { type: String, required: true },
  rollNumber: { type: String },
  date: { type: String, required: true },
  status: { type: String, required: true },
  remarks: { type: String }
}, { timestamps: true });

module.exports = mongoose.model("Attendance", attendanceSchema);
