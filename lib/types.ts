// Tipe domain yang dipakai bersama oleh komponen server, komponen client,
// dan seed script. Sumber data runtime-nya adalah database (lihat db/queries.ts),
// file ini hanya mendeskripsikan bentuk datanya.

// ===== CINTA LOKAL =====
export type ArticleSection =
  | { type: "paragraph"; text: string }
  | { type: "gallery"; images: string[] }
  | { type: "callout"; text: string }
  | { type: "quote"; speaker: string; lines: string[] }
  | { type: "list"; title: string; items: string[] };

export interface CintaLokalArticle {
  slug: string;
  title: string;
  excerpt: string;
  image: string;
  date: string;
  tags: string[];
  sections: ArticleSection[];
}

/** Ringkasan artikel tanpa isi (sections); cukup untuk kartu & daftar. */
export type CintaLokalSummary = Omit<CintaLokalArticle, "sections">;

// ===== BEASISWA =====
export type BeasiswaStatus = "buka" | "segera-tutup" | "tutup";

export interface Beasiswa {
  id: string | number;
  name: string;
  provider: string;
  description: string;
  deadline: string;
  status: BeasiswaStatus;
  quota?: string | null;
  link: string;
}

// ===== MERCH =====
export interface Product {
  id: string | number;
  name: string;
  price: number;
  image: string;
  description: string;
  sizes?: string[] | null;
  variants?: string[] | null;
}

export interface ShippingZone {
  id: string;
  label: string;
  price: number;
}

// ===== KONSULTASI =====
export interface Konselor {
  id: string | number;
  name: string;
  prodi: string;
  angkatan: string;
  waNumber: string; // format: 628xxxxxxxxxx (tanpa +/spasi)
  waMessage: string;
}

// ===== GALERI =====
export interface GaleriAlbum {
  id?: string | number;
  slug: string;
  number: string;
  title: string;
  subtitle: string;
  images: string[];
}

// ===== AKADEMIK =====
export interface Chapter {
  title: string;
  driveUrl: string;
}

export interface Course {
  id?: string | number;
  slug: string;
  name: string;
  shortName: string;
  description: string;
  chapters: Chapter[];
}

// ===== TENTANG KAMI =====
export interface OrgPerson {
  roleKey: string;
  role: string;
  name: string;
  photo?: string | null;
}
