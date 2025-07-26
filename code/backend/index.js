const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const path = require("path");
const connectionofDb = require("./config/connect.js");

const app = express();


//// Load environment variables from .env
dotenv.config();

//// Connect to MongoDB
connectionofDb();

//// Define port
const PORT = process.env.PORT || 8001;

//// ✅ Middleware (Order Matters!)
app.use(cors({
  origin: 'http://localhost:5173', // Your frontend origin
  methods: ['GET', 'POST', 'PUT', 'DELETE'], 
  credentials: true,
}));

app.use(express.json()); // ✅ for JSON request bodies
app.use(express.urlencoded({ extended: true })); // ✅ for URL-encoded data (forms)

//// Serve static files (e.g. uploaded images)
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

//// ✅ API Routes
app.use("/api/user", require("./routes/userRoutes.js"));
app.use("/api/admin", require("./routes/adminRoutes.js"));
app.use("/api/owner", require("./routes/ownerRoutes.js"));

//// ✅ Start the server
app.listen(PORT, () => {
  console.log(`✅ Server is running on port ${PORT}`);
});
