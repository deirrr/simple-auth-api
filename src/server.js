// src/server.js

// File ini adalah "entry point" utama aplikasi.
// Tugasnya:
// - Memuat variabel environment (.env)
// - Menghubungkan ke database
// - Menjalankan HTTP server (app.listen)
//
// Logika bisnis, route, controller, dll, ada di file lain.

require("dotenv").config(); // Load variabel environment dari .env

const http = require("http");
const app = require("./app");
const { connectDB } = require("./config/database");

// Ambil port dari environment, default ke 3000 jika tidak diset
const PORT = process.env.PORT || 3000;

// Fungsi utama untuk start server
async function startServer() {
  try {
    // 1. Koneksi ke database terlebih dahulu
    await connectDB();

    // 2. Baru setelah itu listen HTTP server
    const server = http.createServer(app);

    server.listen(PORT, () => {
      console.log(`[Server] Berjalan di http://localhost:${PORT}`);
    });

    // Opsional: penanganan error pada server HTTP
    server.on("error", (error) => {
      console.error("[Server] Terjadi error pada HTTP server:", error.message);
    });
  } catch (error) {
    // Kalau ada error di proses startup (misalnya DB gagal connect),
    // kita log dan hentikan proses sehingga masalah langsung terlihat.
    console.error("[Startup] Gagal menjalankan server:", error.message);
    process.exit(1);
  }
}

// Panggil fungsi startServer
startServer();
