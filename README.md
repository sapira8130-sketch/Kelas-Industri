# Sapira — Full Stack Web Developer Portfolio

Website Portofolio Personal profesional berbasis **Node.js**, **Express.js**, **EJS Templating**, dan **iOS Dark Glassmorphism Design System** untuk Sapira, siswa Rekayasa Perangkat Lunak (RPL) SMK JAKARTA PUSAT 1.

---

## 🌟 Fitur Utama

- **macOS/iOS TopBar Widget**: Header window widget interaktif dengan kontrol lampu indikator dan status ketersediaan.
- **Data-Driven Architecture**: Semua konten utama dikelola terpusat dari `data/portfolio.json`.
- **Theme Premium**: Dark Navy & Deep Charcoal Glassmorphism (`#050816`, `#0B1020`, `#111827`) dengan ambient glow & bintang latar belakang CSS murni.
- **Hero & Profile Card**: Menampilkan identitas Sapira, jurusan RPL SMK Jakarta Pusat 1, status ketersediaan, serta tombol CTA WhatsApp & GitHub.
- **Categorized Skills & Tech Stack**: Pembagian keahlian Web Development, Database, Tools & Design, UI/UX, dan Soft Skills.
- **4 Layanan (Services)**: Web Development, UI/UX Design, Frontend Development, dan Web Application.
- **3 Featured Projects**: *Website Toko Tas*, *Perpustakaan Digital*, dan *To-Do List Web & Mobile* lengkap dengan label tipe project, fitur utama, teknologi, serta tautan repository/demo.
- **Project Journey Timeline**: Timeline perkembangan karya dari Oktober 2024 hingga Juni 2026.
- **Interactive AJAX Contact Form**: Formulir kontak interaktif (`POST /api/contact`) dengan validasi real-time, loading spinner, serta pesan umpan balik (sukses/gagal) tanpa reload halaman.
- **100% Responsive & Accessible**: Tampilan optimal untuk Desktop, Tablet, dan Mobile dengan Hamburger Menu, SEO Open Graph metadata, serta dukungan `@media (prefers-reduced-motion)`.

---

## 🛠️ Teknologi & Dependensi

- **Backend**: Node.js, Express.js
- **View Engine**: EJS (Embedded JavaScript)
- **Middleware**: CORS, Body-Parser, Dotenv
- **Styling & Client JS**: Custom CSS Glassmorphism + Vanilla JS (Form validation, AJAX, Mobile menu, Scroll reveal)

---

## 🚀 Panduan Memulai (Installation & Run)

### 1. Prasyarat
Pastikan **Node.js** (v16 atau lebih baru) dan **npm** sudah terinstal pada komputer Anda.

### 2. Install Dependensi
Buka terminal pada direktori project dan jalankan:

```bash
npm install
```

### 3. Jalankan Server
Jalankan perintah berikut untuk memulai server Express:

```bash
npm start
```

Atau secara langsung:

```bash
node server.js
```

### 4. Buka Aplikasi di Browser
Akses URL berikut pada browser Anda:

```text
http://localhost:3000
```

---

## 🛰️ Endpoint API

- `GET /` — Merender halaman utama portofolio (`index.ejs`).
- `GET /api/portfolio` — Mengembalikan data lengkap portofolio dalam format JSON.
- `POST /api/contact` — Mengirimkan pesan dari formulir kontak.
  - Body: `{ "name": "...", "email": "...", "subject": "...", "message": "..." }`
  - Response: `{ "success": true, "message": "..." }` atau `{ "success": false, "error": "..." }`
