


const Attendance = require("../models/Attendance");
const extractAttendanceFromImage = require("../services/geminiService");
const XLSX = require("xlsx");
const Class = require("../models/Class");

exports.uploadAttendance = async (req, res) => {
  try {
    const { classId, base64Image } = req.body;

    if (!classId || !base64Image) {
      return res.status(400).json({ message: "Missing classId or base64Image" });
    }

    const extractedData = await extractAttendanceFromImage(base64Image);
    console.log("Gemini Extracted Data:", JSON.stringify(extractedData, null, 2));

    if (!extractedData) {
      return res.status(400).json({ message: "Failed to extract data from image" });
    }

    const { unique_dates, attendance_grid } = extractedData;

if (!attendance_grid || !unique_dates) {
  return res.status(400).json({ message: "Invalid Gemini response format" });
}

console.log("Dates:", unique_dates);
console.log("Grid:", attendance_grid);

for (const student of attendance_grid) {
  for (const date of unique_dates) {
    
    const status =
      student.attendance && student.attendance[date]
        ? student.attendance[date]
        : "0";   // default absent

    const existing = await Attendance.findOne({
      classId,
      studentName: student.name,
      date
    });

    if (existing) {
      existing.status = status;
      await existing.save();
    } else {
      await Attendance.create({
        classId,
        studentName: student.name,
        rollNumber: student.roll_number,
        date,
        status,
        remarks: ""
      });
    }
    console.log("Saving:", student.name, date, status);
  }
}

    res.json({ message: "Attendance processed and saved" });

  } catch (error) {
    console.error("UPLOAD ERROR:", error);
    res.status(500).json({ error: error.message });
  }
};


exports.downloadAttendance = async (req, res) => {
  try {
    const { classId } = req.params;

    // 🔐 Ensure teacher owns this class
    const classData = await Class.findOne({
      _id: classId,
      teacherId: req.teacher
    });

    if (!classData) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    const records = await Attendance.find({ classId });

    if (!records.length) {
      return res.status(404).json({ message: "No attendance data found" });
    }

    // 📊 Group by student → create attendance grid
    const grouped = {};
// Collect all unique dates
const allDates = [...new Set(records.map(r => r.date))];

records.forEach((rec) => {
  if (!grouped[rec.studentName]) {
    grouped[rec.studentName] = {
      Student: rec.studentName,
      Roll: rec.rollNumber,
    };
  }

  grouped[rec.studentName][rec.date] = rec.status;
});

// Now calculate totals
Object.values(grouped).forEach(student => {
  let presentCount = 0;

  allDates.forEach(date => {
    const status = student[date] || "0";
    student[date] = status;

    if (status === "1") {
      presentCount++;
    }
  });

  const totalClasses = allDates.length;
  const percentage =
    totalClasses === 0
      ? 0
      : ((presentCount / totalClasses) * 100).toFixed(2);

  student["Total Present"] = presentCount;
  student["Total Classes"] = totalClasses;
  student["Attendance %"] = percentage + "%";
});


    const finalData = [];
let serialNumber = 1;

Object.values(grouped).forEach((student) => {

  // Get all date keys (exclude Student & Roll)
  const dateKeys = Object.keys(student).filter(
    key => key !== "Student" && key !== "Roll"
  );

  let totalClasses = dateKeys.length;
  let totalPresent = 0;

  dateKeys.forEach(date => {
    if (student[date] === "1") {
      totalPresent++;
    }
  });

  const percentage = totalClasses > 0
    ? ((totalPresent / totalClasses) * 100).toFixed(2) + "%"
    : "0%";

  finalData.push({
    "S.No": serialNumber++,
    "Student": student.Student,
    "Roll": student.Roll,
    ...dateKeys.reduce((acc, date) => {
      acc[date] = student[date];
      return acc;
    }, {}),
    "Total Present": totalPresent,
    "Total Classes": totalClasses,
    "Attendance %": percentage
  });

});

    const worksheet = XLSX.utils.json_to_sheet(finalData);
    worksheet["!cols"] = [
  { wch: 6.2 },   // S.No
  { wch: 27.1 },  // Student Name
  { wch: 15 },    // Roll
  ...Object.keys(finalData[0])
    .slice(3, -3)
    .map(() => ({ wch: 12 })), // Dates
  { wch: 15 },  // Total Present
  { wch: 15 },  // Total Classes
  { wch: 15 }   // Percentage
];




    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Attendance");

    const buffer = XLSX.write(workbook, {
      type: "buffer",
      bookType: "xlsx",
    });

    res.setHeader(
      "Content-Disposition",
      `attachment; filename=${classData.className}.xlsx`
    );

    res.type(
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    );

    res.send(buffer);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


exports.getAttendance = async (req, res) => {
  try {
    const { classId } = req.params;

    const classData = await Class.findOne({
      _id: classId,
      teacherId: req.teacher
    });

    if (!classData) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    const records = await Attendance.find({ classId });

    res.json(records);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
