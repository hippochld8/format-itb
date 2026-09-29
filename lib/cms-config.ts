import type { DashboardSection } from "@/lib/permissions";

export type CmsFieldType =
  | "text"
  | "textarea"
  | "number"
  | "select"
  | "list"
  | "image"
  | "json";

export interface CmsFieldConfig {
  key: string;
  label: string;
  type: CmsFieldType;
  required?: boolean;
  options?: { value: string; label: string }[];
  valueType?: "string" | "number";
  readOnly?: boolean;
  placeholder?: string;
  textareaRows?: number;
  help?: string;
}

export interface CmsResourceConfig {
  resource: string;
  title: string;
  description?: string;
  section: DashboardSection;
  idField: string;
  fields: CmsFieldConfig[];
  listColumns: string[];
  imageKey?: string;
  allowCreate?: boolean;
  allowUpdate?: boolean;
  allowDelete?: boolean;
  pathToRevalidate: string[];
}

const statusOptions = [
  { value: "buka", label: "Dibuka" },
  { value: "segera-tutup", label: "Segera Tutup" },
  { value: "tutup", label: "Ditutup" },
];

const orderStatusOptions = [
  { value: "pending", label: "Menunggu" },
  { value: "paid", label: "Lunas" },
  { value: "processed", label: "Diproses" },
  { value: "done", label: "Selesai" },
  { value: "cancelled", label: "Dibatalkan" },
];

