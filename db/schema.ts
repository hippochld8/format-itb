import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";

// ===== BETTER AUTH (user, session, account, verification) =====
export const user = sqliteTable("user", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  emailVerified: integer("emailVerified", { mode: "boolean" })
    .notNull()
    .default(false),
  image: text("image"),
  role: text("role", {
    enum: [
      "superadmin",
      "admin-akademik",
      "admin-riset",
      "admin-dokumentasi",
      "admin-beasiswa",
      "admin-merch",
      "user",
    ],
  })
    .notNull()
    .default("user"),
  createdAt: integer("createdAt", { mode: "timestamp" }).notNull(),
  updatedAt: integer("updatedAt", { mode: "timestamp" }).notNull(),
});

export const session = sqliteTable("session", {
  id: text("id").primaryKey(),
  expiresAt: integer("expiresAt", { mode: "timestamp" }).notNull(),
  token: text("token").notNull().unique(),
  createdAt: integer("createdAt", { mode: "timestamp" }).notNull(),
  updatedAt: integer("updatedAt", { mode: "timestamp" }).notNull(),
  ipAddress: text("ipAddress"),
  userAgent: text("userAgent"),
  userId: text("userId")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
});

export const account = sqliteTable("account", {
  id: text("id").primaryKey(),
  accountId: text("accountId").notNull(),
  providerId: text("providerId").notNull(),
  userId: text("userId")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  accessToken: text("accessToken"),
  refreshToken: text("refreshToken"),
  idToken: text("idToken"),
  accessTokenExpiresAt: integer("accessTokenExpiresAt", {
    mode: "timestamp",
  }),
  refreshTokenExpiresAt: integer("refreshTokenExpiresAt", {
    mode: "timestamp",
  }),
  scope: text("scope"),
  password: text("password"),
  createdAt: integer("createdAt", { mode: "timestamp" }).notNull(),
  updatedAt: integer("updatedAt", { mode: "timestamp" }).notNull(),
});

export const verification = sqliteTable("verification", {
  id: text("id").primaryKey(),
  identifier: text("identifier").notNull(),
  value: text("value").notNull(),
  expiresAt: integer("expiresAt", { mode: "timestamp" }).notNull(),
  createdAt: integer("createdAt", { mode: "timestamp" }),
  updatedAt: integer("updatedAt", { mode: "timestamp" }),
});

// ===== Tipe untuk isi artikel Cinta Lokal =====
type ArticleSection =
  | { type: "paragraph"; text: string }
  | { type: "gallery"; images: string[] }
  | { type: "callout"; text: string }
  | { type: "quote"; speaker: string; lines: string[] }
  | { type: "list"; title: string; items: string[] };

// ===== KEGIATAN (sudah ada dari sebelumnya) =====
export const kegiatan = sqliteTable("kegiatan", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  title: text("title").notNull(),
  description: text("description").notNull(),
  image: text("image").notNull(),
  createdAt: integer("created_at", { mode: "timestamp" })
    .notNull()
    .$defaultFn(() => new Date()),
});

// ===== CINTA LOKAL =====
export const cintaLokal = sqliteTable("cinta_lokal", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  slug: text("slug").notNull().unique(),
  title: text("title").notNull(),
  excerpt: text("excerpt").notNull(),
  image: text("image").notNull(),
  tags: text("tags", { mode: "json" }).$type<string[]>().notNull(),
  date: text("date").notNull().default(""),
  sections: text("sections", { mode: "json" })
    .$type<ArticleSection[]>()
    .notNull(),
  createdAt: integer("created_at", { mode: "timestamp" })
    .notNull()
    .$defaultFn(() => new Date()),
});

// ===== BEASISWA =====
export const beasiswa = sqliteTable("beasiswa", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  name: text("name").notNull(),
  provider: text("provider").notNull(),
  description: text("description").notNull(),
  deadline: text("deadline").notNull(),
  status: text("status", { enum: ["buka", "segera-tutup", "tutup"] }).notNull(),
  quota: text("quota"),
  link: text("link").notNull(),
  createdAt: integer("created_at", { mode: "timestamp" })
    .notNull()
    .$defaultFn(() => new Date()),
});

// ===== GALERI: Album + Foto (dua tabel, berelasi) =====
export const galeriAlbum = sqliteTable("galeri_album", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  slug: text("slug").notNull().unique(),
  number: text("number").notNull(),
  title: text("title").notNull(),
  subtitle: text("subtitle").notNull(),
});

