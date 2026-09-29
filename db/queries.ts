import { db } from "./index";
import {
  kegiatan,
  cintaLokal,
  beasiswa,
  konselor,
  merchProduct,
  galeriAlbum,
  galeriFoto,
  akademikMatkul,
  akademikBab,
  merchOrder,
  orgMember,
  siteContent,
} from "./schema";
import { asc, desc, eq } from "drizzle-orm";

export async function getAllKegiatan() {
  return db.select().from(kegiatan).orderBy(desc(kegiatan.createdAt));
}

export async function getAllCintaLokal() {
  return db.select().from(cintaLokal).orderBy(desc(cintaLokal.createdAt));
}

/** Ringkasan tanpa isi artikel (sections), untuk kartu & daftar di situs publik. */
export async function getCintaLokalSummaries() {
  return db
    .select({
      id: cintaLokal.id,
      slug: cintaLokal.slug,
      title: cintaLokal.title,
      excerpt: cintaLokal.excerpt,
      image: cintaLokal.image,
      date: cintaLokal.date,
      tags: cintaLokal.tags,
    })
    .from(cintaLokal)
    .orderBy(desc(cintaLokal.createdAt));
}

export async function getCintaLokalBySlug(slug: string) {
  const rows = await db.select().from(cintaLokal).where(eq(cintaLokal.slug, slug));
  return rows[0] ?? null;
}

export async function getAllBeasiswa() {
  return db.select().from(beasiswa).orderBy(asc(beasiswa.id));
}

export async function getAllKonselor() {
  return db.select().from(konselor).orderBy(asc(konselor.id));
}

export async function getAllMerchProducts() {
  return db.select().from(merchProduct).orderBy(asc(merchProduct.id));
}

export async function getAllGaleriAlbums() {
  const albums = await db.select().from(galeriAlbum).orderBy(asc(galeriAlbum.number));
  const photos = await db.select().from(galeriFoto).orderBy(asc(galeriFoto.id));
  return albums.map((a) => ({
    ...a,
    images: photos.filter((p) => p.albumId === a.id).map((p) => p.url),
  }));
}

export async function getAllAkademikCourses() {
  const matkuls = await db.select().from(akademikMatkul).orderBy(asc(akademikMatkul.id));
  const babs = await db.select().from(akademikBab).orderBy(asc(akademikBab.id));
  return matkuls.map((m) => ({
    ...m,
    chapters: babs.filter((b) => b.matkulId === m.id).map((b) => ({ title: b.title, driveUrl: b.driveUrl })),
  }));
}

export async function getAkademikBySlug(slug: string) {
  const rows = await db.select().from(akademikMatkul).where(eq(akademikMatkul.slug, slug));
  const m = rows[0];
  if (!m) return null;
  const babs = await db
    .select()
    .from(akademikBab)
    .where(eq(akademikBab.matkulId, m.id))
    .orderBy(asc(akademikBab.id));
  return {
    ...m,
    chapters: babs.map((b) => ({ title: b.title, driveUrl: b.driveUrl })),
  };
}

export async function getAllMerchOrders() {
  return db.select().from(merchOrder).orderBy(desc(merchOrder.createdAt));
}

/**
 * Anggota kepengurusan untuk organogram. Susunan/urutan posisi tetap
 * didefinisikan di lib/org-structure.ts; query ini hanya mengambil data
 * (jabatan, nama, foto) yang bisa diedit dari dashboard.
 */
export async function getOrgMembers() {
  return db.select().from(orgMember).orderBy(asc(orgMember.id));
}

/** Teks blok tunggal, dikembalikan sebagai map key -> value. */
export async function getSiteContent(): Promise<Record<string, string>> {
  const rows = await db.select().from(siteContent);
  return Object.fromEntries(rows.map((row) => [row.key, row.value]));
}
