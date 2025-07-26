# 🏡 HouseRental Platform

**HouseRental** is a full-stack web application that allows users to browse, list, and manage rental properties. It includes a role-based system for **Users**, **Owners**, and **Admins**, enabling seamless interaction in a property rental ecosystem.


## 🔧 Tech Stack

### 💻 Frontend
- React + TypeScript
- Tailwind CSS
- Vite
- Context API & Hooks
- Axios & Ant Design

### 🛠 Backend
- Node.js + Express.js
- MongoDB + Mongoose
- JWT Authentication
- RESTful API



## 📂 Folder Structure

House_Rent/
├── code/
│   ├── backend/       # Express + MongoDB API
│   └── frontend/      # React + Vite client
├── README.md
└── .gitignore


🚀 Getting Started
📦 Prerequisites
Node.js (v18 or later)

MongoDB Atlas or local MongoDB



```bash
# Clone the repo
git clone https://github.com/your-username/House_Rent.git
cd House_Rent

# Install backend dependencies
cd code/backend
npm install

# Install frontend dependencies
cd ../frontend
npm install
```

⚙️ Environment Variables
Create a .env file in code/backend/ with:
-PORT=8001
-MONGO_DB=your_mongodb_connection
-JWT_SECRET=your_secret_key


🏁 Running the App

# Start backend
cd code/backend
npm run dev

# Start frontend (in new terminal)
cd code/frontend
npm run dev


### 👤 User
- Browse and view available properties
- Book rental properties
- View booking history

### 🏠 Owner
- Add new rental properties
- Manage own listings
- View bookings made on owned properties

### 🛡️ Admin
- Manage users and owners
- Approve/reject property listings
- View all bookings and property data
