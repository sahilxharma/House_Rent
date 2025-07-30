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
npm start

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

## 📷 Screenshots

Here are some key screenshots of the Property Rental Web App:

---

### 🏠 01. Home Page

This is the landing page of the app where users are welcomed with a clean layout and CTA.

![Home Page](https://drive.google.com/file/d/1SVw7tix4GIJDpOFjjUDNzTKYQIIc8e5I/view?usp=drive_link)

---

### 🔐 02. Signup Page

New users can register as renter, owner, or admin.

![Signup Page](https://drive.google.com/file/d/1RXrbHeZ8-QQb-3LUvawScNtfJX8mxZ53/view?usp=drive_link)

---

### 🔑 03. Login Page

Secure login form with validation and role-based access.

![Login Page](https://drive.google.com/file/d/1EL1B5Tnt_Ups4cWz9xBjF0_UOXrYAuhc/view?usp=drive_link)

---

### 🏘 04. All Properties Page

All listed properties from various owners are visible here for browsing.

![All Properties](https://drive.google.com/file/d/1nX6C-AvtZuIMK6VpGC6zxb3J3-4H0xld/view?usp=drive_link)

---

### 🧰 05. Filter Properties

Users can filter based on price, location, etc.

![Filter Properties](https://drive.google.com/file/d/12Gi5H18eqacnFlxGyx_foI90531J17ph/view?usp=drive_link)

---

### 🏡 06. Book Property

Renters can view a detailed page and book properties after login.

![Book Property](https://drive.google.com/file/d/1h2Ruf-sS5eyoxZ7Q0p7v6Lird4Gc_nls/view?usp=drive_link)

---

### 👤 07. Owner Dashboard

Owners can manage their property listings, edit, or delete them.

![Owner Dashboard](https://drive.google.com/file/d/1AcuXIsfecHuZZiUb107bDVCKFMu__hfv/view?usp=drive_link)

---

### 📱 08. Mobile View

Fully responsive mobile-friendly UI for all user types.

![Mobile View](https://drive.google.com/file/d/1EzcLlWzRKAQZlL5sXyU_GDZWR03wQqSM/view?usp=drive_link)

---

> 📌 All images are hosted on Google Drive to keep the repository clean. Node Modules and .env files are excluded from the repo.
