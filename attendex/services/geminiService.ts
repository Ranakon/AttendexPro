
import { GoogleGenAI, Type } from "@google/genai";
import { AttendanceData } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const extractAttendanceFromImage = async (base64Image: string): Promise<AttendanceData> => {
  const model = 'gemini-3-flash-preview';
  
  const response = await ai.models.generateContent({
    model,
    contents: {
      parts: [
        {
          inlineData: {
            mimeType: 'image/jpeg',
            data: base64Image,
          },
        },
        {
          text: `Extract the full attendance grid from this image. 
          Registers often have students in rows and multiple dates or day-columns. 
          1. Identify all unique dates/days in the header row.
          2. For each student, extract their name, roll number, and their attendance status for EVERY date column found.
          3. Use "1" for Present, "0" for Absent. If a specific "Late" or other mark is used, use a single letter like "L".
          4. Return strictly valid JSON.`,
        },
      ],
    },
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          title: { type: Type.STRING, description: "Title of the register or subject" },
          allDates: { 
            type: Type.ARRAY, 
            items: { type: Type.STRING },
            description: "List of all dates or day headers found in the columns"
          },
          records: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                studentName: { type: Type.STRING },
                rollNumber: { type: Type.STRING },
                dailyStatus: {
                  type: Type.ARRAY,
                  items: {
                    type: Type.OBJECT,
                    properties: {
                      date: { type: Type.STRING, description: "The date this status applies to" },
                      status: { type: Type.STRING, description: "Use '1' for Present, '0' for Absent" }
                    },
                    required: ["date", "status"]
                  }
                },
                remarks: { type: Type.STRING },
              },
              required: ["studentName", "dailyStatus"],
            },
          },
        },
        required: ["allDates", "records"],
      },
    },
  });

  const text = response.text;
  if (!text) {
    throw new Error("Failed to extract data from image");
  }

  return JSON.parse(text) as AttendanceData;
};
