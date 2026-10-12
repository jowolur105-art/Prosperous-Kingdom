/**
 * questions.js — Bank soal (JANGAN diubah isinya, salin persis dari spesifikasi).
 * benar = indeks opsi yang benar (0–3) SEBELUM diacak.
 * tp = tujuan pembelajaran. level = level kognitif.
 */

export const QUESTIONS_MALAIKAT = [
  {
    id: 'M1', tp: 1, level: 'C4',
    soal: 'Pak Dani bekerja sebagai karyawan di pabrik sepatu dan menerima upah setiap bulan. Sebagian upahnya ia belanjakan untuk kebutuhan keluarga di pasar. Pernyataan yang paling tepat tentang peran Pak Dani dalam kegiatan ekonomi adalah...',
    opsi: [
      'Ia hanya berperan sebagai konsumen, karena upah yang diterima habis dibelanjakan.',
      'Ia berperan sebagai produsen karena ikut membuat sepatu, sehingga ia termasuk pelaku perusahaan.',
      'Ia berperan sebagai penyedia faktor produksi (tenaga kerja) sekaligus konsumen, keduanya sebagai bagian dari rumah tangga.',
      'Ia hanya berperan sebagai penyedia faktor produksi, karena berbelanja bukan kegiatan ekonomi.',
    ],
    benar: 2,
    penjelasan: 'Satu pelaku dapat menjalankan lebih dari satu peran. Saat bekerja, Pak Dani menyediakan tenaga kerja (faktor produksi) dan menerima upah; saat berbelanja, ia menjadi konsumen. Keduanya perannya sebagai rumah tangga. Produsen sepatu adalah pabrik (perusahaan), bukan karyawannya.',
  },
  {
    id: 'M2', tp: 1, level: 'C4',
    soal: 'Pemerintah daerah memungut retribusi dari pedagang pasar, lalu memakai dananya untuk memperbaiki saluran air dan lantai pasar. Kedua tindakan itu menunjukkan bahwa pemerintah berperan sebagai...',
    opsi: [
      'regulator saja, karena seluruh tindakannya berupa penetapan aturan.',
      'pemungut pungutan dari pelaku usaha sekaligus penyedia layanan publik.',
      'produsen barang konsumsi yang bersaing dengan para pedagang.',
      'pemberi subsidi, karena perbaikan pasar menguntungkan pedagang.',
    ],
    benar: 1,
    penjelasan: 'Retribusi adalah pungutan atas layanan atau fasilitas, dan perbaikan saluran serta lantai pasar adalah layanan publik. Perannya tidak hanya regulator karena pemerintah juga menyediakan fasilitas. Subsidi adalah bantuan dana untuk menurunkan biaya atau harga, bukan perbaikan fasilitas.',
  },
  {
    id: 'M3', tp: 1, level: 'C4',
    soal: 'Sebuah pabrik kopi di Jawa Tengah menjual 10 ton kopi kepada pembeli perorangan di Malaysia. Dilihat dari pelaku kegiatan ekonomi, pihak yang terlibat dalam transaksi tersebut adalah...',
    opsi: [
      'perusahaan sebagai produsen dan rumah tangga sebagai pembeli, karena pembelinya perorangan.',
      'perusahaan sebagai produsen dan pemerintah sebagai pengawas pembeli.',
      'hanya perusahaan, karena transaksi dagang selalu terjadi antarperusahaan.',
      'perusahaan sebagai produsen (eksportir) dan masyarakat luar negeri sebagai pembeli.',
    ],
    benar: 3,
    penjelasan: 'Semua pihak asing, baik perorangan maupun perusahaan, termasuk masyarakat luar negeri. Transaksi menjual barang kepada mereka disebut ekspor. Status perorangan tidak mengubah mereka menjadi rumah tangga dalam negeri.',
  },
  {
    id: 'M4', tp: 2, level: 'C4',
    soal: 'Para pekerja di sebuah desa mogok kerja selama sebulan sehingga aliran tenaga kerja ke perusahaan berhenti. Pada perekonomian dua sektor, urutan akibat yang paling logis adalah...',
    opsi: [
      'produksi turun, upah tidak mengalir ke rumah tangga, lalu belanja rumah tangga ke perusahaan ikut turun.',
      'aliran barang berhenti terlebih dahulu, baru kemudian tenaga kerja ikut berhenti.',
      'biaya upah hilang sehingga laba perusahaan naik dan aliran barang ke rumah tangga bertambah.',
      'hanya aliran uang yang terganggu, sedangkan aliran barang dan jasa tidak terpengaruh.',
    ],
    benar: 0,
    penjelasan: 'Circular flow saling terkait: faktor produksi diolah menjadi barang, perusahaan membayar balas jasa, lalu rumah tangga berbelanja. Jika tenaga kerja berhenti, produksi dan upah ikut berhenti, dan belanja pun menurun. Aliran barang juga terganggu karena produksinya turun.',
  },
  {
    id: 'M5', tp: 2, level: 'C4',
    soal: 'Pemerintah menaikkan pajak perusahaan, lalu seluruh tambahan penerimaannya dipakai untuk membangun jalan melalui kontraktor swasta. Gambaran aliran yang paling tepat adalah...',
    opsi: [
      'uang pajak keluar dari perekonomian karena dikuasai pemerintah.',
      'uang mengalir dari perusahaan ke pemerintah, kembali ke perusahaan (kontraktor) sebagai pembayaran, dan jalan menjadi layanan publik bagi rumah tangga dan perusahaan.',
      'pajak hanya mengalir satu arah, dari perusahaan ke pemerintah, sehingga perusahaan pasti dirugikan.',
      'uang mengalir dari rumah tangga ke pemerintah, lalu dibayarkan langsung kepada rumah tangga yang sama.',
    ],
    benar: 1,
    penjelasan: 'Pajak adalah aliran uang dari perusahaan ke pemerintah. Pemerintah membelanjakannya kepada kontraktor (belanja pemerintah), sehingga uang kembali ke perusahaan. Jalan yang dibangun menjadi layanan publik yang dinikmati rumah tangga dan perusahaan.',
  },
  {
    id: 'M6', tp: 2, level: 'C4',
    soal: 'Bu Rina memiliki sebuah kios dan menyewakannya kepada toko pakaian. Uang sewa yang ia terima setiap bulan dalam circular flow termasuk...',
    opsi: [
      'pembayaran belanja konsumsi, yang mengalir dari rumah tangga ke perusahaan.',
      'pajak, yang mengalir dari rumah tangga ke pemerintah.',
      'balas jasa atas faktor produksi, yang mengalir dari perusahaan ke rumah tangga.',
      'subsidi, yang mengalir dari pemerintah ke rumah tangga.',
    ],
    benar: 2,
    penjelasan: 'Kios adalah faktor produksi (modal atau tanah) milik rumah tangga yang dipakai perusahaan. Uang sewa adalah balas jasanya dan mengalir dari perusahaan ke rumah tangga. Belanja konsumsi arahnya sebaliknya, yaitu dari rumah tangga ke perusahaan.',
  },
  {
    id: 'M7', tp: 2, level: 'C5',
    soal: 'Sebuah pabrik besar di desa tutup dan 300 pekerjanya kehilangan pekerjaan. Dampak berantai yang paling sesuai dengan keterkaitan antarpelaku adalah...',
    opsi: [
      'hanya pemilik pabrik yang dirugikan, karena pekerja dapat langsung beralih ke kegiatan lain.',
      'rumah tangga memperoleh waktu luang lebih banyak sehingga belanja mereka meningkat.',
      'pemerintah diuntungkan karena tidak perlu lagi menyediakan layanan bagi kawasan pabrik.',
      'upah rumah tangga hilang, belanja turun, penjualan perusahaan lain menurun, dan penerimaan pajak pemerintah berkurang.',
    ],
    benar: 3,
    penjelasan: 'Telusuri alirannya: upah berhenti, pendapatan rumah tangga turun, belanja ke perusahaan lain menurun, dan pajak yang diterima pemerintah ikut berkurang. Dampaknya menjalar ke banyak pelaku, tidak hanya pemilik pabrik.',
  },
  {
    id: 'M8', tp: 1, level: 'C4',
    soal: 'Pemerintah membeli 500 laptop dari sebuah perusahaan untuk dipakai di sekolah-sekolah negeri. Pada rangkaian tindakan ini, pemerintah berperan sebagai...',
    opsi: [
      'produsen laptop, karena laptop kemudian menjadi milik pemerintah.',
      'konsumen saat membeli laptop dan penyedia layanan publik saat laptop dipakai untuk pendidikan.',
      'pemberi subsidi kepada perusahaan, karena pembelian dilakukan dalam jumlah besar.',
      'regulator saja, karena pembelian dilakukan menurut aturan pengadaan.',
    ],
    benar: 1,
    penjelasan: 'Saat membeli barang, pemerintah menjadi konsumen (belanja pemerintah). Ketika laptop dipakai untuk pembelajaran, pemerintah menyediakan layanan publik di bidang pendidikan. Subsidi adalah bantuan tanpa pembelian barang, dan pemerintah tidak memproduksi laptop.',
  },
  {
    id: 'M9', tp: 1, level: 'C5',
    soal: 'Pak Hasan membuka bengkel motor di rumahnya dan setiap hari berbelanja kebutuhan dapur di pasar. Pernyataan yang paling tepat adalah...',
    opsi: [
      'Pak Hasan hanya rumah tangga, karena bengkelnya berada di rumah.',
      'Pak Hasan sepenuhnya perusahaan, sehingga belanja dapurnya tidak lagi termasuk kegiatan rumah tangga.',
      'Pak Hasan termasuk pemerintah, karena bengkelnya memerlukan izin usaha.',
      'Bengkelnya berperan sebagai perusahaan (produsen jasa), sedangkan belanja dapurnya menunjukkan peran rumah tangga sebagai konsumen.',
    ],
    benar: 3,
    penjelasan: 'Pelaku ekonomi dinilai dari peran atau fungsi yang dijalankan, bukan dari tempat atau orangnya. Bengkel yang menghasilkan jasa berperan sebagai perusahaan, sedangkan belanja dapur adalah peran rumah tangga sebagai konsumen. Izin usaha tidak membuat pemilik bengkel menjadi pemerintah.',
  },
  {
    id: 'M10', tp: 2, level: 'C4',
    soal: 'Dalam sebulan Bu Lia menerima gaji sebagai karyawan, bunga deposito, uang sewa rumah, dan bantuan sosial dari pemerintah. Penerimaan yang BUKAN balas jasa atas faktor produksi adalah...',
    opsi: [
      'gaji sebagai karyawan',
      'bunga deposito',
      'uang sewa rumah',
      'bantuan sosial dari pemerintah',
    ],
    benar: 3,
    penjelasan: 'Gaji adalah balas jasa tenaga kerja, bunga adalah balas jasa modal, dan sewa adalah balas jasa tanah atau bangunan. Bantuan sosial merupakan transfer dari pemerintah, bukan imbalan atas faktor produksi yang disumbangkan.',
  },
];

