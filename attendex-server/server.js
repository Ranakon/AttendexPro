const express = require("express");
const cors = require("cors");
require("dotenv").config();

const connectDB = require("./config/db");

const app = express();
// const cors = require("cors");
app.use(cors());


// app.use(express.json());
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));

const authRoutes = require("./routes/authRoutes");
const classRoutes = require("./routes/classRoutes");
const attendanceRoutes = require("./routes/attendanceRoutes");
app.use("/api/auth", authRoutes);
app.use("/api/classes", classRoutes);
app.use("/api/attendance", attendanceRoutes);


// Connect Database
connectDB();

app.get("/", (req, res) => {
  res.send("Attendex Backend Running");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
