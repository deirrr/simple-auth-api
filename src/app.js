// src/app.js

const express = require("express");
const cors = require("cors");
const authRoutes = require("./routes/auth.routes");

const app = express();

// Middleware untuk mengizinkan CORS (akses dari domain berbeda)
app.use(cors());

// Middleware untuk parsing JSON body request
app.use(express.json());

// Contoh middleware sederhana untuk logging request (optional)
app.use((req, res, next) => {
  console.log(`[Request] ${req.method} ${req.originalUrl}`);
  next();
});

// Route dasar untuk health check API
app.get("/", (req, res) => {
  return res.json({
    success: true,
    message: "Simple Authentication API - Service is running",
    data: null,
  });
});

// Route auth dengan prefix /auth
app.use("/auth", authRoutes);

// Placeholder untuk global error handler
// const errorHandler = require("./middlewares/errorHandler");
// app.use(errorHandler);

module.exports = app;
