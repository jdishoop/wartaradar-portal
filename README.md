# WartaRadar.com - Portal Berita Modern & Sistem Manajemen Editorial

Aplikasi portal berita **WartaRadar** (PT Warta Radar Multimedia) dengan dukungan:
- Animasi Radar Terintegrasi pada Header & Footer.
- Penempatan slot iklan terverifikasi sesuai shortcode `[wrmi_ad placement="top"]` & `[wrmi_ad placement="sidebar"]`.
- Sistem Manajemen Jurnalistik (Jurnalis, Editor, Pemimpin Redaksi).
- Sinkronisasi REST API WordPress (`wartaradar.com/wp-json/wp/v2`) untuk berita, kategori, media, dan iklan.
- Alamat Redaksi: GEDUNG LEXI MITRA GUNA Jl. Sutaatmaja No 72-74 Lantai 1 Kelurahan Karanganyar Kota Subang – Jawa Barat. E-mail: redaksi@wartaradar.com.

---

## 🚀 1. Cara Menyimpan & Menghubungkan Proyek ke GitHub

Proyek ini telah diinisialisasi dengan Git lokal. Ikuti langkah berikut untuk menyimpannya ke akun GitHub Anda:

### Langkah A: Repository GitHub Anda
Repository tujuan Anda:
- `https://github.com/jdishoop/wartaradar-portal.git`

Remote `origin` sudah disetel ke repository ini di branch `main`.

### Langkah B: Melakukan Push ke GitHub
Karena GitHub memerlukan otentikasi (Personal Access Token / PAT):

**Pilihan 1 (Jika ingin sistem ini yang langsung melakukan push):**
Buat Personal Access Token di GitHub ([github.com/settings/tokens](https://github.com/settings/tokens)) dengan centang izin `repo`.
Lalu kirimkan token tersebut di chat, dan sistem akan langsung mengeksekusi:
```bash
git push https://<TOKEN>@github.com/jdishoop/wartaradar-portal.git main
```

**Pilihan 2 (Dari terminal komputer / laptop Anda):**
```bash
git clone https://github.com/jdishoop/wartaradar-portal.git
# Salin file proyek ke dalamnya lalu:
git add .
git commit -m "feat: Portal WartaRadar lengkap siap deploy Hostinger"
git push -u origin main
```

Setiap kali Anda membuat perubahan baru di masa mendatang, cukup jalankan:
```bash
git add .
git commit -m "Update konten atau fitur"
git push
```

---

## 🌐 2. Cara Deploy ke Hostinger (wartaradar.com)

Ada **3 Cara** yang bisa Anda pilih untuk menempatkan hasil proyek ini di Hostinger:

### METODE 1: Upload File Build (Paling Cepat & Mudah)
1. Jalankan proses build produksi:
   ```bash
   npm run build
   ```
   Hasil file siap pakai akan berada di folder **`dist/`**. File `.htaccess` sudah otomatis tersedia di dalam folder `dist/` untuk memastikan routing halaman lancar.

2. Masuk ke **hPanel Hostinger** (hpanel.hostinger.com) -> pilih domain `wartaradar.com`.
3. Buka menu **File Manager** -> masuk ke folder `public_html`.
4. Jika sebelumnya ada file bawaan (seperti `default.php`), arsipkan atau hapus.
5. Buat file `.zip` dari semua isi di dalam folder `dist/` (bukan folder dist-nya, melainkan file di dalamnya: `index.html`, folder `assets/`, `.htaccess`, dsb.).
6. Upload file `.zip` tersebut ke `public_html`, lalu klik **Extract**.
7. Selesai! Buka `https://wartaradar.com` di browser Anda.

---

### METODE 2: Git Deployment Otomatis di hPanel Hostinger
Jika kode sudah disimpan di GitHub, Hostinger memiliki fitur Git bawaan:
1. Buka **hPanel Hostinger** -> **Git**.
2. Masukkan URL repository GitHub Anda: `https://github.com/USERNAME_ANDA/wartaradar-portal.git`.
3. Pilih Branch: `main`.
4. Tentukan folder target (misal: `/public_html` atau subfolder).
5. Klik **Create**. Hostinger akan menarik file secara otomatis.
6. Untuk memperbarui website di masa depan setiap kali ada push baru, Anda cukup klik tombol **Deploy** di menu Git hPanel Hostinger atau aktifkan Webhook otomatis.

---

### METODE 3: CI/CD Otomatis Menggunakan GitHub Actions
File workflow sudah disiapkan di `.github/workflows/deploy-hostinger.yml`.
Setiap kali Anda melakukan `git push` ke GitHub, GitHub Actions akan otomatis melakukan build dan mengunggahnya ke Hostinger via FTP:
1. Di GitHub repository Anda, buka tab **Settings** -> **Secrets and variables** -> **Actions**.
2. Tambahkan 3 secret berikut (dapat dilihat di menu FTP Accounts di hPanel Hostinger):
   - `FTP_SERVER`: Alamat server FTP Hostinger Anda (contoh: `ftp.wartaradar.com` atau IP server).
   - `FTP_USERNAME`: Username akun FTP Hostinger Anda.
   - `FTP_PASSWORD`: Password akun FTP Hostinger Anda.
3. Selesai! Setiap Anda push kode ke GitHub, website di Hostinger akan terupdate secara otomatis dalam 1-2 menit.

---

## 🔌 3. Menghubungkan ke WordPress REST API wartaradar.com

Aplikasi ini mendukung sinkronisasi langsung dengan WordPress backend Anda.

Di file `.env` (atau saat build), Anda dapat mengatur:
```env
VITE_WP_API_URL=https://wartaradar.com/wp-json/wp/v2
```

Endpoint yang digunakan:
- Berita: `/posts?_embed=1`
- Kategori: `/categories`
- Media & Gambar: `/media`

---

## 🛠️ Perintah Pengembangan Lokal

```bash
# Instalasi dependensi
npm install

# Menjalankan server pengembangan lokal (port 3000)
npm run dev

# Membangun file produksi
npm run build

# Menjalankan pengecekan TypeScript
npm run lint
```
