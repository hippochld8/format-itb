export interface Konselor {
  id: string;
  name: string;
  prodi: string;
  angkatan: string;
  waNumber: string; // format: 628xxxxxxxxxx (tanpa +/spasi)
  waMessage: string;
}

export const konselorList: Konselor[] = [
  {
    id: "1",
    name: "Ganti Nama",
    prodi: "Ganti Prodi",
    angkatan: "2024",
    waNumber: "6281234567890",
    waMessage: "Halo kak, aku mau konsultasi soal masuk ITB",
  },
  {
    id: "2",
    name: "Ganti Nama",
    prodi: "Ganti Prodi",
    angkatan: "2024",
    waNumber: "6281234567891",
    waMessage: "Halo kak, aku mau konsultasi soal masuk ITB",
  },
  {
    id: "3",
    name: "Ganti Nama",
    prodi: "Ganti Prodi",
    angkatan: "2025",
    waNumber: "6281234567892",
    waMessage: "Halo kak, aku mau konsultasi soal masuk ITB",
  },
  {
    id: "4",
    name: "Ganti Nama",
    prodi: "Ganti Prodi",
    angkatan: "2025",
    waNumber: "6281234567893",
    waMessage: "Halo kak, aku mau konsultasi soal masuk ITB",
  },
];

export const topikList = [
  "Jalur masuk ITB (SNBP, SNBT, Mandiri)",
  "Tips & strategi persiapan SNBP/SNBT",
  "Milih program studi yang cocok",
  "Kehidupan kuliah & kos di Bandung",
  "Beasiswa dan biaya kuliah",
  "Organisasi dan kegiatan mahasiswa",
];

export const faqList = [
  {
    q: "Konsultasi ini gratis?",
    a: "Iya, konsultasi dengan Baraya FORMAT sepenuhnya gratis, tanpa syarat apapun.",
  },
  {
    q: "Harus adik-adik Garut aja yang bisa konsultasi?",
    a: "FORMAT ITB fokus membantu adik-adik asal Garut yang berminat kuliah di ITB, tapi kalau kamu dari daerah lain dan penasaran soal ITB, tetap boleh tanya-tanya.",
  },
  {
    q: "Kalau kakak yang dihubungi lagi sibuk gimana?",
    a: "Coba hubungi kakak lain di daftar, atau tunggu beberapa saat — biasanya bakal dibalas begitu senggang.",
  },
];