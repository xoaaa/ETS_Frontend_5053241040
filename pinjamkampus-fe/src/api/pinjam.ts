const API_URL = "http://localhost:8080";

async function bacaPesanError(response: Response, pesanDefault: string): Promise<string> {
  try {
    const data: unknown = await response.json();

    if (
      typeof data === "object" &&
      data !== null &&
      "error" in data &&
      typeof data.error === "string"
    ) {
      return data.error;
    }
  } catch {}
  return pesanDefault;
}

export type SumberDaya = {
  id: number;
  nama: string;
  jenis: "ruang" | "alat";
  stok: number;
};

export type SumberDayaInput = {
  nama: string;
  jenis: "ruang" | "alat";
  stok: number;
};

export type PeminjamanInput = {
  sumber_daya_id: number;
  peminjam: string;
  tanggal: string;
  slot_mulai: number;
  slot_selesai: number;
  jumlah: number;
};

export type Peminjaman = PeminjamanInput & {
  id: number;
  status: string;
};

export type FilterPeminjaman = {
  sumber_daya_id?: string;
  tanggal?: string;
  status?: string;
};

export async function getSumberDaya(): Promise<SumberDaya[]> {
  const response = await fetch(`${API_URL}/sumber-daya`);
  if (!response.ok) {
    throw new Error("Gagal mengambil daftar sumber daya.");
  }
  return (await response.json()) as SumberDaya[];
}

export async function tambahSumberDaya(data: SumberDayaInput,): Promise<SumberDaya> {
  const response = await fetch(`${API_URL}/sumber-daya`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      nama: data.nama,
      jenis: data.jenis,
      stok: data.stok,
    }),
  });
  if (!response.ok) {
    throw new Error("Gagal menyimpan sumber daya.");
  }
  return (await response.json()) as SumberDaya;
}

export async function tambahPeminjaman(data: PeminjamanInput): Promise<Peminjaman> {
  const response = await fetch(`${API_URL}/peminjaman`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  if (!response.ok) {
  throw new Error(
    await bacaPesanError(
      response, "Gagal menyimpan peminjaman."),
    );}
  return (await response.json()) as Peminjaman;
}

export async function getPeminjaman(filter: FilterPeminjaman = {}): Promise<Peminjaman[]> {
  const params = new URLSearchParams();

  if (filter.sumber_daya_id) {
    params.set("sumber_daya_id", filter.sumber_daya_id);
  }

  if (filter.tanggal) {
    params.set("tanggal", filter.tanggal);
  }

  if (filter.status) {
    params.set("status", filter.status);
  }

  const query = params.toString();
  const url = query ? `${API_URL}/peminjaman?${query}` : `${API_URL}/peminjaman`;
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error("Gagal mengambil daftar peminjaman.");
  }
  return (await response.json()) as Peminjaman[];
}

export async function getDetailPeminjaman(id: number): Promise<Peminjaman> {
  const response = await fetch(`${API_URL}/peminjaman/${id}`);
  if (!response.ok) {
    throw new Error("Gagal mengambil detail peminjaman.");
  }
  return (await response.json()) as Peminjaman;
}