export const galeriFoto = sqliteTable("galeri_foto", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  albumId: integer("album_id")
    .notNull()
    .references(() => galeriAlbum.id, { onDelete: "cascade" }),
  url: text("url").notNull(),
});

// ===== AKADEMIK: Matkul + Bab (dua tabel, berelasi) =====
export const akademikMatkul = sqliteTable("akademik_matkul", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  slug: text("slug").notNull().unique(),
  name: text("name").notNull(),
  shortName: text("short_name").notNull(),
  description: text("description").notNull(),
});

export const akademikBab = sqliteTable("akademik_bab", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  matkulId: integer("matkul_id")
    .notNull()
    .references(() => akademikMatkul.id, { onDelete: "cascade" }),
  title: text("title").notNull(),
  driveUrl: text("drive_url").notNull(),
});

// ===== KONSULTASI: Daftar Konselor =====
export const konselor = sqliteTable("konselor", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  name: text("name").notNull(),
  prodi: text("prodi").notNull(),
  angkatan: text("angkatan").notNull(),
  waNumber: text("wa_number").notNull(),
  waMessage: text("wa_message").notNull(),
});

// ===== MERCH: Produk =====
export const merchProduct = sqliteTable("merch_product", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  name: text("name").notNull(),
  price: integer("price").notNull(),
  image: text("image").notNull(),
  description: text("description").notNull(),
  sizes: text("sizes", { mode: "json" }).$type<string[]>(),
  variants: text("variants", { mode: "json" }).$type<string[]>(),
});

// ===== TENTANG KAMI: Anggota Organogram =====
export const orgMember = sqliteTable("org_member", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  // "roleKey" itu identitas tetap tiap posisi di struktur organisasi,
  // misal "pupuhu", "wakil-pupuhu", "warta-motekar-head", dst.
  // Ini TIDAK ditambah/dikurangi admin - cuma nama & fotonya yang diedit.
  roleKey: text("role_key").notNull().unique(),
  roleLabel: text("role_label").notNull(), // contoh: "Pupuhu"
  name: text("name").notNull(),
  photo: text("photo"),
});

// ===== KONTEN UMUM (key-value, buat teks yang cuma 1 blok) =====
// Contoh pemakaian: key="tentang-format", value="teks penjelasan FORMAT..."
// key="kata-pengantar-ketua", value="isi sambutan..."
export const siteContent = sqliteTable("site_content", {
  key: text("key").primaryKey(),
  value: text("value").notNull(),
});

// ===== MERCH: Pesanan dari user =====
export type OrderItem = {
  productId: string;
  name: string;
  price: number;
  size?: string;
  variant?: string;
  qty: number;
};

export const merchOrder = sqliteTable("merch_order", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  userId: text("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  userName: text("user_name").notNull(),
  userEmail: text("user_email").notNull(),
  items: text("items", { mode: "json" }).$type<OrderItem[]>().notNull(),
  subtotal: integer("subtotal").notNull(),
  shippingCost: integer("shipping_cost").notNull().default(0),
  total: integer("total").notNull(),
  deliveryMethod: text("delivery_method", { enum: ["ambil", "kirim"] }).notNull(),
  address: text("address"),
  shippingZone: text("shipping_zone"),
  status: text("status", {
    enum: ["pending", "paid", "processed", "done", "cancelled"],
  })
    .notNull()
    .default("pending"),
  createdAt: integer("created_at", { mode: "timestamp" })
    .notNull()
    .$defaultFn(() => new Date()),
});

// ===== AUDIT LOG (hanya terlihat superadmin) =====
export interface AuditChange {
  label: string;
  old?: string;
  new?: string;
}

export interface AuditLogDetail {
  title: string;
  changes?: AuditChange[];
}

export const auditLog = sqliteTable("audit_log", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  userId: text("user_id").notNull(),
  userName: text("user_name").notNull(),
  action: text("action", {
    enum: ["create", "update", "delete", "role-change"],
  }).notNull(),
  resource: text("resource").notNull(),
  itemId: text("item_id").notNull().default(""),
  detail: text("detail", { mode: "json" })
    .$type<AuditLogDetail>()
    .notNull(),
  createdAt: integer("created_at", { mode: "timestamp" })
    .notNull()
    .$defaultFn(() => new Date()),
});