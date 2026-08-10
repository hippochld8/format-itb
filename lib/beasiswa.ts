export type BeasiswaStatus = "buka" | "segera-tutup" | "tutup";

export interface Beasiswa {
  id: string;
  name: string;
  provider: string;
  description: string;
  deadline: string;
  status: BeasiswaStatus;
  quota?: string;
  link: string;
}

// Update daftar ini tiap bulan sesuai info beasiswa terbaru
export const beasiswaList: Beasiswa[] = [
  {
    id: "1",
    name: "Beasiswa Garut Cerdas",
    provider: "Pemkab Garut",
    description: "Beasiswa untuk mahasiswa asal Garut berprestasi dengan keterbatasan ekonomi.",
    deadline: "31 Agustus 2026",
    status: "buka",
    quota: "50 penerima",
    link: "#",
  },
  {
    id: "2",
    name: "Beasiswa Unggulan Kemendikbud",
    provider: "Kemendikbudristek",
    description: "Beasiswa nasional untuk mahasiswa berprestasi akademik maupun non-akademik.",
    deadline: "15 September 2026",
    status: "buka",
    quota: "Tidak ditentukan",
    link: "#",
  },
  {
    id: "3",
    name: "Beasiswa Bank Indonesia",
    provider: "Bank Indonesia",
    description: "Beasiswa bagi mahasiswa aktif minimal semester 4 dengan IPK tinggi.",
    deadline: "20 Agustus 2026",
    status: "segera-tutup",
    quota: "20 penerima",
    link: "#",
  },
  {
    id: "4",
    name: "Beasiswa Djarum Plus",
    provider: "Djarum Foundation",
    description: "Beasiswa plus pelatihan soft skill untuk mahasiswa semester 4-6.",
    deadline: "Ditutup Juli 2026",
    status: "tutup",
    link: "#",
  },
];