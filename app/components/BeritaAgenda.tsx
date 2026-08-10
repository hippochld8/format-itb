"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Newspaper, GraduationCap } from "lucide-react";
import { cintaLokalList } from "@/lib/cinta-lokal";
import { beasiswaList } from "@/lib/beasiswa";

interface FeedItem {
  type: "cilok" | "beasiswa";
  title: string;
  subtitle: string;
  href: string;
  date: string;
}

export default function BeritaAgenda() {
  const sectionRef = useRef<HTMLDivElement>(null);
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

  const cilokItems: FeedItem[] = cintaLokalList.slice(0, 3).map((article) => ({
    type: "cilok",
    title: article.title,
    subtitle: article.excerpt,
    href: `/cilok/${article.slug}`,
    date: article.date,
  }));

  const beasiswaItems: FeedItem[] = beasiswaList
    .filter((b) => b.status !== "tutup")
    .slice(0, 3)
    .map((b) => ({
      type: "beasiswa",
      title: b.name,
      subtitle: `${b.provider} · Tenggat ${b.deadline}`,
      href: "/program/beasiswa",
      date: b.deadline,
    }));

  const feed = [...beasiswaItems, ...cilokItems];

  return (
    <section className="w-full px-6 md:px-16 py-20">
      <div
        ref={sectionRef}
        className={`kegiatan-glass max-w mx-auto rounded-3xl px-8 py-12 md:px-14 md:py-16 ${visible ? "cilok-visible" : ""}`}
      >
        <div className="text-center md:text-left mb-10">
          <h2 className="text-3xl md:text-5xl font-bold text-white">
            Kabar Terbaru
          </h2>
          <p className="mt-3 text-white/70 text-sm md:text-base">
            Update Cinta Lokal dan info beasiswa yang masih dibuka
          </p>
        </div>

        <div className="flex flex-col gap-3">
          {feed.length === 0 && (
            <p className="text-white/50 text-sm text-center py-8">
              Belum ada update saat ini.
            </p>
          )}

          {feed.map((item, i) => (
            <Link
              key={`${item.type}-${item.title}`}
              href={item.href}
              className={`berita-item ${visible ? "kegiatan-card-visible" : ""}`}
              style={{ transitionDelay: `${i * 60}ms` }}
            >
              <span className={`berita-icon berita-icon-${item.type}`}>
                {item.type === "cilok" ? (
                  <Newspaper size={16} />
                ) : (
                  <GraduationCap size={16} />
                )}
              </span>
              <div className="flex-1 min-w-0">
                <p className="text-white text-sm font-semibold truncate">
                  {item.title}
                </p>
                <p className="text-white/50 text-xs truncate">{item.subtitle}</p>
              </div>
              <span className="text-white/40 text-xs shrink-0 hidden sm:block">
                {item.date}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}