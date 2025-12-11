// src/controllers/auth.controller.js

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user.model");

// helper bikin token
function generateToken(user) {
  const payload = {
    userId: user._id,
    email: user.email,
    role: user.role,
  };

  const secret = process.env.JWT_SECRET;
  const expiresIn = process.env.JWT_EXPIRES_IN || "1h";

  return jwt.sign(payload, secret, { expiresIn });
}

async function register(req, res) {
  try {
    const { name, email, password } = req.body;

    // validasi sederhana
    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "name, email, dan password wajib diisi",
        data: null,
      });
    }

    if (password.length < 6) {
      return res.status(400).json({
        success: false,
        message: "Password minimal 6 karakter",
        data: null,
      });
    }

    // cek email sudah dipakai atau belum
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: "Email sudah terdaftar",
        data: null,
      });
    }

    // hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // simpan user baru
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    // generate token
    const token = generateToken(user);

    // jangan kirim password ke response
    const userData = {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    };

    return res.status(201).json({
      success: true,
      message: "Registrasi berhasil",
      data: {
        user: userData,
        token,
      },
    });
  } catch (error) {
    console.error("[Auth][Register] Error:", error.message);
    return res.status(500).json({
      success: false,
      message: "Terjadi kesalahan pada server",
      data: null,
    });
  }
}

async function login(req, res) {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "email dan password wajib diisi",
        data: null,
      });
    }

    // cari user berdasarkan email
    const user = await User.findOne({ email });
    if (!user) {
      // jangan terlalu detail, cukup pesan umum
      return res.status(401).json({
        success: false,
        message: "Email atau password salah",
        data: null,
      });
    }

    // bandingkan password plain dengan hash
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Email atau password salah",
        data: null,
      });
    }

    const token = generateToken(user);

    const userData = {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    };

    return res.json({
      success: true,
      message: "Login berhasil",
      data: {
        user: userData,
        token,
      },
    });
  } catch (error) {
    console.error("[Auth][Login] Error:", error.message);
    return res.status(500).json({
      success: false,
      message: "Terjadi kesalahan pada server",
      data: null,
    });
  }
}

module.exports = {
  register,
  login,
};
