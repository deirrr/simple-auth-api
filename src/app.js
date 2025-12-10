// src/app.js

// File ini bertugas:
// - Inisialisasi instance Express
// - Pasang middleware global (JSON parser, CORS, dll.)
// - Registrasi route (misal: /auth)
// - Pasang global error handler (nantinya akan kita buat terpisah)
//
// Catatan: app.js tidak menjalankan "listen". Itu tugas server.js.
// Hal ini membuat struktur lebih terpisah dan mudah dites.

const express = require("express");
const cors = require("cors");

// Nanti saat kita sudah buat auth.routes.js, kita import di sini
// const authRoutes = require("./routes/auth.routes");

const app = express();

// Middleware untuk mengizinkan CORS (akses dari domain berbeda)
app.use(cors());

// Middleware untuk parsing JSON body request
app.use(express.json());

// Contoh middleware sederhana untuk logging request (optional)
// Bisa dihapus kalau tidak dibutuhkan
app.use((req, res, next) => {
  console.log(`[Request] ${req.method} ${req.originalUrl}`);
  next();
});

// Route dasar untuk health check API
// Endpoint ini berguna untuk memastikan server sudah jalan
app.get("/", (req, res) => {
  return res.json({
    success: true,
    message: "Simple Authentication API - Service is running",
    data: null,
  });
});

// Nanti kalau authRoutes sudah dibuat, aktifkan baris ini:
// app.use("/auth", authRoutes);

// Placeholder untuk global error handler
// Nanti kita buat file khusus untuk ini, lalu import di sini.
// Contoh bentuk akhirnya kira-kira:
// const errorHandler = require("./middlewares/errorHandler");
// app.use(errorHandler);

module.exports = app;
