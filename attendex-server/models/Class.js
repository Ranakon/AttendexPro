const mongoose = require("mongoose");

const classSchema = new mongoose.Schema({
  teacherId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Teacher",
    required: true
  },
  className: { type: String, required: true }
}, { timestamps: true });

module.exports = mongoose.model("Class", classSchema);
