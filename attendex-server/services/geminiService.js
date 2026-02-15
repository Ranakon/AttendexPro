const { GoogleGenAI, Type } = require("@google/genai");

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY
});

const extractAttendanceFromImage = async (base64Image) => {
  const model = "gemini-3-flash-preview";

  const response = await ai.models.generateContent({
    model,
    contents: {
      parts: [
        {
          inlineData: {
            mimeType: "image/jpeg",
            data: base64Image,
          },
        },
        {
          text: `
          Extract the full attendance grid from this image.
          Identify all unique dates.
          For each student extract name, roll number, and attendance for each date.
          Use "1" for Present and "0" for Absent.
          Return strictly valid JSON with the following structure:
          {
            "unique_dates": ["date1", "date2"],
            "attendance_grid": [
              {
                "name": "Student Name",
                "roll_number": "123",
                "attendance": {
                  "date1": "1",
                  "date2": "0"
                }
              }
            ]
          }
          `,
        },
      ],
    },
    config: {
      responseMimeType: "application/json"
    }
  });

  if (!response.text) {
    throw new Error("Failed to extract data");
  }

  return JSON.parse(response.text);
};

module.exports = extractAttendanceFromImage;
