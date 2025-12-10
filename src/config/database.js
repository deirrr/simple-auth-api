// src/config/database.js

// Modul ini bertanggung jawab untuk:
// - Membaca DB_URL dari environment
// - Membuka koneksi ke MongoDB menggunakan Mongoose
// - Mengekspor fungsi connectDB agar bisa dipanggil dari server.js

const mongoose = require("mongoose");

// Fungsi untuk membuka koneksi ke MongoDB
async function connectDB() {
  const dbUrl = process.env.DB_URL;

  if (!dbUrl) {
    // Kalau DB_URL tidak di-set di .env, kita buat error yang jelas
    throw new Error("DB_URL belum di-set di file .env");
  }

  try {
    // Opsi umum mongoose (bisa dikustom, ini cukup aman untuk awal)
    await mongoose.connect(dbUrl);

    console.log("[Database] Koneksi ke MongoDB berhasil");
  } catch (error) {
    console.error("[Database] Gagal konek ke MongoDB:", error.message);
    // Kalau koneksi gagal, kita hentikan proses agar error langsung ketahuan
    process.exit(1);
  }
}

module.exports = {
  connectDB,
};
