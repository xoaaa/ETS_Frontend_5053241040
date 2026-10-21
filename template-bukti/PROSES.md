# PROSES

## 1. Persona dan masalahnya
(2-3 kalimat dengan kata-katamu sendiri: siapa pengguna persona kamu, masalah apa yang diselesaikan fitur khasnya di layar.)
Saya mendapatkan Persona A, yaitu petugas gedung. Petugas gedung sering ditanya kapan suatu ruang kosong, tetapi harus memeriksa daftar peminjaman satu per satu untuk menjawabnya. Papan ketersediaan yang saya buat akan menampilkan delapan slot pada satu tanggal, beserta sisa stok dan apakah tiap slot masih tersedia.

## 2. Rancangan komponen dan state
(Gambar atau tulis pembagian komponen: komponen apa saja, state apa disimpan di komponen mana, dan props apa yang mengalir ke bawah. Rancang ini sebelum menulis kode, lalu catat kalau berubah di tengah jalan.)
Saya membagi komponen berdasarkan tanggung jawabnya. `App.tsx` mengatur data yang digunakan oleh beberapa bagian aplikasi. `SumberDayaForm.tsx` menangani penambahan sumber daya. `PeminjamanForm.tsx` menangani pembuatan dan pengubahan peminjaman. `PeminjamanList.tsx` menampilkan daftar dan filter peminjaman serta tombol aksinya. `PeminjamanDetail.tsx` menampilkan detail yang diminta. `KetersediaanBoard.tsx` menampilkan kondisi delapan slot berdasarkan sumber daya dan tanggal. Fungsi fetch akan diletakkan di `src/api/pinjam.ts`, sementara komponen memanggil fungsi API tersebut.

## 3. Satu keputusan desain
(Satu keputusan yang kamu ambil, pilihan lain yang kamu pertimbangkan, dan alasanmu memilih yang ini. Contoh: kenapa daftar peminjaman diambil ulang dari server setelah setiap aksi, bukan hanya diubah di state.)

## 4. Bug atau kendala (minimal dua)
### Bug 1
- Gejala:
- Cara menemukan:
- Penyebab dan solusi:

### Bug 2
- Gejala:
- Cara menemukan:
- Penyebab dan solusi:

## 5. Change request
(Apa yang diminta, bagian kode mana yang kamu ubah, dan satu keputusan desain yang kamu ambil.)
