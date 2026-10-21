import { type FilterPeminjaman, type Peminjaman, type SumberDaya } from "../api/pinjam";

type PeminjamanListProps = {
  peminjaman: Peminjaman[];
  sumberDaya: SumberDaya[];
  filter: FilterPeminjaman;
  memuat: boolean;
  error: string;
  onFilterChange: (filter: FilterPeminjaman) => void;
  onDetail: (id: number) => void;
};

function PeminjamanList({peminjaman, sumberDaya, filter, memuat, error, onFilterChange, onDetail}: PeminjamanListProps) {
  return (
    <section>
      <h2>Daftar peminjaman</h2>
      <div>
        <label htmlFor="filter-sumber-daya">
          Filter sumber daya
        </label>
        <select
          id="filter-sumber-daya"
          value={filter.sumber_daya_id ?? ""}
          onChange={(event) =>
            onFilterChange({...filter, sumber_daya_id: event.target.value})}>
          <option value="">Semua</option>
          {sumberDaya.map((item) => (
            <option key={item.id} value={item.id}>
              {item.nama}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="filter-tanggal">Filter tanggal</label>
        <input
          id="filter-tanggal"
          type="date"
          value={filter.tanggal ?? ""}
          onChange={(event) =>
            onFilterChange({...filter, tanggal: event.target.value})}/>
      </div>

      <div>
        <label htmlFor="filter-status">Filter status</label>
        <select
          id="filter-status"
          value={filter.status ?? ""}
          onChange={(event) =>
            onFilterChange({...filter, status: event.target.value})}>
          <option value="">Semua</option>
          <option value="aktif">Aktif</option>
          <option value="dibatalkan">Dibatalkan</option>
        </select>
      </div>

      {memuat && <p>Memuat daftar peminjaman...</p>}
      {error && <p role="alert">{error}</p>}
      {!memuat && !error && peminjaman.length === 0 && (<p>Belum ada peminjaman.</p>)}

      {!memuat && (
        <ul aria-label="Daftar peminjaman">
          {peminjaman.map((item) => (
            <li key={item.id}>
              <p>Peminjam: {item.peminjam}</p>
              <p>Tanggal: {item.tanggal}</p>
              <p>Slot {item.slot_mulai}-{item.slot_selesai}</p>
              <p>Jumlah: {item.jumlah}</p>
              <p>Status: {item.status}</p>

              <button
                type="button"
                onClick={() => onDetail(item.id)}>
                Detail
              </button>

              <button type="button" disabled>Edit</button>
              <button type="button" disabled>Hapus</button>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}

export default PeminjamanList;
