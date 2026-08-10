import Hero from "./components/Hero";
import Kegiatan from "./components/Kegiatan";
import TentangKabinet from "./components/TentangKabinet";
import CintaLokal from "./components/CintaLokal";
import BeritaAgenda from "./components/BeritaAgenda";
import JelajahiFormat from "./components/JelajahiFormat";

export default function Home() {
  return (
    <>
      <Hero />
      <Kegiatan />
      <TentangKabinet />
      <BeritaAgenda />
      <CintaLokal />
      <JelajahiFormat />
    </>
  );
}