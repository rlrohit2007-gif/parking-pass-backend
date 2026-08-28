// server.js

const express = require("express");
const cors = require("cors");
require("dotenv").config();

// Routes
const adminRoutes = require("./routes/adminRoutes");
const parkingRoutes = require("./routes/parkingRoutes");
const transactionRoutes = require("./routes/transactionRoutes");
const studentRoutes = require("./routes/studentRoutes");
const paymentRoutes = require("./routes/paymentRoutes");
const authRoutes = require("./routes/authRoutes");

// Create App
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// API Routes
app.use("/api/transactions", transactionRoutes);
app.use("/api/student", studentRoutes);
app.use("/api/payment", paymentRoutes);
app.use("/api/parking", parkingRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/auth", authRoutes);

// Test API
app.get("/", (req, res) => {
    res.send("Parking Pass API is running 🚗");
});

// Server
const PORT = process.env.PORT || 5000;

app.listen(PORT, "0.0.0.0", () => {
    console.log(`✅ Server is running on port ${PORT}`);
});