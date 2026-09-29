"use client";

import { useState } from "react";
import { useInView } from "@/lib/hooks/use-in-view";

const logoPoints = [
  {
    title: "Bentuk dan Simetri",
    text: "Lingkaran melambangkan ranah bersama yang menaungi dan menyatukan. Simetrinya yang seimbang mencerminkan kepemimpinan sebagai kebersamaan, bukan satu sosok.",
  },
  {
    title: "Motif Kawung",
    text: "Bentuk berkait terinspirasi batik kawung khas Sunda, disederhanakan jadi bentuk modern dan abstrak agar tetap relevan tanpa kehilangan akar budaya.",
  },
  {
    title: "Warna dan Gradasi",
    text: "Warna dan gradasi hijau ke biru melambangkan perjalanan dari akar (kesuburan, semangat tumbuh) menuju cakrawala (ketenangan, wawasan yang meluas).",
  },
];

export default function TentangKabinet() {
  const { ref: sectionRef, inView: visible } = useInView();
  const [hoverSide, setHoverSide] = useState<"left" | "right" | null>(null);

  return (
    <section className="w-full px-6 md:px-16 py-20">
      <div
        ref={sectionRef}
        className={`kabinet-glass relative z-[1] w-full mx-auto lg-r-lg overflow-hidden grid grid-cols-1 md:grid-cols-2 ${visible ? "kabinet-visible" : ""}`}
      >
        {/* Kolom kiri - Nama Kabinet */}
        <div
          className="kabinet-col kabinet-panel"
          onMouseEnter={() => setHoverSide("left")}
          onMouseLeave={() => setHoverSide(null)}
        >
          <span className="kabinet-eyebrow">Nama Kepengurusan</span>
          <h2 className="text-2xl md:text-3xl font-bold text-white mt-2 mb-5">
            Mandala Galuh
          </h2>

          <p className="text-white/70 text-sm md:text-base leading-relaxed">
            Mandala berarti ranah suci, pusat, wadah yang menaungi dan menyatukan apa yang ada di dalamnya. 
            Galuh
            berarti permata terbaik, sekaligus jejak Kerajaan Galuh di Tatar
            Sunda.
          </p>

          <div className="kabinet-quote">
            &quot;Galuh galeuhna galih&quot; — Galuh adalah inti dari hati.
          </div>

          <p className="text-white/70 text-sm md:text-base leading-relaxed">
            Mandala Galuh adalah wadah yang berisi permata dari Garut dan bersinar keluar. 
            Kekeluargaan dan kehangatan antaranggota menjadi
            fondasi sebelum melangkah membangun kontribusi bagi Garut.
          </p>
        </div>

        {/* Divider */}
        <div className={`kabinet-divider ${hoverSide ? `kabinet-divider-${hoverSide}` : ""}`} />

        {/* Kolom kanan - Logo & Filosofi */}
        <div
          className="kabinet-col kabinet-panel"
          onMouseEnter={() => setHoverSide("right")}
          onMouseLeave={() => setHoverSide(null)}
        >
          <span className="kabinet-eyebrow">Identitas Visual</span>
          <h2 className="text-2xl md:text-3xl font-bold text-white mt-2 mb-5">
              Logo dan Filosofi
          </h2>

          <div className="flex justify-center mb-6">
            <img
              src="/mandala_galuh.svg"
              alt="Logo Mandala Galuh FORMAT ITB"
              className="kabinet-logo w-28 h-28 md:w-32 md:h-32"
            />
          </div>

          <div className="flex flex-col gap-4">
            {logoPoints.map((point) => (
              <div key={point.title} className="kabinet-point">
                <span className="kabinet-point-title">{point.title}</span>
                <p className="text-white/70 text-sm md:text-base leading-relaxed mt-1">
                  {point.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}