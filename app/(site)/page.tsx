import Hero from "@/app/components/Hero";
import Kegiatan from "@/app/components/Kegiatan";
import TentangKabinet from "@/app/components/TentangKabinet";
import CintaLokal from "@/app/components/CintaLokal";
import BeritaAgenda from "@/app/components/BeritaAgenda";
import JelajahiFormat from "@/app/components/JelajahiFormat";
import { getAllKegiatan } from "@/db/queries";

export default async function Home() {
  const kegiatanList = await getAllKegiatan();

  return (
    <>
      <Hero />
      <Kegiatan kegiatanList={kegiatanList.slice(0, 4)} />
      <TentangKabinet />
      <BeritaAgenda />
      <CintaLokal />
      <JelajahiFormat />
    </>
  );
}