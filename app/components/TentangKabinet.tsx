"use client";

import { useEffect, useRef, useState } from "react";

const logoPoints = [
  {
    title: "Bentuk & Simetri",
    text: "Lingkaran melambangkan ranah bersama yang menaungi dan menyatukan. Simetrinya yang seimbang mencerminkan kepemimpinan sebagai kebersamaan, bukan satu sosok.",
  },
  {
    title: "Motif Kawung",
    text: "Bentuk berkait terinspirasi batik kawung khas Sunda, disederhanakan jadi bentuk modern dan abstrak agar tetap relevan tanpa kehilangan akar budaya.",
  },
  {
    title: "Warna & Gradasi",
    text: "Warna dan gradasi hijau ke biru melambangkan perjalanan dari akar (kesuburan, semangat tumbuh) menuju cakrawala (ketenangan, wawasan yang meluas).",
  },
];

export default function TentangKabinet() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [hoverSide, setHoverSide] = useState<"left" | "right" | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="w-full px-6 md:px-16 py-20">
      <div
        ref={sectionRef}
        className={`kabinet-glass relative w-full mx-auto rounded-3xl overflow-hidden grid grid-cols-1 md:grid-cols-2 ${visible ? "kabinet-visible" : ""}`}
      >
        {/* Kolom kiri - Nama Kabinet */}
        <div
          className="kabinet-col kabinet-panel"
          onMouseEnter={() => setHoverSide("left")}
          onMouseLeave={() => setHoverSide(null)}
        >
          <span className="kabinet-eyebrow">Nama Kepengurusan</span>
          <h2 className="text-4xl md:text-6xl font-bold text-white mt-2 mb-5">
            Mandala Galuh
          </h2>

          <p className="text-white/70 text-lg md:text-xl leading-relaxed">
            Mandala berarti ranah suci, pusat, wadah yang menaungi dan menyatukan apa yang ada di dalamnya. 
            Galuh
            berarti permata terbaik, sekaligus jejak Kerajaan Galuh di Tatar
            Sunda.
          </p>

          <div className="kabinet-quote">
            "Galuh galeuhna galih" — Galuh adalah inti dari hati.
          </div>

          <p className="text-white/70 text-lg md:text-xl leading-relaxed">
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
          <h2 className="text-4xl md:text-6xl font-bold text-white mt-2 mb-5">
            Logo & Filosofi
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
                <p className="text-white/70 text-lg md:text-xl leading-relaxed mt-1">
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