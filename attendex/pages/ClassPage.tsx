import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import FileUpload from "../components/FileUpload";
import { uploadAttendance } from "../services/api";

const ClassPage: React.FC = () => {
  const { id } = useParams(); // class id from URL
  const navigate = useNavigate();

  const [attendanceRecords, setAttendanceRecords] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  // 🔹 Fetch attendance
  const fetchAttendance = async () => {
    const token = localStorage.getItem("token");

    const res = await fetch(
      `http://attendexpro.onrender.com/api/attendance/view/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const data = await res.json();
    setAttendanceRecords(Array.isArray(data) ? data : []);
  };

  useEffect(() => {
    if (id) fetchAttendance();
  }, [id]);

  // Process data for Matrix View (Excel-like)
  const uniqueDates = Array.from(new Set(attendanceRecords.map((r) => r.date))).sort() as string[];

  const groupedData: Record<string, any> = {};
  attendanceRecords.forEach((r) => {
    const key = `${r.rollNumber}-${r.studentName}`;
    if (!groupedData[key]) {
      groupedData[key] = {
        studentName: r.studentName,
        rollNumber: r.rollNumber,
        attendance: {},
      };
    }
    groupedData[key].attendance[r.date] = r.status;
  });

  const studentRows = Object.values(groupedData);

  return (
    <div className="space-y-6">

      {/* 🔙 Back Button */}
      <button
        onClick={() => navigate("/dashboard")}
        className="text-indigo-600 hover:underline"
      >
        ← Back to Dashboard
      </button>

      <h2 className="text-2xl font-bold">
        Class Attendance
      </h2>

      {/* 📤 Upload */}
      <FileUpload
        onFileSelect={async (base64) => {
          try {
            setLoading(true);
            const token = localStorage.getItem("token");

            await uploadAttendance(
              token!,
              id!,
              base64
            );

            await fetchAttendance();

            alert("Attendance uploaded successfully!");
          } catch (err) {
            console.error(err);
            alert("Upload failed");
          } finally {
            setLoading(false);
          }
        }}
        isLoading={loading}
      />

      {/* 📥 Download Button (above table) */}
      {attendanceRecords.length > 0 && (
        <>
          <button
            onClick={async () => {
              const token = localStorage.getItem("token");

              const res = await fetch(
                `http://attendexpro.onrender.com/api/attendance/download/${id}`,
                {
                  headers: {
                    Authorization: `Bearer ${token}`,
                  },
                }
              );

              const blob = await res.blob();
              const url = window.URL.createObjectURL(blob);

              const a = document.createElement("a");
              a.href = url;
              a.download = "Attendance.xlsx";
              a.click();
            }}
            className="bg-green-600 text-white px-4 py-2 rounded"
          >
            Download Excel
          </button>

          {/* 📊 Table */}
          <div className="overflow-x-auto border rounded-lg shadow bg-white">
            <table className="min-w-full border-collapse text-sm">
              <thead className="bg-gray-50">
                <tr>
                  <th className="p-3 border text-left font-semibold text-gray-600 sticky left-0 bg-gray-50 z-10 shadow-sm">Student Name</th>
                  <th className="p-3 border text-left font-semibold text-gray-600">Roll No.</th>
                  {uniqueDates.map((date) => (
                    <th key={date} className="p-3 border text-center font-semibold text-gray-600 whitespace-nowrap">
                      {date}
                    </th>
                  ))}
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-100">
                {studentRows.map((student, idx) => (
                  <tr key={idx} className="hover:bg-indigo-50/30 transition-colors">
                    <td className="p-3 border font-medium text-gray-900 sticky left-0 bg-white shadow-sm">{student.studentName}</td>
                    <td className="p-3 border text-gray-600">{student.rollNumber}</td>
                    {uniqueDates.map((date) => {
                      const status = student.attendance[date];
                      const isPresent = status === "1" || status === "P" || status === "p";
                      const isAbsent = status === "0" || status === "A" || status === "a";
                      
                      return (
                        <td key={date} className="p-3 border text-center">
                          {isPresent ? (
                            <span className="inline-flex items-center justify-center w-6 h-6 bg-green-100 text-green-700 rounded text-xs font-bold">P</span>
                          ) : isAbsent ? (
                            <span className="inline-flex items-center justify-center w-6 h-6 bg-red-100 text-red-700 rounded text-xs font-bold">A</span>
                          ) : (
                            <span className="text-gray-300">-</span>
                          )}
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
};

export default ClassPage;
