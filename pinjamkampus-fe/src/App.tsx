import { useEffect, useState } from "react";
import { getSumberDaya, getPeminjaman, getDetailPeminjaman, type SumberDaya, type Peminjaman, type FilterPeminjaman } from "./api/pinjam";import SumberDayaForm from "./components/SumberDayaForm";
import PeminjamanForm from "./components/PeminjamanForm";
import PeminjamanList from "./components/PeminjamanList";

function App() {
  const [sumberDaya, setSumberDaya] = useState<SumberDaya[]>([]);
  const [memuat, setMemuat] = useState(true);
  const [error, setError] = useState("");
  const [refreshKey, setRefreshKey] = useState(0);
  const [pesanPeminjaman, setPesanPeminjaman] = useState("");
  const [peminjaman, setPeminjaman] = useState<Peminjaman[]>([]);
  const [filterPeminjaman, setFilterPeminjaman] = useState<FilterPeminjaman>({});
  const [memuatPeminjaman, setMemuatPeminjaman] = useState(true);
  const [errorPeminjaman, setErrorPeminjaman] = useState("");
  const [refreshPeminjamanKey, setRefreshPeminjamanKey] = useState(0);
  const [detailPeminjaman, setDetailPeminjaman] = useState<Peminjaman | null>(null);
  const [memuatDetail, setMemuatDetail] = useState(false);
  const [errorDetail, setErrorDetail] = useState("");

  useEffect(() => {
    async function muatSumberDaya() {
      setMemuat(true);
      setError("");
      try {
        const data = await getSumberDaya();
        setSumberDaya(data);
      } catch {
        setError("Gagal mengambil daftar sumber daya.");
      } finally {
        setMemuat(false);
      }
    }
    void muatSumberDaya();
  }, [refreshKey]);

  useEffect(() => {
    async function muatPeminjaman() {
      setMemuatPeminjaman(true);
      setErrorPeminjaman("");

      try {
        const data = await getPeminjaman(filterPeminjaman);
        setPeminjaman(data);
      } catch {
        setErrorPeminjaman("Gagal mengambil daftar peminjaman.");
      } finally {
        setMemuatPeminjaman(false);
      }
    }
    void muatPeminjaman();
  }, [filterPeminjaman, refreshPeminjamanKey]);

  function perbaruiDaftar() {
    setRefreshKey((sebelumnya) => sebelumnya + 1);
  }

  function setelahPeminjamanBerhasil() {
  setPesanPeminjaman("Peminjaman berhasil disimpan.");
  setRefreshPeminjamanKey((sebelumnya) => sebelumnya + 1);
  }

  async function bukaDetailPeminjaman(id: number) {
    setMemuatDetail(true);
    setErrorDetail("");
    setDetailPeminjaman(null);
    try {
      const data = await getDetailPeminjaman(id);
      setDetailPeminjaman(data);
    } catch {
      setErrorDetail("Gagal mengambil detail peminjaman.");
    } finally {
      setMemuatDetail(false);
    }
  }

  return (
    <main>
      <h1>PinjamKampus</h1>
      <SumberDayaForm onBerhasil={perbaruiDaftar} />
      <section>
        <h2>Daftar sumber daya</h2>
        {memuat && <p>Memuat...</p>}
        {error && <p role="alert">{error}</p>}
        {!memuat && !error && sumberDaya.length === 0 && (
          <p>Belum ada sumber daya.</p>
        )}
        {!memuat && (
          <ul aria-label="Daftar sumber daya">
            {sumberDaya.map((item) => (
              <li key={item.id}>
                {item.nama} - {item.jenis} - Stok: {item.stok}
              </li>
            ))}
          </ul>
        )}
      </section>
      
      <PeminjamanForm
        sumberDaya={sumberDaya}
        onBerhasilSimpan={setelahPeminjamanBerhasil}
      />

      {pesanPeminjaman && (
        <p role="status">{pesanPeminjaman}</p>
      )}

      <PeminjamanList
        peminjaman={peminjaman}
        sumberDaya={sumberDaya}
        filter={filterPeminjaman}
        memuat={memuatPeminjaman}
        error={errorPeminjaman}
        onFilterChange={setFilterPeminjaman}
        onDetail={bukaDetailPeminjaman}/>
      <section aria-label="Detail peminjaman">
        <h2>Detail peminjaman</h2>
        {memuatDetail && <p>Memuat detail peminjaman...</p>}
        {errorDetail && <p role="alert">{errorDetail}</p>}
        {detailPeminjaman && (
          <>
            <p>ID: {detailPeminjaman.id}</p>
            <p>Peminjam: {detailPeminjaman.peminjam}</p>
            <p>Tanggal: {detailPeminjaman.tanggal}</p>
            <p> Slot {detailPeminjaman.slot_mulai}-{detailPeminjaman.slot_selesai}</p>
            <p>Jumlah: {detailPeminjaman.jumlah}</p>
            <p>Status: {detailPeminjaman.status}</p>
          </>
        )}
      </section>
    </main>

  );
}
export default App;
