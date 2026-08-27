import { config } from "dotenv";
config({ path: ".env.local" });

async function main() {
  const { db } = await import("./index");
  const schema = await import("./schema");
  const { beasiswaList } = await import("../lib/beasiswa");
  const { akademikCourses } = await import("../lib/akademik");
  const { konselorList } = await import("../lib/konsultasi");
  const { productList } = await import("../lib/merch");
  const { galeriAlbums } = await import("../lib/galeri");
  const { cintaLokalList } = await import("../lib/cinta-lokal");

  const {
    beasiswa,
    akademikMatkul,
    akademikBab,
    konselor,
    merchProduct,
    galeriAlbum,
    galeriFoto,
    cintaLokal,
  } = schema;

  await db.delete(galeriFoto);
  await db.delete(galeriAlbum);
  await db.delete(akademikBab);
  await db.delete(akademikMatkul);
  await db.delete(konselor);
  await db.delete(merchProduct);
  await db.delete(beasiswa);
  await db.delete(cintaLokal);

  // Beasiswa
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

  // Akademik
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

  // Konselor
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

  // Merch
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

  // Galeri
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

  // Cinta Lokal
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

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
