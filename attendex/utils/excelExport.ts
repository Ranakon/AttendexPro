
import { AttendanceData } from "../types";

declare const XLSX: any;

export const exportToExcel = (data: AttendanceData) => {
  if (typeof XLSX === 'undefined') {
    alert('Excel library not loaded yet. Please try again in a moment.');
    return;
  }

  const totalDays = data.allDates.length;

  // Flatten the data for Excel sheet with dynamic columns for dates
const sheetData = data.records.map((record, index) => {
  const row: any = {
    "S.No": index + 1,
    "Student Name": record.studentName,
    "Roll Number": record.rollNumber || "",
  };

    let runningPresenceCount = 0;

    // Add a column for each date with running total logic
    data.allDates.forEach(date => {
      const statusObj = record.dailyStatus.find(s => s.date === date);
      if (statusObj) {
        const s = statusObj.status.toString().trim().toLowerCase();
        // Convert to integer: Increment if present, 0 if absent
        if (s === '1' || s.startsWith('p')) {
          runningPresenceCount++;
          row[date] = runningPresenceCount; 
        } else if (s === '0' || s.startsWith('a')) {
          row[date] = 0;
        } else {
          row[date] = statusObj.status;
        }
      } else {
        row[date] = 0; // Default to 0 if no status for that day
      }
    });

    // Calculate percentage
    const percentage = totalDays > 0 ? (runningPresenceCount / totalDays) * 100 : 0;
    
    row["Total Present"] = runningPresenceCount;
    row["Percentage (%)"] = Number(percentage.toFixed(2));
    row["Remarks"] = record.remarks || "";
    row["Total Attendance"] = runningPresenceCount;
    row["Total Classes"] = totalDays;
    row["Percent Attendance"] = Number(percentage.toFixed(2));
    
    return row;
  });

  // Create worksheet directly from the mapped JSON objects
  const worksheet = XLSX.utils.json_to_sheet(sheetData);
  // Width of 1st 3 columns
  worksheet["!cols"] = [
  { wch: 6.8 },  // S.No
  { wch: 27 },   // Student Name
  { wch: 15.5 }, // Roll Number
  { wpx: 68 },  // S.No
  { wpx: 279 },   // Student Name
  { wpx: 163 }, // Roll Number
];

  const workbook = XLSX.utils.book_new();

  XLSX.utils.book_append_sheet(workbook, worksheet, "Attendance");
  
  const fileName = `Attendance_${data.title?.replace(/[^a-z0-9]/gi, '_') || 'Register'}_${new Date().toISOString().split('T')[0]}.xlsx`;
  XLSX.writeFile(workbook, fileName);
};
