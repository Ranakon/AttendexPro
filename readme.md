<div align="center">
<img width="345" height="781" alt="GHBanner" src="https://raw.githubusercontent.com/Ranakon/Ranakon/refs/heads/main/Screenshot%202026-02-18%20222439.png" />
</div>
🚀 AttendexPro
Smart Attendance Management with AI

AttendexPro is a full-stack web application designed to simplify and automate attendance tracking for educators. It combines modern UI, powerful backend APIs, and AI capabilities to make attendance handling fast, accurate, and effortless.

🌐 Live Demo: https://attendexpro.vercel.app/

✨ Features
📊 Automated Attendance Processing
Upload files and extract attendance data instantly
🤖 AI-Powered Insights
Smart parsing using Gemini AI integration
🔐 Authentication System
Secure login for teachers
🏫 Class Management
Create and manage multiple classes
📅 Attendance Records
Track, store, and retrieve attendance easily
📤 Export Functionality
Download attendance reports in Excel format
🛠️ Tech Stack
Frontend
⚛️ React + TypeScript
⚡ Vite
🎨 Modern UI Components
Backend
🟢 Node.js
🚂 Express.js
🍃 MongoDB
AI Integration
🤖 Gemini API (for intelligent data processing)
📂 Project Structure
AttendexPro/
│
├── attendex/               # Frontend (React + Vite)
│   ├── components/
│   ├── pages/
│   ├── services/
│   └── utils/
│
├── attendex-server/        # Backend (Node + Express)
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   └── config/
│
└── README.md
⚙️ Installation & Setup
1️⃣ Clone the repository
git clone https://github.com/your-username/AttendexPro.git
cd AttendexPro
2️⃣ Setup Backend
cd attendex-server
npm install

Create a .env file:

MONGO_URI=your_mongodb_connection
JWT_SECRET=your_secret_key
GEMINI_API_KEY=your_api_key

Run server:

npm start
3️⃣ Setup Frontend
cd ../attendex
npm install
npm run dev
🚀 Usage
Login as a teacher
Create or select a class
Upload attendance file
Let AI process the data
View results instantly
Export attendance if needed


🔒 Environment Variables
Variable	Description
MONGO_URI	MongoDB connection string
JWT_SECRET	Authentication secret
GEMINI_API_KEY	AI API key
🤝 Contributing

Contributions are welcome!

Fork the repo
Create a new branch
Make your changes
Submit a pull request
💡 Future Improvements
📱 Mobile responsiveness improvements
📊 Advanced analytics dashboard
🔔 Notifications system
👨‍🎓 Student login portal


💙 A Note

Built with passion to make academic workflows smarter and faster.
