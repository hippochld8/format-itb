import { config } from "dotenv";
config({ path: ".env.local" });

import { db } from "./index";
import { kegiatan } from "./schema";
import { img } from "../lib/images";

const items = [
  {
    title: "Malam Keakraban 2026",
    description:
      "Ruang untuk mempererat kekeluargaan antar anggota FORMAT lintas angkatan. Biasanya diadakan setelah Gantar.",
    image: img("makrab.jpg"),
  },
  {
    title: "Ganesha Untuk Garut 2026",
    description:
      "Roadshow pengenalan ITB ke sekolah-sekolah di Garut, jembatan mimpi adik-adik menuju kampus.",
    image: img("gantar.jpg"),
  },
  {
    title: "Welcoming Party! 2025",
    description:
      "Penyambutan mahasiswa Garut di ITB yang baru setiap tahun ajaran baru. Berisi pengenalan mengenai FORMAT ITB.",
    image: img("welpar.jpg"),
  },
  {
    title: "Buka Bersama 2025",
    description:
      "Buka bersama yang dilakukan setiap bulan Ramadhan. Tujuan dari acara ini adalah untuk mempererat hubungan dan merayakan bulan suci Ramadhan.",
    image: img("bukber.jpg"),
  },
  {
    title: "Malam Keakraban 2025",
    description:
      "Ruang untuk mempererat kekeluargaan antar anggota FORMAT lintas angkatan. Biasanya diadakan setelah Gantar.",
    image: img("makrab_25.jpg"),
  },
  {
    title: "Ganesha untuk Garut 2025",
    description:
      "Roadshow pengenalan ITB ke sekolah-sekolah di Garut, jembatan mimpi adik-adik menuju kampus.",
    image: img("gantar_25.jpg"),
  },
  {
    title: "Syukwis Oktober 2024",
    description:
      "Acara syukuran setelah ada mahasiswa Garut di ITB wisuda. Syukuran ini diadakan pada bulan November 2024 sebagai bentuk apresias wisudawan yang wisuda bulan Oktober.",
    image: img("syukwis.jpg"),
  },
];

async function main() {
  await db.delete(kegiatan);

  for (const [i, item] of items.entries()) {
    await db.insert(kegiatan).values({
      ...item,
      createdAt: new Date(Date.now() - i * 1000),
    });
  }

  console.log(`Seeded ${items.length} kegiatan`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
