import Hero from "./_components/Hero";
import Kegiatan from "./_components/Kegiatan";
import TentangKabinet from "./_components/TentangKabinet";
import CintaLokal from "./_components/CintaLokal";
import BeritaAgenda from "./_components/BeritaAgenda";
import JelajahiFormat from "./_components/JelajahiFormat";
import { getAllKegiatan, getCintaLokalSummaries, getAllBeasiswa } from "@/db/queries";

export const dynamic = "force-dynamic";

export default async function Home() {
  const [kegiatanList, articles, beasiswa] = await Promise.all([
    getAllKegiatan(),
    getCintaLokalSummaries(),
    getAllBeasiswa(),
  ]);

  return (
    <>
      <Hero />
      <Kegiatan kegiatanList={kegiatanList.slice(0, 4)} />
      <TentangKabinet />
      <BeritaAgenda articles={articles} beasiswa={beasiswa} />
      <CintaLokal articles={articles} />
      <JelajahiFormat />
    </>
  );
}