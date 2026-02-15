
export interface AttendanceStatus {
  date: string;
  status: string; // e.g., "P", "A", "L" or "Present", "Absent", "Late"
}

export interface AttendanceEntry {
  studentName: string;
  rollNumber: string | number;
  dailyStatus: AttendanceStatus[];
  remarks?: string;
}

export interface AttendanceData {
  title: string;
  allDates: string[]; // List of all unique dates found in the register
  records: AttendanceEntry[];
}