export const QUESTIONS_JURANG = [
  {
    id: 'J1', tp: 2, level: 'C4',
    soal: 'Perhatikan empat aliran berikut: (1) faktor produksi, (2) balas jasa, (3) barang dan jasa hasil produksi, (4) pembayaran belanja konsumsi. Pasangan yang keduanya merupakan aliran barang/jasa dan arahnya benar adalah...',
    opsi: [
      '(1) dari rumah tangga ke perusahaan dan (3) dari perusahaan ke rumah tangga.',
      '(1) dari perusahaan ke rumah tangga dan (3) dari rumah tangga ke perusahaan.',
      '(2) dari rumah tangga ke perusahaan dan (4) dari perusahaan ke rumah tangga.',
      '(1) dan (4), keduanya dari rumah tangga ke perusahaan.',
    ],
    benar: 0,
    penjelasan: 'Aliran riil: (1) rumah tangga ke perusahaan dan (3) perusahaan ke rumah tangga. Aliran uang: (2) perusahaan ke rumah tangga dan (4) rumah tangga ke perusahaan. Pilihan terakhir mencampur aliran riil (1) dengan aliran uang (4).',
  },
  {
    id: 'J2', tp: 2, level: 'C5',
    soal: 'Koperasi Tani Jaya menerima subsidi pupuk dari pemerintah. Biaya produksi turun, hasil panen naik, dan koperasi membayar pajak lebih besar. Kesimpulan yang paling tepat tentang aliran uangnya adalah...',
    opsi: [
      'subsidi adalah aliran barang dari pemerintah ke rumah tangga petani.',
      'uang yang keluar sebagai subsidi pasti tidak kembali kepada pemerintah.',
      'pajak yang dibayar koperasi mengalir ke luar negeri.',
      'uang mengalir dari pemerintah ke koperasi sebagai subsidi, dan sebagian kembali ke pemerintah sebagai pajak saat usaha berkembang.',
    ],
    benar: 3,
    penjelasan: 'Subsidi adalah aliran uang dari pemerintah ke perusahaan (koperasi). Ketika usaha berkembang, pajak yang dibayar koperasi mengalir kembali ke pemerintah. Jadi uangnya berputar, tidak hilang.',
  },
  {
    id: 'J3', tp: 2, level: 'C5',
    soal: 'Pemerintah menaikkan pajak penghasilan, tetapi layanan publik yang diterima warga tidak berubah. Dampak yang paling mungkin bagi rumah tangga dan perusahaan adalah...',
    opsi: [
      'pendapatan yang dapat dibelanjakan rumah tangga berkurang sehingga penjualan perusahaan cenderung turun.',
      'belanja rumah tangga naik karena warga ingin mendapat manfaat dari pajak.',
      'aliran barang dan jasa dari pemerintah ke rumah tangga otomatis bertambah.',
      'perusahaan diuntungkan karena rumah tangga membayar lebih banyak kepada pemerintah.',
    ],
    benar: 0,
    penjelasan: 'Pajak yang lebih besar mengurangi uang yang tersisa untuk belanja. Belanja yang turun berarti penjualan perusahaan ikut turun. Karena layanan publik tidak bertambah, rumah tangga tidak menerima manfaat tambahan.',
  },
  {
    id: 'J4', tp: 2, level: 'C4',
    soal: 'Dibandingkan perekonomian dua sektor, kehadiran pemerintah pada perekonomian tiga sektor terutama menambah...',
    opsi: [
      'aliran faktor produksi dari pemerintah ke perusahaan sebagai pengganti tenaga kerja.',
      'aliran pajak ke pemerintah serta aliran belanja, subsidi, gaji, dan layanan publik dari pemerintah.',
      'aliran ekspor dan impor antara perusahaan dan pihak asing.',
      'aliran belanja konsumsi, karena hanya pemerintah yang berperan sebagai konsumen.',
    ],
    benar: 1,
    penjelasan: 'Pemerintah menambah dua kelompok aliran: pajak yang masuk ke pemerintah, serta belanja pemerintah, subsidi, gaji, bantuan, dan layanan publik yang keluar dari pemerintah. Ekspor dan impor baru muncul pada perekonomian empat sektor.',
  },
  {
    id: 'J5', tp: 2, level: 'C4',
    soal: 'Sebuah perusahaan di Jawa Tengah mengimpor mesin dari Jerman. Gambaran aliran antara perusahaan dan masyarakat luar negeri yang tepat adalah...',
    opsi: [
      'barang mengalir dari perusahaan ke Jerman, dan uang mengalir dari Jerman ke perusahaan.',
      'barang dan uang sama-sama mengalir dari Jerman ke perusahaan.',
      'barang mengalir dari Jerman ke perusahaan, dan uang mengalir dari perusahaan ke Jerman.',
      'barang mengalir dari Jerman ke pemerintah, dan uang dari perusahaan ke rumah tangga.',
    ],
    benar: 2,
    penjelasan: 'Impor berarti barang masuk dari luar negeri ke perusahaan, dan sebagai imbalannya uang mengalir keluar dari perusahaan ke pihak luar negeri. Barang dan uang selalu berlawanan arah.',
  },
  {
    id: 'J6', tp: 2, level: 'C5',
    soal: 'Pemerintah daerah terlambat membayar gaji aparatur selama dua bulan. Rangkaian dampak yang paling logis adalah...',
    opsi: [
      'perusahaan diuntungkan karena rumah tangga mengurangi belanja.',
      'tidak ada dampak, karena aparatur pemerintah bukan bagian dari rumah tangga.',
      'penerimaan pajak pemerintah naik karena uang gaji tertahan.',
      'pendapatan rumah tangga aparatur tertunda, belanja mereka turun, lalu penjualan pedagang dan perusahaan sekitar ikut menurun.',
    ],
    benar: 3,
    penjelasan: 'Gaji adalah aliran uang dari pemerintah ke rumah tangga. Saat tertunda, belanja rumah tangga menurun dan penjualan perusahaan di sekitarnya ikut turun. Aparatur tetap bagian dari rumah tangga.',
  },
  {
    id: 'J7', tp: 2, level: 'C5',
    soal: 'Rumah tangga dan perusahaan sering disebut saling bergantung. Alasan yang paling tepat adalah...',
    opsi: [
      'rumah tangga membutuhkan perusahaan hanya sebagai tempat berbelanja, sedangkan perusahaan tidak membutuhkan rumah tangga.',
      'rumah tangga memperoleh upah dan barang dari perusahaan, sedangkan perusahaan memperoleh tenaga kerja dan pembeli dari rumah tangga.',
      'keduanya sama-sama menghasilkan barang sehingga harus saling menyaingi.',
      'ketergantungan hanya terjadi jika pemerintah ikut campur.',
    ],
    benar: 1,
    penjelasan: 'Rumah tangga menyediakan faktor produksi dan menjadi pembeli, sedangkan perusahaan memberi balas jasa dan menyediakan barang serta jasa. Keduanya saling membutuhkan tanpa harus ada pemerintah.',
  },
  {
    id: 'J8', tp: 2, level: 'C4',
    soal: 'Pemerintah menyalurkan bantuan langsung tunai kepada warga, dan warga membelanjakannya di warung. Urutan aliran uang yang tepat adalah...',
    opsi: [
      'pemerintah, lalu perusahaan (warung), lalu rumah tangga.',
      'pemerintah, lalu rumah tangga, lalu perusahaan (warung).',
      'rumah tangga, lalu pemerintah, lalu perusahaan (warung).',
      'perusahaan (warung), lalu pemerintah, lalu rumah tangga.',
    ],
    benar: 1,
    penjelasan: 'Bantuan mengalir dari pemerintah ke rumah tangga, lalu rumah tangga membelanjakannya sehingga uang mengalir ke perusahaan (warung). Dengan begitu bantuan juga menambah penjualan perusahaan.',
  },
  {
    id: 'J9', tp: 1, level: 'C5',
    soal: 'Manakah pernyataan yang SALAH tentang peran pemerintah dalam perekonomian tiga sektor?',
    opsi: [
      'Pemerintah dapat menjadi konsumen saat berbelanja barang dan jasa.',
      'Pemerintah menerima uang dalam bentuk pajak dari rumah tangga dan perusahaan.',
      'Pemerintah hanya menerima uang dan tidak pernah mengeluarkannya kepada pelaku lain.',
      'Pemerintah menyediakan layanan publik bagi rumah tangga.',
    ],
    benar: 2,
    penjelasan: 'Pemerintah tidak hanya menerima uang. Ia juga mengeluarkannya sebagai belanja pemerintah, subsidi, gaji, bantuan, dan layanan publik.',
  },
  {
    id: 'J10', tp: 1, level: 'C4',
    soal: 'Koperasi simpan pinjam milik warga menyediakan jasa pinjaman dan memperoleh bunga dari peminjam. Koperasi tersebut tergolong...',
    opsi: [
      'rumah tangga, karena dimiliki oleh para warga.',
      'pemerintah, karena berbadan hukum.',
      'masyarakat luar negeri, karena menerapkan sistem bunga.',
      'perusahaan, karena menghasilkan jasa untuk dijual dan memperoleh pendapatan.',
    ],
    benar: 3,
    penjelasan: 'Pelaku ekonomi ditentukan oleh fungsinya. Koperasi menghasilkan jasa dan memperoleh pendapatan sehingga termasuk perusahaan, meskipun pemiliknya adalah warga.',
  },
];
