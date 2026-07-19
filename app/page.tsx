import Hero from "./components/Hero";
import Kegiatan from "./components/Kegiatan";
import TentangKabinet from "./components/TentangKabinet";
import CintaLokal from "./components/CintaLokal";

export default function Home() {
  return (
    <>
      <Hero />
      <Kegiatan />
      <TentangKabinet />
      <CintaLokal />
    </>
  );
}