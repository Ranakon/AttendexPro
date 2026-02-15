
import React from 'react';
import { AttendanceData } from '../types';

interface ResultsTableProps {
  data: AttendanceData;
  onExport: () => void;
}

const ResultsTable: React.FC<ResultsTableProps> = ({ data, onExport }) => {
  const totalDays = data.allDates.length;

  return (
    <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="p-6 border-b border-gray-100 flex flex-col md:flex-row md:items-center justify-between gap-4 bg-gray-50/50">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">{data.title || "Attendance Register"}</h2>
          <p className="text-gray-500 flex items-center gap-2 mt-1">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            {totalDays} Days Tracked • Running Count Display
          </p>
        </div>
        <button 
          onClick={onExport}
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-xl font-semibold flex items-center justify-center gap-2 transition-all transform active:scale-95 shadow-lg shadow-indigo-200"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
          </svg>
          Download Excel
        </button>
      </div>

      <div className="overflow-x-auto relative">
        <table className="w-full text-left border-collapse min-w-[1000px]">
          <thead>
            <tr className="bg-gray-50">
              <th className="sticky left-0 bg-gray-50 px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider border-b z-10">Roll No.</th>
              <th className="sticky left-[100px] bg-gray-50 px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider border-b z-10">Student Name</th>
              {data.allDates.map((date, idx) => (
                <th key={idx} className="px-4 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider border-b text-center min-w-[70px]">
                  {date}
                </th>
              ))}
              <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider border-b text-center">Summary</th>
              <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider border-b">Remarks</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {data.records.map((record, idx) => {
              let runningCount = 0;
              
              return (
                <tr key={idx} className="hover:bg-indigo-50/30 transition-colors">
                  <td className="sticky left-0 bg-white group-hover:bg-inherit px-6 py-4 text-gray-600 font-medium border-r">{record.rollNumber || "-"}</td>
                  <td className="sticky left-[100px] bg-white group-hover:bg-inherit px-6 py-4 text-gray-900 font-semibold border-r">{record.studentName}</td>
                  {data.allDates.map((date, dIdx) => {
                    const statusObj = record.dailyStatus.find(s => s.date === date);
                    const rawStatus = statusObj ? statusObj.status.toString() : "0";
                    const isPresent = rawStatus === '1' || rawStatus.toLowerCase().startsWith('p');
                    const isAbsent = rawStatus === '0' || rawStatus.toLowerCase().startsWith('a');
                    
                    if (isPresent) runningCount++;
                    
                    return (
                      <td key={dIdx} className="px-4 py-4 text-center">
                        <span className={`inline-block w-8 h-8 leading-8 rounded-lg text-xs font-bold ${
                          isPresent ? "bg-green-100 text-green-700" :
                          isAbsent ? "bg-red-100 text-red-700" :
                          "bg-gray-100 text-gray-400"
                        }`}>
                          {isPresent ? runningCount : isAbsent ? '0' : rawStatus.charAt(0)}
                        </span>
                      </td>
                    );
                  })}
                  <td className="px-6 py-4 text-center whitespace-nowrap">
                    <div className="flex flex-col items-center">
                      <span className="text-sm font-bold text-indigo-700">{runningCount}/{totalDays}</span>
                      <span className="text-[10px] text-gray-400 font-bold uppercase">
                        {totalDays > 0 ? ((runningCount / totalDays) * 100).toFixed(0) : 0}%
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-gray-500 text-sm italic">{record.remarks || ""}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      
      {data.records.length === 0 && (
        <div className="p-12 text-center text-gray-500">
          No records found in the image. Try a clearer photo of the register.
        </div>
      )}
    </div>
  );
};

export default ResultsTable;
