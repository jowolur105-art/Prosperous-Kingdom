# 🏰 DOKUMENTASI LENGKAP & SPESIFIKASI SISTEM
# PROSPEROUS KINGDOM: EKSPEDISI PELAKU EKONOMI

> **Versi Dokumen:** 2.0 (Edisi Rilis Lengkap)  
> **Tema & Konsep:** Medieval Fantasy Educational Arcade Runner PWA  
> **Target Pengguna:** Siswa SMA/MA Kelas X (Mata Pelajaran Ekonomi, Kurikulum Merdeka)  
> **Materi Pokok:** Peran Pelaku Kegiatan Ekonomi & Diagram Alir Melingkar (*Circular Flow Diagram*)  
> **Teknologi:** HTML5 Canvas, Vanilla CSS3, JavaScript ES Modules, Web Audio API, Progressive Web App (PWA) Offline  

---

## 📋 DAFTAR ISI
1. [Ringkasan Eksekutif & Identitas Game](#1-ringkasan-eksekutif--identitas-game)
2. [Tujuan Pembelajaran & Pedagogi Game](#2-tujuan-pembelajaran--pedagogi-game)
3. [Arsitektur Teknis & Struktur File](#3-arsitektur-teknis--struktur-file)
4. [Mekanisme Gameplay & Kontrol Pemain](#4-mekanisme-gameplay--kontrol-pemain)
5. [Sistem Kuis, Kunci Jawaban & Skoring](#5-sistem-kuis-kunci-jawaban--skoring)
6. [Desain Visual, Sprite Animasi & Audio](#6-desain-visual-sprite-animasi--audio)
7. [Infrastruktur Progressive Web App (PWA) & Offline](#7-infrastruktur-progressive-web-app-pwa--offline)
8. [Bank Soal & Penjelasan Materi Lengkap](#8-bank-soal--penjelasan-materi-lengkap)
9. [Panduan Guru & Penggunaan di Ruang Kelas](#9-panduan-guru--penggunaan-di-ruang-kelas)
10. [Panduan Deploy ke GitHub Pages & Eksekusi Lokal](#10-panduan-deploy-ke-github-pages--eksekusi-lokal)

---

## 1. RINGKASAN EKSEKUTIF & IDENTITAS GAME

**Prosperous Kingdom: Ekspedisi Pelaku Ekonomi** adalah media pembelajaran interaktif berbasis web (PWA) bertema kerajaan fantasi abad pertengahan (*medieval fantasy*). Pemain mengendalikan seorang Ksatria Kerajaan (*Royal Knight*) yang berlari menyusuri jalan raya kerajaan untuk menyelesaikan misi ekonomi.

### Karakteristik Kunci:
- **Model Arcade Tanpa Garis Finis Semu:** Tidak menggunakan garis finis jarak tertentu. Permainan baru dinyatakan tuntas (*Game Finish*) tepat saat **20 pertanyaan materi ekonomi** telah terjawab secara menyeluruh.
- **Kunci Jawaban Instan:** Pemain atau kelompok diskusi dapat langsung memencet tombol **Kunci Jawaban** kapan saja tanpa harus menebak opsi jawaban terlebih dahulu. Pembahasan materi langsung muncul seketika untuk memfasilitasi diskusi kelas yang efektif.
- **Tanpa Sistem Minus (Zero Penalty):** Menjawab salah saat terjatuh ke jurang atau melihat kunci jawaban memberikan `+0 Poin` (skor tidak pernah dikurangi), menjaga motivasi belajar siswa tetap positif.
- **Mode Platforming Menantang (*Hard Mode Pits*):** Rintangan jurang kuno dirancang rapat dan menantang ketepatan waktu lompat (*jump timing*), memicu adrenalin pemain di sela-sela kuis.
- **Audio Petualangan Medieval:** Menggunakan instrumen petualangan epik (*Fox Sailor - Elven Kingdom*) yang berputar berulang (*loop*) tanpa putus dari halaman awal menu hingga ke dalam arena permainan.
- **100% Offline PWA:** Seluruh aset gambar, font tipografi medieval, file audio, serta kode logika tersimpan di perangkat lokal melalui *Service Worker Cache Storage*. Game dapat dimainkan di daerah tanpa akses internet.

---

## 2. TUJUAN PEMBELAJARAN & PEDAGOGI GAME

### A. Capaian Pembelajaran (CP) Ekonomi Fase E (Kelas X)
Siswa mampu memahami, mengidentifikasi, menganalisis, dan mengevaluasi:
1. **Peran Rumah Tangga Konsumen (RTK):** Pemilik faktor produksi (tanah, tenaga kerja, modal, keahlian) dan konsumen barang/jasa akhir.
2. **Peran Rumah Tangga Produsen (RTP):** Pengguna faktor produksi, penghasil barang/jasa, dan pembayar balas jasa (sewa, upah, bunga, laba).
3. **Peran Rumah Tangga Pemerintah (RTG):** Regulator kebijakan, penarik pajak, penyedia subsidi dan layanan fasilitas publik.
4. **Peran Masyarakat Luar Negeri (MLN):** Pelaku ekspor, impor, investasi internasional, dan pertukaran devisa.
5. **Diagram Arus Melingkar (*Circular Flow Diagram*):**
   - Model 2 Sektor (Perekonomian Sederhana: RTK & RTP).
   - Model 3 Sektor (Perekonomian Tertutup: RTK, RTP, RTG).
   - Model 4 Sektor (Perekonomian Terbuka: RTK, RTP, RTG, MLN).

### B. Prinsip Gamifikasi
- **Zona Perkembangan Proksimal (Vygotsky):** Kombinasi aksi motorik (melompat jurang) dan kognitif (menjawab pertanyaan naga) membuat siswa tetap fokus dan tidak jenuh.
- **Pembelajaran Kolaboratif (*Peer Learning*):** Dirancang untuk dimainkan secara berkelompok di depan kelas atau per meja; siswa berdiskusi sebelum memutuskan apakah akan langsung membedah kunci jawaban atau menjawab sendiri.
- **Umpan Balik Cepat (*Immediate Feedback*):** Setiap jawaban langsung disertai penegasan benar/salah dan kotak **Pembahasan Mendalam** yang menjelaskan konsep ilmiahnya.

---

## 3. ARSITEKTUR TEKNIS & STRUKTUR FILE

Game dibangun dengan standar modern web tanpa dependensi pustaka berat (tanpa React/Vue/Tailwind/Webpack/Vite), menjamin kecepatan muat seketika (*instant boot*) dan kemudahan pemeliharaan.

### Struktur Direktori Proyek:
```text
Prosperous Kingdom/
│
├── index.html                   # Dokumen utama, kanvas game 16:9, dan overlay DOM
├── manifest.webmanifest         # Metadata instalasi PWA (ikon, nama, orientasi landscape)
├── sw.js                        # Service Worker untuk precache dan operasi offline 100%
├── server.py                    # Multi-threaded HTTP Server lokal Python (port 8000)
├── package.json                 # Manifest modul npm untuk verifikasi lokal
├── DOKUMENTASI_LENGKAP.md       # Dokumentasi menyeluruh sistem & materi game
├── README.md                    # Ringkasan cepat & panduan instalasi
│
├── assets/                      # Aset grafis, font lokal, dan audio game
│   ├── bg-home.webp             # Artwork latar belakang menu awal
│   ├── bg-kingdom.webp          # Pemandangan panorama kastil kerajaan (1920x1080)
│   ├── ground.webp              # Tekstur rumput & jalan cobblestone (transparan presisi)
│   ├── dragon.png               # Sprite Naga Ekonomi (azure/emerald dengan tanduk emas)
│   ├── knight_0.png             # Frame lari ksatria 1 (angkat pedang, langkah depan)
│   ├── knight_1.png             # Frame lari ksatria 2 (badan condong, ayunan langkah)
│   ├── knight_2.png             # Frame lari ksatria 3 (langkah bertukar, pose lompat/jatuh)
│   ├── knight_3.png             # Frame lari ksatria 4 (posisi tegap, dorongan kaki)
│   ├── medieval-font.css        # Deklarasi @font-face lokal untuk font medieval
│   ├── fonts/                   # File font lokal biner (TTF)
│   │   ├── font_0.ttf           # Cinzel Font
│   │   ├── font_1.ttf           # MedievalSharp Font
│   │   └── font_2.ttf           # Cinzel Decorative Font
│   ├── bgm-kingdom.mp3          # Musik petualangan medieval utama (Fox Sailor - Elven Kingdom)
│   └── Fox Sailor - ... .mp3   # File master sumber audio asli
│
├── icons/                       # Ikon aplikasi PWA multi-resolusi
│   ├── icon.svg                 # Format vektor tajam
│   ├── icon-192.png             # Resolusi standar Android PWA
│   ├── icon-512.png             # Resolusi splash screen PWA
│   └── icon-maskable-512.png    # Maskable icon adaptive Android
│
├── css/
│   ├── base.css                 # CSS Reset, CSS Variables warna/font, dan canvas letterboxing
│   └── ui.css                   # Gaya modal dialog kuis glassmorphism, HUD, tombol medieval
│
└── js/
    ├── main.js                  # Entry point, scaling kanvas DPR, router boot, global audio
    ├── router.js                # State machine pengendali pergantian layar (screen routing)
    ├── store.js                 # Pengelola localStorage untuk skor, setting, sesi kuis
    ├── audio.js                 # Modul pemutar BGM streaming dan synthesizer SFX Web Audio API
    ├── rng.js                   # Algoritma Mulberry32 Pseudo-Random Number Generator
    ├── track.js                 # Pembangkit rintangan lintasan prosedural berinvarian
    │
    ├── data/
    │   ├── config.js            # Konstanta fisika kanvas, kecepatan, konstanta lompat, aset
    │   ├── strings.js           # Kamus teks dialog, pesan intro, dan narasi
    │   └── questions.js         # 40 Bank soal ekonomi terverifikasi (Naga & Jurang)
    │
    ├── game/
    │   ├── engine.js            # Game loop utama (60 FPS), deteksi tabrakan, spawn dinamis
    │   ├── player.js            # Model fisika ksatria (gravitasi, inersia, coyote time, buffer)
    │   ├── draw.js              # Canvas renderer (paralaks langit, awan, ksatria, naga, jalan)
    │   └── hud.js               # Render tampilan atas (Skor kiri, Soal Terjawab tengah)
    │
    └── screens/
        ├── menu.js              # Layar Beranda: Judul medieval, tombol PLAY instan
        ├── play.js              # Layar Gameplay aktif: koordinator dialog & alur permainan
        ├── question.js          # Modal dialog kuis: opsi A-D, Kunci Jawaban instan, pembahasan
        ├── final.js             # Layar Akhir: Papan Kejayaan 20 soal terjawab
        ├── review.js            # Layar penelaahan seluruh 20 pertanyaan & jawaban
        └── teacher.js           # Panel Kendali Guru (diakses via tombol shortcut 'T')
```

---

## 4. MEKANISME GAMEPLAY & KONTROL PEMAIN

### A. Kontrol Pemain
Pemain mengendalikan gerakan ksatria untuk melewati jalan kerajaan:
- **Lompat (*Jump*):** Tekan tombol **`Spasi`**, **`Panah Atas (↑)`**, **Klik Kiri Mouse**, atau **Sentuh Layar Kanvas (Touchscreen)**.
- **Kunci Jawaban / Lanjut:** Tekan tombol **`Enter`** saat modal dialog kuis muncul.
- **Bisukan Audio (*Mute Toggle*):** Tekan tombol **`M`** pada keyboard atau klik tombol ikon suara `🔊` / `🔇` di pojok kanan atas.
- **Panel Rahasia Guru:** Tekan tombol **`T`** pada keyboard untuk membuka menu konfigurasi nilai cepat.

### B. Fisika Gerak Ksatria (*Platformer Physics Engine*)
Fisika permainan diprogram dengan perhitungan inersia yang presisi dan responsif:
- **Gravitasi:** `2200 px/s²` (tarikan jatuh tajam dan tegas).
- **Kecepatan Lompat Awal:** `-820 px/s` (mencapai ketinggian optimal untuk melompati lubang).
- **Coyote Time (`0.10 detik`):** Memberi toleransi waktu kepada pemain untuk tetap dapat melompat sesaat setelah kaki ksatria meninggalkan tepian tebing jurang.
- **Jump Buffer (`0.14 detik`):** Jika pemain menekan tombol lompat sedikit lebih awal sebelum ksatria menyentuh tanah, perintah lompat disimpan dan otomatis dieksekusi saat mendarat.
- **Bobbing Running Cycle:** Efek osilasi vertikal dinamis setinggi 4 piksel saat ksatria berlari di permukaan jalan batu untuk kesan animasi hidup.

### C. Karakteristik Rintangan (*Hard Mode Pits*)
- **Kemunculan Rintangan:** Didominasi oleh jurang kuno (probabilitas 65% jurang, 35% naga).
- **Lebar Jurang Kuno:** Antara `58%` hingga `82%` dari batas jangkauan lompatan terjauh ksatria. Pemain harus melompat di dekat bibir jurang untuk berhasil menyeberang.
- **Rintangan Ganda (*Double Pits*):** Probabilitas 25% memunculkan dua jurang berturut-turut yang dipisahkan oleh daratan sempit (190–240 px), menguji refleks ketangkasan ganda.
- **Rambu Peringatan:** Tanda seru segitiga kuning terpancang 250 piksel sebelum lubang jurang sebagai tanda aba-aba visual bagi pemain.

---

## 5. SISTEM KUIS, KUNCI JAWABAN & SKORING

### A. Dua Jenis Pertemuan Kuis
1. **Pertemuan Naga Ekonomi (*Dragon Encounter*):**
   - Naga azure/emerald melayang turun dari angkasa saat ksatria mendekat dalam jarak 260 piksel.
   - Mengajukan pertanyaan terkait konsep peran RTK, RTP, RTG, dan MLN.
   - Naga terbang kembali ke angkasa setelah pertanyaan selesai dituntaskan.
2. **Terjatuh ke Jurang Kuno (*Pit Chasm Fall*):**
   - Terjadi saat ksatria gagal melompati lubang dan jatuh ke bawah kanvas.
   - Mengajukan pertanyaan terkait mekanisme aliran uang, barang/jasa, dan diagram interaksi antar-pelaku ekonomi (*Circular Flow*).
   - Setelah selesai, ksatria melayang bangkit kembali (*Rise Animation*) ke seberang tebing jurang dan langsung melanjutkan lari.

### B. Mekanisme "Kunci Jawaban Instan"
- Tombol **Kunci Jawaban** selalu menyala aktif secara default.
- Pemain **tidak diwajibkan** memilih salah satu opsi (A/B/C/D) terlebih dahulu.
- Saat tombol **Kunci Jawaban** diklik (atau menekan `Enter`):
  1. Opsi yang benar otomatis ditandai dengan warna hijau tegas.
  2. Kotak **Pembahasan** seketika terbuka menampilkan ulasan materi ilmiah secara detail.
  3. Tombol **Lanjut** otomatis aktif untuk melanjutkan lari ksatria.

### C. Tabel Perhitungan Skor (Tanpa Sistem Minus)
| Situasi | Hasil Jawaban | Poin Diberikan | Keterangan |
| :--- | :--- | :---: | :--- |
| **Naga Ekonomi** | Menjawab Benar | **+10 Poin** | Skor bertambah, tercatat sebagai jawaban benar |
| **Naga Ekonomi** | Menjawab Kurang Tepat | **+0 Poin** | Skor aman, pembahasan langsung terbuka |
| **Naga Ekonomi** | Buka Kunci Jawaban Langsung | **+0 Poin** | Skor aman, pembahasan langsung terbuka |
| **Jurang Kuno** | Menjawab Benar | **+0 Poin** | Berhasil bangkit dari jurang |
| **Jurang Kuno** | Menjawab Kurang Tepat | **+0 Poin** | **Tidak ada minus**, ksatria tetap bangkit |
| **Jurang Kuno** | Buka Kunci Jawaban Langsung | **+0 Poin** | **Tidak ada minus**, ksatria tetap bangkit |

### D. Kondisi Kemenangan (*Arcade Finish Condition*)
- Permainan tidak berhenti pada meteran tertentu.
- Tepat pada saat soal ke-**20** selesai dituntaskan (baik dari perjumpaan naga maupun jurang), ksatria menyelesaikan ekspedisi dan layar **Papan Kejayaan Prosperous Kingdom** muncul dengan suara *fanfare victory*.

---

## 6. DESAIN VISUAL, SPRITE ANIMASI & AUDIO

### A. Tampilan Header HUD (Head-Up Display)
Sesuai arahan desain minimalis kerajaan:
- **Pojok Kiri Atas:** `Skor: [Nilai]` ditampilkan dengan warna emas `#FCD34D`, font medieval, dan bayangan teks tajam tanpa kotak background.
- **Tengah Atas:** `Soal Terjawab: [X] / 20` ditampilkan dengan warna putih bersih `#FFFFFF` tanpa ikon emoji tambahan.

### B. Desain Modal Kuis (*Compact Glassmorphism*)
- Menggunakan latar belakang semitransparan `rgba(15, 23, 42, 0.88)` dengan efek *backdrop-filter blur 16px* dan garis tepi emas kerajaan `rgba(245, 158, 11, 0.6)`.
- Dirancang kompak dan responsif sehingga **tidak memicu *scrollbar*** pada layar resolusi standar maupun laptop kelas saat kotak pembahasan muncul.
- Header modal polosan tanpa ikon: *"Naga Ekonomi Bertanya"* atau *"Terjatuh ke Jurang Kuno"*.
- Waktu timer ditampilkan minimalis: `[Sisa]s`.

### C. Animasi Karakter Ksatria (*Knight Running Cycle*)
Ksatria memiliki 4 siklus pose lari dinamis beresolusi 180x180 piksel (tinggi 160 piksel tubuh penuh):
- **Frame 0 (`knight_0.png`):** Mengangkat pedang ke atas, perisai di dada, kaki melangkah lebar ke depan (juga digunakan sebagai pose lompat).
- **Frame 1 (`knight_1.png`):** Pedang mengarah ke depan, jubah berkibar, kedua kaki rapat dalam fase dorongan lari.
- **Frame 2 (`knight_2.png`):** Kaki bergantian melangkah, tubuh condong lari stabil (juga digunakan sebagai pose saat tergelincir ke jurang).
- **Frame 3 (`knight_3.png`):** Fase transisi langkah penuh, perisai siap menangkis, kaki belakang mendorong tanah.

### D. Lingkungan Jalan Bebas Batas Putih
- Tekstur jalanan (`ground.webp`) diproses secara digital sehingga seluruh piksel putih di atas pucuk rumput dijadikan transparan (alpha channel 0). Rumput menyatu secara alami dengan latar kastil dan perbukitan tanpa ada sekat balok putih.

### E. Desain Audio & Musik Latar (BGM)
- **Musik Latar Utama:** File audio `assets/bgm-kingdom.mp3` (*Fox Sailor - Elven Kingdom*) diputar berulang (*loop*).
- **Pemutaran Mulus (*Seamless*):** Musik berlanjut tanpa jeda dari halaman beranda saat tombol PLAY ditekan ke dalam permainan.
- **Web Audio API Prosedural SFX:**
  - *Jump:* Dua nada harmonis (440 Hz & 587 Hz).
  - *Land:* Nada segitiga bas frekuensi rendah (150 Hz).
  - *Dragon Chime:* Tiga arpeggio lonceng lembut (784 Hz, 1047 Hz, 1319 Hz).
  - *Fall:* Frekuensi gelombang menurun (600 Hz ➔ 150 Hz).
  - *Rise:* Frekuensi gelombang membubung ke atas (200 Hz ➔ 700 Hz).
  - *Correct:* Dua nada ceria naik C5 ➔ E5.
  - *Wrong:* Nada kotak rendah lembut (180 Hz).
  - *Victory:* Melodi kemenangan C5 - E5 - G5 - C6.

---

## 7. INFRASTRUKTUR PROGRESSIVE WEB APP (PWA) & OFFLINE

### A. Strategi Cache Service Worker (`sw.js`)
Service Worker menggunakan strategi **Network-First dengan Fallback ke Cache Lokal**:
- Saat ada jaringan lokal/internet: mengutamakan file terbaru dan otomatis memperbarui penyimpanan cache.
- Saat offline: menyajikan seluruh aset secara instan dari cache `prosperous-kingdom-v1`.
- Memanfaatkan `self.skipWaiting()` dan `clients.claim()` untuk aktivasi instan tanpa perlu menutup tab browser.

### B. Precache Manifest Lengkap (44 Aset Utama)
Semua file inti didaftarkan dalam array precache:
1. File Dokumen: `./`, `./index.html`, `./manifest.webmanifest`
2. Style: `./css/base.css`, `./css/ui.css`, `./assets/medieval-font.css`
3. Skrip Modul: `./js/main.js`, `./js/router.js`, `./js/store.js`, `./js/audio.js`, `./js/rng.js`, `./js/track.js`
4. Data: `./js/data/config.js`, `./js/data/strings.js`, `./js/data/questions.js`
5. Game Engine: `./js/game/engine.js`, `./js/game/player.js`, `./js/game/draw.js`, `./js/game/hud.js`
6. Layar Screen: Seluruh modul layar di folder `./js/screens/`
7. Aset Gambar & Font: Seluruh background, tekstur rumput, sprite naga, 4 frame ksatria, dan 3 font biner TTF
8. Audio: `./assets/bgm-kingdom.mp3`

---

## 8. BANK SOAL & PENJELASAN MATERI LENGKAP

Bank soal terdiri dari **40 pertanyaan terstruktur** yang dibagi menjadi dua kategori sesuai konteks perjumpaan:

### Kategori 1: Soal Naga Ekonomi (20 Soal)
*Fokus: Peran Pelaku Ekonomi (RTK, RTP, RTG, MLN), Balas Jasa Faktor Produksi, Kebijakan Ekonomi Pemerintah, Perdagangan Internasional.*

1. **Soal 1:** Penerimaan yang BUKAN balas jasa faktor produksi.  
   *Kunci:* Bantuan sosial dari pemerintah.  
   *Pembahasan:* Balas jasa faktor produksi mencakup sewa (tanah), upah (tenaga kerja), bunga (modal), dan laba (kewirausahaan). Bansos adalah transfer payment tanpa penyerahan faktor produksi.
2. **Soal 2:** Peran pemerintah saat membeli 500 laptop untuk sekolah negeri.  
   *Kunci:* Konsumen belanja barang dan penyedia layanan publik pendidikan.  
   *Pembahasan:* Pemerintah bertindak sebagai konsumen saat belanja barang dan penyedia layanan publik saat menyalurkannya.
3. **Soal 3:** Mengapa Rumah Tangga dan Perusahaan saling bergantung?  
   *Kunci:* RT memperoleh upah dan barang dari perusahaan; perusahaan memperoleh faktor produksi dan pembeli dari RT.  
   *Pembahasan:* RT menyerahkan tenaga kerja dan membeli produk, sedangkan perusahaan membayar upah dan menjual barang.
4. **Soal 4:** Tindakan Masyarakat Luar Negeri yang menambah devisa negara.  
   *Kunci:* Turis mancanegara menukarkan valas untuk berwisata di Indonesia.  
   *Pembahasan:* Pengeluaran turis asing di dalam negeri menghasilkan devisa setara ekspor jasa.
5. **Soal 5:** Siapakah pemilik asli dari faktor produksi tanah dan tenaga kerja?  
   *Kunci:* Rumah Tangga Konsumen (RTK).  
   *Pembahasan:* Seluruh faktor produksi pada akhirnya dimiliki oleh individu/keluarga dalam RTK.
6. **Soal 6:** Contoh peran produsen sebagai konsumen faktor produksi.  
   *Kunci:* Pabrik tekstil membeli kapas dari petani dan merekrut penjahit.  
   *Pembahasan:* Produsen mengonsumsi bahan baku dan jasa tenaga kerja untuk proses manufaktur.
7. **Soal 7:** Fungsi subsidi pupuk oleh pemerintah kepada petani.  
   *Kunci:* Mengurangi biaya produksi petani agar harga pangan terjangkau.  
   *Pembahasan:* Subsidi menekan ongkos produksi produsen pangan nasional.
8. **Soal 8:** Peran Masyarakat Luar Negeri dalam alih teknologi.  
   *Kunci:* Investasi pabrik otomotif modern yang melatih tenaga kerja lokal.  
   *Pembahasan:* Penanaman modal asing membawa transfer teknologi dan keterampilan baru.
9. **Soal 9:** Balas jasa atas penyertaan modal dana usaha.  
   *Kunci:* Bunga (Interest).  
   *Pembahasan:* Modal memperoleh balas jasa bunga, tenaga kerja mendapat upah, tanah mendapat sewa.
10. **Soal 10:** Contoh peran ganda pemerintah sebagai regulator dan produsen.  
    *Kunci:* Menetapkan tarif listrik sekaligus mengoperasikan PLN.  
    *Pembahasan:* Pemerintah menetapkan regulasi tarif dan memproduksi listrik melalui BUMN.

### Kategori 2: Soal Jurang Kuno (20 Soal)
*Fokus: Arus Barang & Jasa, Arus Uang, Pasar Input/Faktor Produksi, Pasar Output/Barang Jasa, Model 2, 3, dan 4 Sektor.*

1. **Soal 1:** Aliran dalam perekonomian dua sektor saat RTK belanja di pasar.  
   *Kunci:* Arus uang mengalir dari RTK ke RTP; arus barang mengalir dari RTP ke RTK.  
   *Pembahasan:* Terjadi di Pasar Output: uang berpindah ke produsen, barang berpindah ke konsumen.
2. **Soal 2:** Penyaluran Bantuan Langsung Tunai (BLT) yang dibelanjakan di warung.  
   *Kunci:* Pemerintah ➔ RTK ➔ RTP (warung).  
   *Pembahasan:* Uang kas negara ditransfer ke masyarakat, lalu dibelanjakan ke warung UMKM.
3. **Soal 3:** Aliran yang terjadi di Pasar Faktor Produksi (Pasar Input).  
   *Kunci:* RTK menyerahkan tenaga kerja ke RTP, RTP membayar upah ke RTK.  
   *Pembahasan:* Pasar input mempertemukan penawaran faktor produksi RTK dengan permintaan RTP.
4. **Soal 4:** Penentu utama model perekonomian terbuka 4 sektor.  
   *Kunci:* Adanya ekspor dan impor barang/jasa dengan Masyarakat Luar Negeri.  
   *Pembahasan:* Sektor luar negeri membuka arus perdagangan internasional lintas batas.
5. **Soal 5:** Pajak penghasilan karyawan yang dibayarkan ke kas negara.  
   *Kunci:* Aliran uang dari RTK ke RTG.  
   *Pembahasan:* RTK menyetorkan sebagian pendapatannya kepada pemerintah tanpa imbalan langsung.

---

## 9. PANDUAN GURU & PENGGUNAAN DI RUANG KELAS

### A. Skenario Pembelajaran (1 Pertemuan = 2 x 45 Menit)
1. **Fase Awal (15 Menit):** Apersepsi materi Pelaku Ekonomi dan penjelasan misi kerajaan kepada siswa.
2. **Fase Eksplorasi Kelompok (45 Menit):**
   - Siswa dibagi menjadi 4–6 kelompok kecil (3–5 siswa per kelompok).
   - Setiap kelompok bermain bergantian di laptop atau perangkat masing-masing.
   - Anggota kelompok berdiskusi saat menghadapi jurang atau naga, memutuskan apakah akan menganalisis sendiri opsi jawaban atau langsung membedah kunci jawaban.
3. **Fase Refleksi & Evaluasi (20 Menit):**
   - Guru membuka layar akhir Papan Kejayaan (*Hall of Fame*).
   - Membuka menu **Review Soal** untuk membahas bersama 2–3 nomor yang paling menantang.
4. **Fase Penutup (10 Menit):** Penarikan kesimpulan alur sirkulasi ekonomi nasional.

### B. Fitur Panel Rahasia Guru (*Teacher Panel*)
- Tekan tombol **`T`** pada keyboard kapan saja saat berada di dalam permainan untuk membuka panel guru.
- Fitur yang tersedia:
  - Penambahan skor cepat (`+5 Poin`) atau pengurangan nilai evaluasi manual (`−5 Poin`).
  - Rotasi giliran ksatria.
  - Reset sesi kuis secara instan.

---

## 10. PANDUAN DEPLOY KE GITHUB PAGES & EKSEKUSI LOKAL

### A. Cara Menjalankan di Komputer Lokal
1. Buka PowerShell atau Terminal di dalam folder proyek:
   ```powershell
   cd "d:\Coding\game edukasi\Prosperous Kingdom"
   ```
2. Jalankan server multi-threaded Python:
   ```powershell
   python server.py
   ```
3. Buka browser (Google Chrome atau Microsoft Edge) pada alamat:
   ```text
   http://localhost:8000/
   ```

### B. Langkah Publikasi ke GitHub Pages (100% Gratis & Otomatis)
Karena semua aset menggunakan path relatif (`./`), repositori dapat langsung dideploy ke GitHub Pages tanpa perlu konfigurasi build atau server hosting khusus:

1. Buka terminal di dalam folder `Prosperous Kingdom`:
   ```bash
   cd "Prosperous Kingdom"
   git init
   git add .
   git commit -m "feat: rilis Prosperous Kingdom Game Edukasi"
   git branch -M main
   git remote add origin https://github.com/USERNAME/prosperous-kingdom.git
   git push -u origin main
   ```
2. Buka repositori Anda di web GitHub:
   - Masuk ke menu **Settings** (tab atas).
   - Pilih submenu **Pages** (di sisi kiri).
   - Pada kolom **Build and deployment**:
     - *Source:* **Deploy from a branch**
     - *Branch:* **main**
     - *Folder:* **/(root)**
   - Klik tombol **Save**.
3. Dalam 1–2 menit, link publik permainan Anda akan aktif:
   ```text
   https://USERNAME.github.io/prosperous-kingdom/
   ```

---
*Dokumentasi ini disusun sebagai panduan menyeluruh bagi pengembang, guru pengampu mata pelajaran Ekonomi, dan siswa pengguna game edukasi Prosperous Kingdom.*
