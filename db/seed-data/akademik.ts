import type { Course } from "@/lib/types";

export const akademikCourses: Course[] = [
  {
    slug: "matematika",
    name: "Matematika",
    shortName: "MA",
    description: "Kalkulus, aljabar linear, dan materi matematika dasar TPB.",
    chapters: [
      { title: "Bab 1 — Fungsi dan Limit", driveUrl: "#" },
      { title: "Bab 2 — Turunan", driveUrl: "#" },
      { title: "Bab 3 — Integral", driveUrl: "#" },
      { title: "Bab 4 — Aplikasi Turunan dan Integral", driveUrl: "#" },
      { title: "Bab 5 — Barisan dan Deret", driveUrl: "#" },
    ],
  },
  {
    slug: "fisika",
    name: "Fisika",
    shortName: "FI",
    description: "Mekanika, gelombang, dan konsep fisika dasar TPB.",
    chapters: [
      { title: "Bab 1 — Kinematika", driveUrl: "#" },
      { title: "Bab 2 — Dinamika (Hukum Newton)", driveUrl: "#" },
      { title: "Bab 3 — Usaha dan Energi", driveUrl: "#" },
      { title: "Bab 4 — Momentum dan Tumbukan", driveUrl: "#" },
      { title: "Bab 5 — Gelombang dan Bunyi", driveUrl: "#" },
    ],
  },
  {
    slug: "kimia",
    name: "Kimia",
    shortName: "KI",
    description: "Struktur atom, ikatan kimia, dan stoikiometri dasar.",
    chapters: [
      { title: "Bab 1 — Struktur Atom", driveUrl: "#" },
      { title: "Bab 2 — Ikatan Kimia", driveUrl: "#" },
      { title: "Bab 3 — Stoikiometri", driveUrl: "#" },
      { title: "Bab 4 — Termokimia", driveUrl: "#" },
      { title: "Bab 5 — Kesetimbangan Kimia", driveUrl: "#" },
    ],
  },
  {
    slug: "berpikir-komputasional",
    name: "Berpikir Komputasional",
    shortName: "BK",
    description: "Dasar logika pemrograman dan algoritma untuk mahasiswa TPB.",
    chapters: [
      { title: "Bab 1 — Pengantar Algoritma", driveUrl: "#" },
      { title: "Bab 2 — Struktur Kontrol", driveUrl: "#" },
      { title: "Bab 3 — Fungsi dan Rekursi", driveUrl: "#" },
      { title: "Bab 4 — Struktur Data Dasar", driveUrl: "#" },
    ],
  },
  {
    slug: "sustainability",
    name: "Keberlanjutan",
    shortName: "SU",
    description: "Konsep keberlanjutan dan isu lingkungan global-lokal.",
    chapters: [
      { title: "Bab 1 — Konsep Dasar Keberlanjutan", driveUrl: "#" },
      { title: "Bab 2 — Perubahan Iklim", driveUrl: "#" },
      { title: "Bab 3 — SDGs", driveUrl: "#" },
      { title: "Bab 4 — Studi Kasus Lokal", driveUrl: "#" },
    ],
  },
];
