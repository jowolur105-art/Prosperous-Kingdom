# Prosperous Kingdom: Ekspedisi Pelaku Ekonomi

> Game edukasi arcade side-scrolling PWA bertema kerajaan medieval untuk materi **Pelaku Kegiatan Ekonomi** (Ekonomi SMA Kelas X).
> Dikembangkan sesuai dokumen spesifikasi pembelajaran aktif, dilengkapi grafis kastil panorama, naga penjaga, ksatria animasi lari, musik petualangan medieval, dan dukungan 100% offline PWA.

---

## 🎮 Cara Menjalankan Lokal

1. Buka terminal di folder `Prosperous Kingdom/`.
2. Jalankan server statis:
   ```bash
   python server.py
   ```
   atau:
   ```bash
   python -m http.server 8000
   ```
3. Buka alamat `http://localhost:8000` di browser **Chrome** atau **Edge**.

> ⚠️ **Penting:** Jangan membuka file `index.html` secara langsung (`file://`), karena JavaScript ES Modules dan PWA membutuhkan protokol HTTP/HTTPS.

---

## 🚀 Panduan Publikasi ke GitHub Pages

1. Buat akun dan repositori baru di GitHub (publik), misalnya `prosperous-kingdom`.
2. Hubungkan dan push file proyek:
   ```bash
   git init
   git add .
   git commit -m "feat: rilis game Prosperous Kingdom PWA"
   git branch -M main
   git remote add origin https://github.com/<username>/prosperous-kingdom.git
   git push -u origin main
   ```
3. Di halaman repositori GitHub:
   - Klik **Settings** ➔ **Pages**.
   - Pada **Build and deployment**:
     - **Source**: `Deploy from a branch`
     - **Branch**: `main`, folder: `/ (root)`
   - Klik **Save**.
4. Tunggu 1–3 menit, game akan aktif di:
   `https://<username>.github.io/prosperous-kingdom/`
5. Buka tautan tersebut di laptop kelas sekali saat online, lalu uji mode offline.

---

## ✏️ Panduan Kustomisasi Konten

### 1. Mengubah / Menambah Soal
Edit file [`js/data/questions.js`](file:///d:/Coding/game%20edukasi/jalan-makmur/js/data/questions.js):
- `QUESTIONS_MALAIKAT`: 10 soal untuk perjumpaan Malaikat Ekonomi (+10 poin jika benar).
- `QUESTIONS_JURANG`: 10 soal untuk tantangan bangkit dari jurang (−5 poin jika salah, min 0).

Format soal:
```javascript
{
  id: "M1",
  tp: 1,           // Tujuan Pembelajaran 1 atau 2
  level: "C4",     // Tingkat kognitif HOTS
  soal: "Pertanyaan...",
  opsi: [
    "Opsi A",
    "Opsi B",
    "Opsi C",
    "Opsi D"
  ],
  benar: 0,        // Indeks jawaban benar sebelum diacak (0 = A, 1 = B, dst)
  penjelasan: "Pembahasan mendalam konsep ekonomi..."
}
```

### 2. Mengubah Parameter Permainan
Edit file [`js/data/config.js`](file:///d:/Coding/game%20edukasi/jalan-makmur/js/data/config.js):
- `SPEEDS`: Kecepatan lari (`pelan: 200`, `normal: 240`, `cepat: 280` px/dtk).
- `GRAVITY`: Gravitasi lompatan (2200 px/dtk²).
- `JUMP_V`: Kecepatan awal lompat (820 px/dtk).
- `COYOTE_TIME`: Toleransi lompat setelah lepas dari tanah (0.10 dtk).
- `JUMP_BUFFER`: Toleransi input lompat sebelum mendarat (0.12 dtk).
- `DEFAULT_TIMER_SEC`: Durasi batas waktu soal (default 60 detik).

### 3. Mengganti Gambar Background Home
1. Siapkan file gambar rasio 16:9 (1920×1080 px, ≤ 1 MB, tanpa teks/orang).
2. Simpan di `assets/bg-home.webp`.
3. Jika nama file berbeda, sesuaikan `HOME_BG` di `js/data/config.js`.
4. Jika file gambar tidak ada, sistem otomatis mengaktifkan fallback latar prosedural 2D (langit, bukit, pohon, awan bergerak).

---

## ⌨️ Kontrol Permainan

| Tombol Keyboard | Aksi |
|---|---|
| `Spasi` / `↑` / Klik Mouse / Sentuh | Melompat saat berjalan |
| `A`, `B`, `C`, `D` atau `1`, `2`, `3`, `4` | Memilih opsi jawaban |
| `Enter` | Mengunci jawaban / Melanjutkan |
| `P` | Jeda (Pause) permainan |
| `T` | Membuka Panel Guru (Moderator) |
| `M` | Mematikan / Menyalakan suara (Mute) |
| `F` | Layar penuh (Fullscreen) |

---

## 📋 Checklist Hasil Uji Kualitas (QA)

- [x] **PWA & Offline**: Service Worker (`sw.js`) mem-precache seluruh aset inti, manifest standalone aktif, lulus uji offline.
- [x] **Resolusi & Responsivitas**: Canvas logis 1280×720 dengan letterbox, rendering HiDPI (`devicePixelRatio`), teks terbaca jelas dari proyektor.
- [x] **Fisika & Animasi**: Siklus kaki-tangan berjalan dinamis, body bobbing, coyote time (0.10s), jump buffer (0.12s), 60 FPS stabil.
- [x] **Generator Lintasan Acak**: 1000/1000 lintasan lulus uji unit (`tests/track.test.js`) dengan 100% invarian terpenuhi dan keunikan 100%.
- [x] **Malaikat & Jurang**: Malaikat menghadang mulus, dialog interaktif dengan timer dan opsi teracak, animasi jatuh jurang dan bangkit kembali.
- [x] **Sistem Skor & Rotasi Pemain**: +10 benar malaikat, −5 salah jurang (min 0), rotasi pemain otomatis dalam kelompok saat jawaban salah.
- [x] **Manajemen Kelas**: Konfigurasi 2–6 kelompok, tema warna & simbol unik, Papan Peringkat Akhir, dan Review Pembahasan terurut dari yang paling banyak salah.
- [x] **Panel Guru**: Akses via tombol `T`, mendukung tambah/kurang skor, rotasi pemain manual, ulangi lintasan, dan pengaturan kecepatan/timer.
- [x] **Web Audio API**: Efek suara sintetis murni tanpa file audio eksternal (jump, land, angel, correct, wrong, fall, rise, fanfare).
- [x] **Bebas Ketergantungan**: Murni Vanilla JavaScript + HTML5 Canvas 2D, tanpa framework, tanpa bundler, tanpa CDN eksternal.
