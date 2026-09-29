import { config } from "dotenv";
config({ path: ".env.local" });

import { db } from "./index";
import {
  akademikBab,
  akademikMatkul,
  beasiswa,
  cintaLokal,
  galeriAlbum,
  galeriFoto,
  kegiatan,
  konselor,
  merchProduct,
  orgMember,
  siteContent,
} from "./schema";
import { kegiatanList } from "./seed-data/kegiatan";
import { beasiswaList } from "./seed-data/beasiswa";
import { akademikCourses } from "./seed-data/akademik";
import { konselorList } from "./seed-data/konselor";
import { productList } from "./seed-data/merch";
import { galeriAlbums } from "./seed-data/galeri";
import { cintaLokalList } from "./seed-data/cinta-lokal";
import { orgMemberList } from "./seed-data/org-member";
import { siteContentList } from "./seed-data/site-content";
import { ORG_ROLE_KEYS } from "../lib/org-structure";

async function seedKegiatan() {
  await db.delete(kegiatan);
  for (const [i, item] of kegiatanList.entries()) {
    await db.insert(kegiatan).values({
      ...item,
      createdAt: new Date(Date.now() - i * 1000),
    });
  }
  console.log(`Seeded ${kegiatanList.length} kegiatan`);
}

async function seedBeasiswa() {
  await db.delete(beasiswa);
  for (const b of beasiswaList) {
    await db.insert(beasiswa).values({
      name: b.name,
      provider: b.provider,
      description: b.description,
      deadline: b.deadline,
      status: b.status,
      quota: b.quota ?? null,
      link: b.link,
    });
  }
  console.log(`Seeded ${beasiswaList.length} beasiswa`);
}

async function seedAkademik() {
  await db.delete(akademikBab);
  await db.delete(akademikMatkul);
  for (const c of akademikCourses) {
    const inserted = await db
      .insert(akademikMatkul)
      .values({
        slug: c.slug,
        name: c.name,
        shortName: c.shortName,
        description: c.description,
      })
      .returning({ id: akademikMatkul.id });

    const matkulId = inserted[0].id;
    for (const ch of c.chapters) {
      await db.insert(akademikBab).values({
        matkulId,
        title: ch.title,
        driveUrl: ch.driveUrl,
      });
    }
  }
  console.log(`Seeded ${akademikCourses.length} matkul + bab`);
}

async function seedKonselor() {
  await db.delete(konselor);
  for (const k of konselorList) {
    await db.insert(konselor).values({
      name: k.name,
      prodi: k.prodi,
      angkatan: k.angkatan,
      waNumber: k.waNumber,
      waMessage: k.waMessage,
    });
  }
  console.log(`Seeded ${konselorList.length} konselor`);
}

async function seedMerch() {
  await db.delete(merchProduct);
  for (const p of productList) {
    await db.insert(merchProduct).values({
      name: p.name,
      price: p.price,
      image: p.image,
      description: p.description,
      sizes: p.sizes ?? null,
    });
  }
  console.log(`Seeded ${productList.length} merch product`);
}

async function seedGaleri() {
  await db.delete(galeriFoto);
  await db.delete(galeriAlbum);
  for (const album of galeriAlbums) {
    const inserted = await db
      .insert(galeriAlbum)
      .values({
        slug: album.slug,
        number: album.number,
        title: album.title,
        subtitle: album.subtitle,
      })
      .returning({ id: galeriAlbum.id });

    const albumId = inserted[0].id;
    for (const url of album.images) {
      await db.insert(galeriFoto).values({ albumId, url });
    }
  }
  console.log(`Seeded ${galeriAlbums.length} album galeri + foto`);
}

async function seedCintaLokal() {
  await db.delete(cintaLokal);
  for (const a of cintaLokalList) {
    await db.insert(cintaLokal).values({
      slug: a.slug,
      title: a.title,
      excerpt: a.excerpt,
      image: a.image,
      tags: a.tags,
      date: a.date,
      sections: a.sections,
    });
  }
  console.log(`Seeded ${cintaLokalList.length} artikel cinta lokal`);
}

async function seedOrgMember() {
  // Organogram halaman publik hanya menampilkan anggota yang roleKey-nya cocok
  // dengan lib/org-structure.ts, jadi fixture harus menutupi semua posisi.
  const seeded = new Set(orgMemberList.map((m) => m.roleKey));
  const missing = ORG_ROLE_KEYS.filter((key) => !seeded.has(key));
  const orphan = orgMemberList
    .map((m) => m.roleKey)
    .filter((key) => !ORG_ROLE_KEYS.includes(key));

  if (missing.length > 0 || orphan.length > 0) {
    throw new Error(
      [
        "orgMemberList tidak sinkron dengan ORG_ROLE_KEYS.",
        missing.length > 0 ? `  posisi tanpa anggota: ${missing.join(", ")}` : "",
        orphan.length > 0 ? `  anggota dengan roleKey asing: ${orphan.join(", ")}` : "",
      ]
        .filter(Boolean)
        .join("\n")
    );
  }

  await db.delete(orgMember);
  for (const m of orgMemberList) {
    await db.insert(orgMember).values({
      roleKey: m.roleKey,
      roleLabel: m.role,
      name: m.name,
      photo: null,
    });
  }
  console.log(`Seeded ${orgMemberList.length} anggota kepengurusan`);
}

async function seedSiteContent() {
  await db.delete(siteContent);
  for (const c of siteContentList) {
    await db.insert(siteContent).values(c);
  }
  console.log(`Seeded ${siteContentList.length} blok konten`);
}

/**
 * Setiap entri menghapus lalu mengisi ulang satu tabel, jadi ini destruktif.
 * Pakang `--only` untuk membatasi ke tabel yang benar-benar mau di-reset:
 *   npm run db:seed -- --only=org,site-content
 */
const SEEDS: Record<string, () => Promise<void>> = {
  kegiatan: seedKegiatan,
  beasiswa: seedBeasiswa,
  akademik: seedAkademik,
  konselor: seedKonselor,
  merch: seedMerch,
  galeri: seedGaleri,
  "cinta-lokal": seedCintaLokal,
  org: seedOrgMember,
  "site-content": seedSiteContent,
};

function resolveTargets(): [string, () => Promise<void>][] {
  const onlyArg = process.argv.find((a) => a.startsWith("--only="));
  if (!onlyArg) return Object.entries(SEEDS);

  const keys = onlyArg
    .slice("--only=".length)
    .split(",")
    .map((k) => k.trim())
    .filter(Boolean);

  const unknown = keys.filter((k) => !(k in SEEDS));
  if (unknown.length > 0) {
    throw new Error(
      `Target seed tidak dikenal: ${unknown.join(", ")}. Pilihan: ${Object.keys(SEEDS).join(", ")}`
    );
  }
  return keys.map((k) => [k, SEEDS[k]]);
}

async function main() {
  const targets = resolveTargets();

  console.warn(
    `MENGHAPUS lalu mengisi ulang ${targets.length} tabel: ${targets.map(([k]) => k).join(", ")}`
  );

  for (const [key, run] of targets) {
    try {
      await run();
    } catch (err) {
      console.error(`\nSeed "${key}" gagal:`);
      throw err;
    }
  }

  console.log("\nSelesai.");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
