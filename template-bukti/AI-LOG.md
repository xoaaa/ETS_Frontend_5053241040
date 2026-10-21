# AI-LOG

Catat setiap penggunaan AI yang menghasilkan kode. Jika tidak memakai AI sama sekali, tulis satu baris: **tidak memakai AI**.

Log yang jujur tidak mengurangi nilai, sebanyak apa pun AI dipakai. Yang mengurangi nilai adalah log yang tidak sesuai dengan kode, atau isi log yang tidak bisa kamu jelaskan.

## (Nama fitur atau komponen, misalnya: Penanganan error 409 di form peminjaman, F5)
- Prompt: (ringkas, apa yang kamu minta)
- Dipakai: (bagian kode yang kamu ambil, misalnya nama komponen/fungsi dan file)
- Diubah: (apa yang kamu ubah atau perbaiki dari hasil AI, dan kenapa)

## Bimbingan dan review F1-F4
- Prompt: “Bimbing saya mengerjakan F1-F4 Persona A secara bertahap dan tinjau kode yang saya buat.”
- Dipakai: Penjelasan alur GET sumber daya, POST peminjaman, daftar/filter/detail peminjaman, serta validasi dan penanganan error.
- Bagian kode: Saya menulis sendiri implementasi di `src/api/pinjam.ts`, `src/App.tsx`, dan komponen form serta daftar. Tidak ada kode aplikasi jadi dari AI yang saya salin.
- Perubahan/perbaikan dari hasil AI: Review AI menemukan validasi nama peminjam dijalankan saat komponen dirender, bukan hanya saat form dikirim. AI menyarankan memindahkan pemeriksaan itu ke `handleSubmit`. [Perbarui bagian ini setelah saya menerapkan atau memutuskan tidak menerapkan saran tersebut.]

## Perbaikan validasi form peminjaman (F4)
Prompt yang dikirim: Membantu memperbaiki validasi nama peminjam agar wajib diisi, maksimal 50 karakter, dan dijalankan saat form dikirim, bukan saat komponen dirender.
Bagian kode yang dipakai: Validasi nama peminjam di src/components/PeminjamanForm.tsx.
Perubahan atau perbaikan: Memindahkan validasi nama ke dalam fungsi handleSubmit agar React tidak mengubah state saat proses render. Menambahkan batas panjang nama peminjam maksimal 50 karakter.

## Penanganan pesan error dari server (F4)
Prompt yang dikirim: Membantu menampilkan pesan error dari server sesuai respons API dan menangani kegagalan request.
Bagian kode yang dipakai: Fungsi pembacaan pesan error di src/api/pinjam.ts dan bagian catch pada komponen terkait.
Perubahan atau perbaikan: Mengambil pesan dari field error pada respons JSON server agar pesan tersebut dapat ditampilkan di frontend. Menyediakan pesan alternatif jika respons tidak memiliki pesan error yang valid atau server tidak dapat dihubungi.

## Perbaikan status loading dan validasi tanggal (F4)
Prompt yang dikirim: Membantu memastikan teks loading berhenti saat request gagal dan tanggal peminjaman divalidasi sebelum dikirim.
Bagian kode yang dipakai: src/App.tsx, src/components/PeminjamanList.tsx, dan src/components/PeminjamanForm.tsx.
Perubahan atau perbaikan: Memastikan status loading diakhiri setelah request selesai, termasuk ketika gagal. Menyesuaikan teks loading menjadi Memuat... dan memeriksa validitas tanggal sebelum mengirim data peminjaman.