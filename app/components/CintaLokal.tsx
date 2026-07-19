"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cintaLokalList } from "@/lib/cinta-lokal";

export default function CintaLokal() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

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

  const scroll = (direction: "left" | "right") => {
    const container = scrollRef.current;
    if (!container) return;
    const scrollAmount = container.clientWidth; // geser satu layar penuh (4 card)
    container.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
  };

  return (
    <section className="w-full px-6 md:px-16 py-20">
      <div
        ref={sectionRef}
        className={`mx-auto rounded-3xl px-8 py-12 md:px-14 md:py-16 ${visible ? "cilok-visible" : ""}`}
      >
        <div className="text-center md:text-center mb-10">
          <h2 className="text-3xl md:text-5xl font-bold text-white">
            Cinta Lokal
          </h2>
          <p className="mt-3 text-white/70 text-sm md:text-base">
            Riset dan cerita seputar Garut dari FORMAT ITB
          </p>
        </div>

        <div className="relative">
          <button
            onClick={() => scroll("left")}
            aria-label="Geser ke kiri"
            className="cilok-nav-btn cilok-nav-btn-left hidden md:flex"
          >
            <ChevronLeft size={20} />
          </button>

          <div ref={scrollRef} className="cilok-scroll">
            {cintaLokalList.map((article, i) => (
              <Link
                key={article.slug}
                href={`/cilok/${article.slug}`}
                className={`kegiatan-card cilok-card rounded-2xl overflow-hidden group shrink-0 ${visible ? "kegiatan-card-visible" : ""}`}
                style={{ transitionDelay: `${i * 80}ms` }}
              >
                <div className="w-full aspect-square overflow-hidden bg-white/5">
                  <img
                    src={article.image}
                    alt={article.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                </div>
                <div className="p-5">
                  <span className="text-xs text-white/50">{article.date}</span>
                  <h3 className="text-lg font-semibold text-white mt-1 mb-2">
                    {article.title}
                  </h3>
                  <p className="text-sm text-white/70 leading-relaxed line-clamp-3">
                    {article.excerpt}
                  </p>
                  <div className="kegiatan-divider" />
                </div>
              </Link>
            ))}
          </div>

          <button
            onClick={() => scroll("right")}
            aria-label="Geser ke kanan"
            className="cilok-nav-btn cilok-nav-btn-right hidden md:flex"
          >
            <ChevronRight size={20} />
          </button>
        </div>

        <div className="flex justify-center mt-12">
          <Link
            href="/cilok"
            className="px-6 py-3 rounded-full font-medium text-[#13202C] transition-transform hover:scale-105"
            style={{ backgroundColor: "#A3C544" }}
          >
            Lihat Lebih Banyak
          </Link>
        </div>
      </div>
    </section>
  );
}