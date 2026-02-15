import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

interface ClassType {
  _id: string;
  className: string;
}

const Dashboard: React.FC = () => {
  const [classes, setClasses] = useState<ClassType[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchClasses();
  }, []);

  const fetchClasses = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await fetch("https://localhost:5000/api/classes", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) {
        console.error("Failed to fetch classes");
        return;
      }

      const data = await res.json();
      setClasses(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Error fetching classes:", error);
    }
  };

  const handleCreateClass = async () => {
    const name = prompt("Enter class name");
    if (!name) return;

    const token = localStorage.getItem("token");

    await fetch("https://localhost:5000/api/classes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ className: name }),
    });

    fetchClasses();
  };

  return (
    <div className="max-w-6xl mx-auto px-6 py-10 space-y-6">
      <h2 className="text-2xl font-bold">Your Classes</h2>

      <div className="grid md:grid-cols-3 gap-6">
        {classes.map((cls) => (
          <div
            key={cls._id}
            className="relative p-6 bg-white rounded-xl shadow hover:shadow-lg transition"
          >
            <h3
              onClick={() => navigate(`/class/${cls._id}`)}
              className="font-semibold text-lg cursor-pointer"
            >
              {cls.className}
            </h3>

            <button
              onClick={async () => {
                const confirmDelete = window.confirm("Delete this class?");
                if (!confirmDelete) return;

                const token = localStorage.getItem("token");

                await fetch(`https://localhost:5000/api/classes/${cls._id}`, {
                  method: "DELETE",
                  headers: {
                    Authorization: `Bearer ${token}`,
                  },
                });

                fetchClasses();
              }}
              className="absolute top-2 right-2 text-red-500 hover:text-red-700"
            >
              ✕
            </button>
          </div>
        ))}
      </div>

      <button
        onClick={handleCreateClass}
        className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition"
      >
        + Create Class
      </button>
    </div>
  );
};


export default Dashboard;
