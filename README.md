# Simple Authentication API

A simple backend project for learning authentication using Node.js, Express, and MongoDB.
This API supports user registration, login, and identity verification using JSON Web Token (JWT).
The project structure is modular to make it easy to extend and maintain.

## ✨ Main Features

- User registration  
- Login with email and password  
- Password hashing using bcrypt  
- JWT-based authentication  
- Clean and scalable folder structure  
- MongoDB connection using Mongoose

---

## 🛠️ Technologies Used

- Node.js + Express  
- MongoDB (via Docker, image `mongo:4.4`)  
- Mongoose ODM  
- bcryptjs (password hashing)  
- jsonwebtoken (JWT generation & verification)  
- dotenv (environment variables)  
- nodemon (development)

---

## Persiapan Lingkungan

### 1. Instal software berikut:

* **Node.js** (disarankan versi LTS)
* **Docker Desktop** (untuk menjalankan MongoDB di container)

### 2. Jalankan MongoDB menggunakan Docker

```bash
docker run -d --name mongodb -p 27017:27017 mongo:4.4
```

MongoDB versi 4.4 dipilih karena kompatibel dengan CPU non-AVX (misal Celeron, Pentium).

Cek apakah container berjalan:

```bash
docker ps
```

---

## Instalasi Project

Clone repository:

```bash
git clone https://github.com/deirrr/simple-auth-api.git
cd simple-auth-api
```

Install dependencies:

```bash
npm install
```

---

## Konfigurasi Environment

Buat file `.env` di root project (satu level dengan package.json):

```env
# Port server
PORT=3000

# URL MongoDB
DB_URL=mongodb://127.0.0.1:27017/simple_auth_api

# Konfigurasi JWT
JWT_SECRET=supersecret_dev_key_123
JWT_EXPIRES_IN=1h
```

Catatan:
`JWT_SECRET` sebaiknya diganti dengan string acak yang lebih aman jika digunakan di environment publik.

---

## Menjalankan Server

Untuk development:

```bash
npm run dev
```

Atau tanpa nodemon:

```bash
node src/server.js
```

Jika berhasil, log berikut akan muncul:

```
[Database] Koneksi ke MongoDB berhasil
[Server] Berjalan di http://localhost:3000
```

---

## Struktur Folder

```
src/
│
├── config/
│   └── database.js
│
├── controllers/
│   └── auth.controller.js
│
├── middlewares/
│   └── auth.middleware.js (akan dibuat nanti)
│
├── models/
│   └── user.model.js
│
├── routes/
│   └── auth.routes.js
│
├── utils/
│   ├── password.js (opsional)
│   └── token.js    (opsional)
│
├── app.js
└── server.js
```

---

## Endpoint API

### 1. Health Check

**GET /**

Respons:

```json
{
  "success": true,
  "message": "Simple Authentication API - Service is running",
  "data": null
}
```

---

### 2. Registrasi User

**POST /auth/register**

Body JSON:

```json
{
  "name": "User Pertama",
  "email": "user1@example.com",
  "password": "password123"
}
```

Respons:

```json
{
  "success": true,
  "message": "Registrasi berhasil",
  "data": {
    "user": {
      "id": "65fxxx",
      "name": "User Pertama",
      "email": "user1@example.com",
      "role": "user"
    },
    "token": "JWT_TOKEN_DI_SINI"
  }
}
```

---

### 3. Login User

**POST /auth/login**

Body JSON:

```json
{
  "email": "user1@example.com",
  "password": "password123"
}
```

Respons:

```json
{
  "success": true,
  "message": "Login berhasil",
  "data": {
    "user": {
      "id": "65fxxx",
      "name": "User Pertama",
      "email": "user1@example.com",
      "role": "user"
    },
    "token": "JWT_TOKEN_DI_SINI"
  }
}
```

---

## Rencana Pengembangan (Roadmap)

* Middleware verifikasi JWT (`auth.middleware.js`)
* Endpoint `/auth/me` untuk mengambil profil user yang sedang login
* Logout + refresh token
* Role-based access control (RBAC)
* Error handler global
* Penggunaan docker-compose untuk menyatukan API + MongoDB

---

## Lisensi

Proyek ini bebas digunakan untuk belajar dan pengembangan.