export const CMS_RESOURCES: CmsResourceConfig[] = [
  {
    resource: "kegiatan",
    title: "Kegiatan",
    description: "Daftar kegiatan yang tampil di beranda dan halaman Kegiatan.",
    section: "kegiatan",
    idField: "id",
    fields: [
      { key: "title", label: "Judul", type: "text", required: true },
      { key: "description", label: "Deskripsi", type: "textarea", required: true, textareaRows: 4 },
      { key: "image", label: "Gambar", type: "image", required: true },
    ],
    listColumns: ["title", "image"],
    imageKey: "image",
    pathToRevalidate: ["/", "/kegiatan"],
  },
  {
    resource: "cinta-lokal",
    title: "Cinta Lokal",
    description: "Artikel Cinta Lokal. Bagian 'sections' diisi JSON artikel.",
    section: "cinta-lokal",
    idField: "id",
    fields: [
      { key: "slug", label: "Slug", type: "text", required: true },
      { key: "title", label: "Judul", type: "text", required: true },
      { key: "excerpt", label: "Ringkasan", type: "textarea", required: true, textareaRows: 3 },
      { key: "image", label: "Gambar sampul", type: "image", required: true },
      { key: "tags", label: "Tag", type: "list", help: "Pisahkan dengan koma" },
      { key: "date", label: "Label tanggal", type: "text", placeholder: "mis. 37 minggu lalu" },
      {
        key: "sections",
        label: "Isi artikel (JSON)",
        type: "json",
        required: true,
        textareaRows: 12,
        help: 'JSON array. Contoh: [{"type":"paragraph","text":"..."}]',
      },
    ],
    listColumns: ["title", "date", "image"],
    imageKey: "image",
    pathToRevalidate: ["/cilok"],
  },
  {
    resource: "galeri",
    title: "Galeri — Album",
    description: "Album foto di halaman Galeri.",
    section: "galeri",
    idField: "id",
    fields: [
      { key: "slug", label: "Slug", type: "text", required: true },
      { key: "number", label: "Nomor", type: "text", required: true },
      { key: "title", label: "Judul", type: "text", required: true },
      { key: "subtitle", label: "Subjudul", type: "text", required: true },
    ],
    listColumns: ["number", "title", "slug"],
    pathToRevalidate: ["/galeri"],
  },
  {
    resource: "galeri-foto",
    title: "Galeri — Foto",
    description: "Foto per album. Album diisi lewat pilihan Album.",
    section: "galeri",
    idField: "id",
    fields: [
      { key: "albumId", label: "Album", type: "select", required: true, valueType: "number" },
      { key: "url", label: "Foto", type: "image", required: true },
    ],
    listColumns: ["albumId", "url"],
    imageKey: "url",
    pathToRevalidate: ["/galeri"],
  },
  {
    resource: "akademik",
    title: "Akademik — Mata Kuliah",
    description: "Daftar mata kuliah di halaman Akademik.",
    section: "akademik",
    idField: "id",
    fields: [
      { key: "slug", label: "Slug", type: "text", required: true },
      { key: "name", label: "Nama", type: "text", required: true },
      { key: "shortName", label: "Singkatan", type: "text", required: true },
      { key: "description", label: "Deskripsi", type: "textarea", required: true, textareaRows: 3 },
    ],
    listColumns: ["shortName", "name", "slug"],
    pathToRevalidate: ["/program/akademik"],
  },
  {
    resource: "akademik-bab",
    title: "Akademik — Bab Materi",
    description: "Bab dan link Google Drive per mata kuliah.",
    section: "akademik",
    idField: "id",
    fields: [
      { key: "matkulId", label: "Mata Kuliah", type: "select", required: true, valueType: "number" },
      { key: "title", label: "Judul Bab", type: "text", required: true },
      { key: "driveUrl", label: "Link Google Drive", type: "text", required: true },
    ],
    listColumns: ["matkulId", "title"],
    pathToRevalidate: ["/program/akademik"],
  },
  {
    resource: "beasiswa",
    title: "Beasiswa",
    description: "Info beasiswa di halaman Beasiswa.",
    section: "beasiswa",
    idField: "id",
    fields: [
      { key: "name", label: "Nama Beasiswa", type: "text", required: true },
      { key: "provider", label: "Penyedia", type: "text", required: true },
      { key: "description", label: "Deskripsi", type: "textarea", required: true, textareaRows: 3 },
      { key: "deadline", label: "Deadline", type: "text", required: true },
      { key: "status", label: "Status", type: "select", required: true, options: statusOptions },
      { key: "quota", label: "Kuota", type: "text" },
      { key: "link", label: "Link Pendaftaran", type: "text", required: true },
    ],
    listColumns: ["name", "provider", "status"],
    pathToRevalidate: ["/program/beasiswa"],
  },
  {
    resource: "konsultasi",
    title: "Konsultasi — Konselor",
    description: "Daftar kakak konselor di halaman Konsultasi.",
    section: "konsultasi",
    idField: "id",
    fields: [
      { key: "name", label: "Nama", type: "text", required: true },
      { key: "prodi", label: "Prodi", type: "text", required: true },
      { key: "angkatan", label: "Angkatan", type: "text", required: true },
      { key: "waNumber", label: "Nomor WhatsApp", type: "text", required: true, placeholder: "628xxxxxxxxxx" },
      { key: "waMessage", label: "Pesan default WhatsApp", type: "textarea", required: true, textareaRows: 3 },
    ],
    listColumns: ["name", "prodi", "angkatan"],
    pathToRevalidate: ["/program/konsultasi"],
  },
  {
    resource: "merch",
    title: "Merch — Produk",
    description: "Produk di halaman Merch.",
    section: "merch",
    idField: "id",
    fields: [
      { key: "name", label: "Nama Produk", type: "text", required: true },
      { key: "price", label: "Harga (Rp)", type: "number", required: true, help: "Boleh diisi 85000 atau 85.000" },
      { key: "image", label: "Gambar", type: "image", required: true },
      { key: "description", label: "Deskripsi", type: "textarea", required: true, textareaRows: 3 },
      { key: "sizes", label: "Ukuran", type: "list", help: "Pisahkan dengan koma (kosongkan jika tidak ada)" },
      { key: "variants", label: "Tipe/Varian", type: "list", help: "Opsional. Contoh: Pose 1, Pose 2, Pose 3 (pisahkan dengan koma)" },
    ],
    listColumns: ["name", "price", "image"],
    imageKey: "image",
    pathToRevalidate: ["/merch"],
  },
  {
    resource: "orders",
    title: "Merch — Pesanan",
    description: "Pesanan dari user. Hanya status yang bisa diubah.",
    section: "orders",
    idField: "id",
    allowCreate: false,
    allowDelete: false,
    fields: [
      { key: "userName", label: "Nama", type: "text", readOnly: true },
      { key: "userEmail", label: "Email", type: "text", readOnly: true },
      { key: "deliveryMethod", label: "Metode", type: "text", readOnly: true },
      { key: "address", label: "Alamat", type: "text", readOnly: true },
      { key: "shippingZone", label: "Zona", type: "text", readOnly: true },
      { key: "total", label: "Total", type: "number", readOnly: true },
      { key: "status", label: "Status", type: "select", required: true, options: orderStatusOptions },
    ],
    listColumns: ["id", "userName", "total", "status"],
    pathToRevalidate: [],
  },
  {
    resource: "tentang-kami",
    title: "Tentang Kami — Pengurus",
    description: "Nama dan foto pengurus. Struktur posisi tidak bisa ditambah/hapus.",
    section: "tentang-kami",
    idField: "roleKey",
    allowCreate: false,
    allowDelete: false,
    fields: [
      { key: "roleLabel", label: "Jabatan", type: "text", required: true },
      { key: "name", label: "Nama", type: "text", required: true },
      { key: "photo", label: "Foto", type: "image" },
    ],
    listColumns: ["roleLabel", "name", "photo"],
    imageKey: "photo",
    pathToRevalidate: ["/tentang-kami"],
  },
  {
    resource: "site-content",
    title: "Konten Umum",
    description: "Teks blok tunggal (key-value) yang dipakai di berbagai halaman.",
    section: "site-content",
    idField: "key",
    fields: [
      { key: "key", label: "Key", type: "text", required: true, help: "Identitas unik, mis. tentang-format" },
      { key: "value", label: "Isi", type: "textarea", required: true, textareaRows: 6 },
    ],
    listColumns: ["key"],
    pathToRevalidate: ["/", "/tentang-kami"],
  },
];

export function getCmsResource(resource: string) {
  return CMS_RESOURCES.find((r) => r.resource === resource) ?? null;
}
