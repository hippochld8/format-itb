"use client";

import { useInView } from "@/lib/hooks/use-in-view";
import Link from "next/link";
import {
  Calendar,
  Image as ImageIcon,
  GraduationCap,
  Wallet,
  Newspaper,
  MessageCircle,
  ShoppingBag,
  Users,
} from "lucide-react";

const destinations = [
  { label: "Kegiatan", desc: "Program dan momen FORMAT", href: "/kegiatan", icon: Calendar },
  { label: "Galeri", desc: "Dokumentasi kegiatan", href: "/galeri", icon: ImageIcon },
  { label: "Akademik", desc: "Materi kuliah dan tutor", href: "/program/akademik", icon: GraduationCap },
  { label: "Beasiswa", desc: "Info beasiswa terbaru", href: "/program/beasiswa", icon: Wallet },
  { label: "Cinta Lokal", desc: "Riset dan cerita Garut", href: "/cilok", icon: Newspaper },
  { label: "Konsultasi", desc: "Ngobrol soal masuk ITB", href: "/program/konsultasi", icon: MessageCircle },
  { label: "Merch", desc: "Merchandise FORMAT ITB", href: "/merch", icon: ShoppingBag },
  { label: "Tentang Kami", desc: "Profil dan struktur FORMAT", href: "/tentang-kami", icon: Users },
];

export default function JelajahiFormat() {
  const { ref: sectionRef, inView: visible } = useInView();

  return (
    <section className="w-full px-6 md:px-16 py-20">
      <div ref={sectionRef} className="max-w mx-auto">
        <div className="text-center mb-10">
          <h2 className="text-2xl md:text-3xl font-bold text-white">
            Jelajahi FORMAT
          </h2>
          <p className="mt-3 text-white/70 text-sm md:text-base">
            Semua yang bisa kamu temukan di sini
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {destinations.map((dest, i) => {
            const Icon = dest.icon;
            return (
              <Link
                key={dest.href}
                href={dest.href}
                className={`jelajahi-card ${visible ? "kegiatan-card-visible" : ""}`}
                style={{ transitionDelay: `${i * 60}ms` }}
              >
                <span className="jelajahi-icon">
                  <Icon size={20} />
                </span>
                <p className="text-white font-semibold text-sm mt-3">
                  {dest.label}
                </p>
                <p className="text-white/50 text-xs mt-1">{dest.desc}</p>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}