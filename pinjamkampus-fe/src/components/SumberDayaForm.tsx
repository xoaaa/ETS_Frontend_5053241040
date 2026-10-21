import { useState } from "react";
import { tambahSumberDaya } from "../api/pinjam";

type SumberDayaFormProps = {
  onBerhasil: () => void;
};

function SumberDayaForm({ onBerhasil }: SumberDayaFormProps) {
  const [nama, setNama] = useState("");
  const [jenis, setJenis] = useState<"ruang" | "alat">("ruang");
  const [stok, setStok] = useState("1");
  const [error, setError] = useState("");
  const [menyimpan, setMenyimpan] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    const namaBersih = nama.trim();
    const stokAngka = Number(stok);

    if (namaBersih.length === 0) {
      setError("Nama sumber daya tidak boleh kosong.");
      return;
    }

    if (namaBersih.length > 50) {
      setError("Nama sumber daya maksimal 50 karakter.");
      return;
    }

    if (
      stok.trim() === "" ||
      !Number.isInteger(stokAngka) ||
      stokAngka < 1
    ) {
      setError("Stok harus berupa bilangan bulat minimal 1.");
      return;
    }

    try {
      setMenyimpan(true);
      await tambahSumberDaya({
        nama: namaBersih,
        jenis,
        stok: stokAngka,
      });

      setNama("");
      setJenis("ruang");
      setStok("1");
      onBerhasil();

    } catch {
      setError("Gagal menyimpan sumber daya. Periksa koneksi dan server.");
    } finally {
      setMenyimpan(false);
    }
  }

  return (
    <section>
      <h2>Tambah sumber daya</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="nama-sumber-daya">
            Nama sumber daya
          </label>
          <input
            id="nama-sumber-daya"
            name="nama"
            type="text"
            value={nama}
            onChange={(event) => setNama(event.target.value)}
          />
        </div>
        <div>
          <label htmlFor="jenis-sumber-daya">Jenis</label>
          <select
            id="jenis-sumber-daya"
            name="jenis"
            value={jenis}
            onChange={(event) =>
              setJenis(event.target.value as "ruang" | "alat")
            }
          >
            <option value="ruang">Ruang</option>
            <option value="alat">Alat</option>
          </select>
        </div>

        <div>
          <label htmlFor="stok-sumber-daya">Stok</label>
          <input
            id="stok-sumber-daya"
            name="stok"
            type="number"
            min="1"
            step="1"
            value={stok}
            onChange={(event) => setStok(event.target.value)}
          />
        </div>
        {error && <p role="alert">{error}</p>}
        <button type="submit" disabled={menyimpan}>
          {menyimpan ? "Menyimpan..." : "Simpan sumber daya"}
        </button>
      </form>
    </section>
  );
}

export default SumberDayaForm;