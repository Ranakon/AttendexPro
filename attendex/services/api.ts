const BASE_URL = "https://localhost:5000";

export const uploadAttendance = async (
  token: string,
  classId: string,
  base64Image: string
) => {
  const response = await fetch(`${BASE_URL}/api/attendance/upload`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    },
    body: JSON.stringify({
      classId,
      base64Image
    })
  });

  return response.json();
};
