import { MessageCircle, GraduationCap } from "lucide-react";
import { topikList, faqList } from "@/lib/konsultasi";
import { getAllKonselor } from "@/db/queries";
import { PageHeader } from "../../_components/PageHeader";

export const dynamic = "force-dynamic";

export default async function KonsultasiPage() {
  const konselorList = await getAllKonselor();
  return (
    <main className="relative w-full min-h-screen px-6 md:px-16 pt-36 pb-24">
      <div className="hero-fade-overlay" />

      <div className="max-w-5xl mx-auto flex flex-col gap-14">
        <PageHeader
          title="Konsultasi"
          subtitle="Mau masuk ITB tapi masih bingung? Ngobrol langsung sama Baraya FORMAT — kakak kelas asal Garut yang udah ngalamin sendiri."
          className=""
        />


          <p className="mt-3 text-center text-white/70 text-sm md:text-base max-w-xl mx-auto">
            Mau masuk ITB tapi masih bingung? Ngobrol langsung sama Baraya
            FORMAT — kakak kelas asal Garut yang udah ngalamin sendiri.
          </p>
        </div>

        {/* Topik yang bisa ditanyakan */}
        <div className="kegiatan-glass lg-r-lg px-8 py-10 md:px-14 md:py-12">
          <span className="kabinet-eyebrow">Bisa Tanya Apa Aja</span>
          <h2 className="text-2xl md:text-3xl font-bold text-white mt-2 mb-6">
            Topik Konsultasi
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {topikList.map((topik) => (
              <div key={topik} className="konsultasi-topik-item">
                <GraduationCap size={16} className="shrink-0 text-[#A3C544]" />
                <span>{topik}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Daftar konselor */}
        <div>
          <div className="text-center mb-8">
            <span className="kabinet-eyebrow">Ngobrol Langsung</span>
            <h2 className="text-2xl md:text-3xl font-bold text-white mt-2">
              Pilih Kakak untuk Dihubungi
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {konselorList.map((k) => (
              <div key={k.id} className="konselor-card">
                <div className="ketua-photo-placeholder shrink-0">
                  <GraduationCap size={28} />
                </div>
                <div className="flex-1">
                  <p className="text-white font-semibold">{k.name}</p>
                  <p className="text-white/50 text-sm">
                    {k.prodi} · {k.angkatan}
                  </p>
                </div>
                <a
                  href={`https://wa.me/${k.waNumber}?text=${encodeURIComponent(k.waMessage)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="konselor-wa-btn"
                  aria-label={`Chat WhatsApp ${k.name}`}
                >
                  <MessageCircle size={18} />
                </a>
              </div>
            ))}
          </div>
        </div>

        {/* FAQ */}
        <div className="kegiatan-glass lg-r-lg px-8 py-10 md:px-14 md:py-12">
          <span className="kabinet-eyebrow">Sering Ditanya</span>
          <h2 className="text-2xl md:text-3xl font-bold text-white mt-2 mb-6">
            FAQ
          </h2>
          <div className="flex flex-col gap-5">
            {faqList.map((item) => (
              <div key={item.q}>
                <p className="text-white font-semibold text-sm mb-1.5">
                  {item.q}
                </p>
                <p className="text-white/60 text-sm leading-relaxed">
                  {item.a}
                </p>
              </div>
            ))}
          </div>
        </div>
    </main>
  );
}