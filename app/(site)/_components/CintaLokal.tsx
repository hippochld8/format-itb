"use client";

import { useRef } from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useInView } from "@/lib/hooks/use-in-view";
import type { CintaLokalSummary } from "@/lib/types";

export default function CintaLokal({ articles }: { articles: CintaLokalSummary[] }) {
  const { ref: sectionRef, inView } = useInView();
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    const container = scrollRef.current;
    if (!container) return;
    // geser satu layar penuh (4 card)
    const scrollAmount = container.clientWidth;
    container.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
  };

  return (
    <section className="w-full px-6 md:px-16 py-20">
      <div
        ref={sectionRef}
        className={`mx-auto lg-r-lg px-8 py-12 md:px-14 md:py-16 ${inView ? "cilok-visible" : ""}`}
      >
        <div className="text-center md:text-center mb-10">
          <h2 className="text-2xl md:text-3xl font-bold text-white">
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
            {articles.map((article, i) => (
              <Link
                key={article.slug}
                href={`/cilok/${article.slug}`}
                className={`kegiatan-card cilok-card lg-r-md overflow-hidden group shrink-0 ${inView ? "kegiatan-card-visible" : ""}`}
                style={{ transitionDelay: `${i * 80}ms` }}
              >
                <div className="w-full aspect-square overflow-hidden">
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
          <Link href="/cilok" className="lg-btn lg-btn-primary px-7 py-3.5">
            Lihat Lebih Banyak
          </Link>
        </div>
      </div>
    </section>
  );
}
