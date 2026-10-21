import { useState, type FormEvent } from "react";
import {
  tambahPeminjaman,
  type SumberDaya,
} from "../api/pinjam";

type PeminjamanFormProps = {sumberDaya: SumberDaya[]; onBerhasilSimpan: () => void};

function PeminjamanForm({sumberDaya, onBerhasilSimpan}: PeminjamanFormProps) {
  const [sumberDayaId, setSumberDayaId] = useState("");
  const [peminjam, setPeminjam] = useState("");
  const [tanggal, setTanggal] = useState("");
  const [slotMulai, setSlotMulai] = useState("");
  const [slotSelesai, setSlotSelesai] = useState("");
  const [jumlah, setJumlah] = useState("1");
  const [error, setError] = useState("");
  const [menyimpan, setMenyimpan] = useState(false);
  const sumberDayaTerpilih = sumberDaya.find((item) => item.id === Number(sumberDayaId));
  const namaPeminjam = peminjam.trim();

    if (!namaPeminjam) {
    setError("Nama peminjam wajib diisi.");
    return;
    }

    if (namaPeminjam.length > 50) {
    setError("Nama peminjam maksimal 50 karakter.");
    return;
    }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");

    const peminjamBersih = peminjam.trim();
    const mulaiAngka = Number(slotMulai);
    const selesaiAngka = Number(slotSelesai);
    const jumlahAngka = Number(jumlah);

    if (!sumberDayaTerpilih || sumberDayaId === "") {
      setError("Pilih sumber daya terlebih dahulu.");
      return;
    }

    if (peminjamBersih === "") {
      setError("Nama peminjam tidak boleh kosong.");
      return;
    }

    if (tanggal === "") {
      setError("Tanggal peminjaman wajib diisi.");
      return;
    }

    if (
      !Number.isInteger(mulaiAngka) ||
      mulaiAngka < 1 ||
      mulaiAngka > 8
    ) {
      setError("Slot mulai harus berupa angka 1 sampai 8.");
      return;
    }

    if (
      !Number.isInteger(selesaiAngka) ||
      selesaiAngka < 1 ||
      selesaiAngka > 8
    ) {
      setError("Slot selesai harus berupa angka 1 sampai 8.");
      return;
    }

    if (selesaiAngka < mulaiAngka) {
      setError("Slot selesai tidak boleh lebih kecil dari slot mulai.");
      return;
    }

    if (
      !Number.isInteger(jumlahAngka) ||
      jumlahAngka < 1 ||
      jumlahAngka > sumberDayaTerpilih.stok
    ) {
      setError(
        `Jumlah harus berupa bilangan bulat antara 1 dan ${sumberDayaTerpilih.stok}.`,
      );
      return;
    }

    try {
      setMenyimpan(true);
      await tambahPeminjaman({
        sumber_daya_id: Number(sumberDayaId),
        peminjam: namaPeminjam,
        tanggal,
        slot_mulai: Number(slotMulai),
        slot_selesai: Number(slotSelesai),
        jumlah: Number(jumlah),
        });

      setSumberDayaId("");
      setPeminjam("");
      setTanggal("");
      setSlotMulai("");
      setSlotSelesai("");
      setJumlah("1");
      onBerhasilSimpan();
    
    } catch (err: unknown) {
    if (err instanceof Error) {
        setError(err.message);
    } else {
        setError("Terjadi kesalahan saat menyimpan peminjaman.");
    }
    } finally {
      setMenyimpan(false);
    }
  }

  return (
    <section>
      <h2>Tambah peminjaman</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="sumber-daya-peminjaman">Sumber daya</label>
          <select
            id="sumber-daya-peminjaman"
            value={sumberDayaId}
            onChange={(event) => setSumberDayaId(event.target.value)}>
            <option value="">Pilih sumber daya</option>
            {sumberDaya.map((item) => (
              <option key={item.id} value={item.id}>
                {item.nama}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="peminjam">Peminjam</label>
          <input
            id="peminjam"
            type="text"
            value={peminjam}
            onChange={(event) => setPeminjam(event.target.value)}/>
        </div>

        <div>
          <label htmlFor="tanggal-peminjaman">Tanggal</label>
          <input
            id="tanggal-peminjaman"
            type="date"
            value={tanggal}
            onChange={(event) => setTanggal(event.target.value)}/>
        </div>

        <div>
          <label htmlFor="slot-mulai">Slot mulai</label>
          <select
            id="slot-mulai"
            value={slotMulai}
            onChange={(event) => setSlotMulai(event.target.value)}>
            <option value="">Pilih slot mulai</option>
            {Array.from({ length: 8 }, (_, i) => i + 1).map((slot) => (
              <option key={slot} value={slot}>
                {slot}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="slot-selesai">Slot selesai</label>
          <select
            id="slot-selesai"
            value={slotSelesai}
            onChange={(event) => setSlotSelesai(event.target.value)}>
            <option value="">Pilih slot selesai</option>
            {Array.from({ length: 8 }, (_, i) => i + 1).map((slot) => (
              <option key={slot} value={slot}>
                {slot}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="jumlah-peminjaman">Jumlah</label>
          <input
            id="jumlah-peminjaman"
            type="number"
            min="1"
            max={sumberDayaTerpilih?.stok ?? 1}
            step="1"
            value={jumlah}
            onChange={(event) => setJumlah(event.target.value)}/>
          {sumberDayaTerpilih && (
            <p>Stok tersedia untuk validasi: {sumberDayaTerpilih.stok}</p>
          )}
        </div>
        {error && <p role="alert">{error}</p>}
        <button
          type="submit"
          disabled={menyimpan || sumberDaya.length === 0}> {menyimpan ? "Menyimpan..." : "Simpan peminjaman"}
        </button>
      </form>
    </section>
  );
}

export default PeminjamanForm;
