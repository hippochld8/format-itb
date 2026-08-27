"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { User, X } from "lucide-react";
import { img } from "@/lib/images";

interface OrgPerson {
  role: string;
  name: string;
}

const orgData = {
  pupuhu: { role: "Pupuhu", name: "Ganti Nama" },
  wakilPupuhu: { role: "Wakil Pupuhu", name: "Ganti Nama" },
  kasekjenan: { role: "Kasékjénan", name: "Ganti Nama" },
  kasekjenanSubs: [
    { role: "Girang Serat", name: "Ganti Nama" },
    { role: "Girang Panamba", name: "Ganti Nama" },
  ],
  groups: [
    {
      head: { role: "Warta Motékar", name: "Ganti Nama" },
      members: [
        { role: "Warta Émbaran", name: "Ganti Nama" },
        { role: "Karya Motékar", name: "Ganti Nama" },
      ],
    },
    {
      head: { role: "Mandala Luar", name: "Ganti Nama" },
      members: [
        { role: "Simpay Luar", name: "Ganti Nama" },
        { role: "Patalimarga Alumni", name: "Ganti Nama" },
      ],
    },
    {
      head: { role: "Wengkuan Jero", name: "Ganti Nama" },
      members: [
        { role: "Pangajén", name: "Ganti Nama" },
        { role: "Kakulawargaan", name: "Ganti Nama" },
      ],
    },
    {
      head: { role: "Pamekaran Sumber Daya", name: "Ganti Nama" },
      members: [
        { role: "Pangaping SDM", name: "Ganti Nama" },
        { role: "Panalungtikan", name: "Ganti Nama" },
      ],
    },
    {
      head: { role: "Karaharjaan", name: "Ganti Nama" },
      members: [
        { role: "Akademik", name: "Ganti Nama" },
        { role: "Béasiswa", name: "Ganti Nama" },
      ],
    },
  ],
};

function OrgNode({
  person,
  onClick,
}: {
  person: OrgPerson;
  onClick: () => void;
}) {
  return (
    <button onClick={onClick} className="org-node">
      <span className="org-node-avatar">
        <User size={14} />
      </span>
      <span className="org-node-text">
        <span className="org-node-role">{person.role}</span>
        <span className="org-node-name">{person.name}</span>
      </span>
    </button>
  );
}

export default function TentangKamiPage() {
  const [selected, setSelected] = useState<OrgPerson | null>(null);
  const [logoJump, setLogoJump] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const heroRef = useRef<HTMLElement>(null);

  const handleLogoClick = () => {
    if (logoJump) return;
    setLogoJump(true);
    setTimeout(() => setLogoJump(false), 600);
  };

  const scrollToNext = () => {
    const heroHeight = heroRef.current?.offsetHeight ?? window.innerHeight;
    window.scrollTo({ top: heroHeight, behavior: "smooth" });
  };

  return (
    <main className="relative w-full min-h-screen">
      {/* Hero — Siapa Kami, ala landing page */}
      <section
        id="tentang-kami-hero"
        ref={heroRef}
        className="relative w-full min-h-screen bg-cover bg-center bg-no-repeat overflow-hidden"
        style={{ backgroundImage: `url(${img("hero_tentang_kami.png")})` }}
      >
        <div className="hero-fade-overlay" />

        <Link
          href="/"
          aria-label="Kembali ke Beranda"
          className="absolute top-24 left-6 md:left-16 z-20 inline-flex items-center justify-center w-9 h-9 rounded-full transition-transform hover:scale-105"
          style={{ backgroundColor: "#A3C544" }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#13202C"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M19 12H5" />
            <path d="M12 19l-7-7 7-7" />
          </svg>
        </Link>

        <div className="relative z-10 flex items-center min-h-screen px-6 md:px-16 pt-16">
          <div className="w-full mx-auto rounded-3xl px-8 py-10 md:px-14 md:py-14 flex flex-col md:flex-row items-center justify-between gap-10">
            {/* Teks - kiri */}
            <div className="flex flex-col gap-6 text-center md:text-left max-w-2xl">
              <span
                className={`kabinet-eyebrow hero-fade-in ${
                  "hero-fade-in-active"
                }`}
                style={{ animationDelay: "0ms" }}
              >
                Siapa Kami
              </span>

              <h1
                className={`text-5xl md:text-7xl font-bold text-white hero-fade-in ${
                  "hero-fade-in-active"
                }`}
                style={{ animationDelay: "100ms" }}
              >
                Tentang Kami
              </h1>

              <h2
                className={`text-2xl md:text-3xl font-semibold text-white/90 hero-fade-in ${
                  "hero-fade-in-active"
                }`}
                style={{ animationDelay: "200ms" }}
              >
                Forum Mahasiswa Garut ITB
              </h2>

              <p
                className={`text-white/70 text-sm md:text-base leading-relaxed hero-fade-in ${
                  "hero-fade-in-active"
                }`}
                style={{ animationDelay: "300ms" }}
              >
                FORMAT ITB (Forum Mahasiswa Garut ITB) adalah wadah bagi
                mahasiswa asal Garut yang menempuh pendidikan di Institut
                Teknologi Bandung. Ganti paragraf ini dengan penjelasan
                lengkap tentang sejarah, tujuan, dan peran FORMAT bagi
                anggotanya.
              </p>
            </div>

            {/* Logo interaktif - kanan */}
            <div
                className={`shrink-0 relative hero-fade-in ${
                  "hero-fade-in-active"
                }`}
              style={{ animationDelay: "200ms" }}
            >
              <div
                className="mascot-shadow"
                style={{ transform: `scale(${isHovering ? 1.15 : 1})` }}
              />
              <div className="mascot-float">
                <img
                  src="/logo_navbar.svg"
                  alt="Logo FORMAT ITB"
                  onClick={handleLogoClick}
                  onMouseEnter={() => setIsHovering(true)}
                  onMouseLeave={() => setIsHovering(false)}
                  className={`relative w-40 md:w-64 h-auto cursor-pointer transition-transform ${
                    logoJump ? "mascot-jump" : ""
                  }`}
                  style={{
                    transform: isHovering && !logoJump ? "scale(1.1)" : undefined,
                  }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Scroll cue */}
        <button
          onClick={scrollToNext}
          aria-label="Scroll ke bawah"
          className={`absolute bottom-8 left-1/2 -translate-x-1/2 z-10 text-white/60 hover:text-white/90 transition-colors hero-fade-in ${
            "hero-fade-in-active"
          }`}
          style={{ animationDelay: "450ms" }}
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="scroll-chevron"
          >
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </button>
      </section>

      {/* Konten bawah */}
      <div className="px-6 md:px-16 py-20">
        {/* Kata pengantar ketua */}
        <div className="kegiatan-glass rounded-3xl px-8 py-10 md:px-14 md:py-14 max-w-5xl mx-auto w-full">
          <span className="kabinet-eyebrow">Kata Pengantar</span>
          <h2 className="text-2xl md:text-3xl font-bold text-white mt-2 mb-6">
            Sambutan Pupuhu
          </h2>
          <div className="flex flex-col md:flex-row gap-6 items-start">
            <div className="ketua-photo-placeholder shrink-0">
              <User size={40} />
            </div>
            <div>
              <p className="text-white/70 text-sm md:text-base leading-relaxed italic">
                &ldquo;Ganti dengan kata pengantar dari Pupuhu di sini — sapaan,
                harapan, dan ajakan untuk seluruh anggota FORMAT ITB.&rdquo;
              </p>
              <p className="mt-4 text-white font-semibold">Ganti Nama</p>
              <p className="text-white/50 text-sm">
                Pupuhu FORMAT ITB, Mandala Galuh
              </p>
            </div>
          </div>
        </div>

        {/* Organogram - lebar sendiri, lebih lega dari section lain */}
        <div className="kegiatan-glass rounded-3xl px-4 py-12 md:px-10 md:py-16 max-w-[1400px] mx-auto w-full mt-16">
          <div className="text-center mb-14">
            <span className="kabinet-eyebrow">Struktur Kepengurusan</span>
            <h2 className="text-2xl md:text-3xl font-bold text-white mt-2">
              Organogram Mandala Galuh
            </h2>
          </div>

          <div className="org-tree-scroll">
            <ul className="org-tree">
              <li>
                <OrgNode
                  person={orgData.pupuhu}
                  onClick={() => setSelected(orgData.pupuhu)}
                />
                <ul>
                  <li>
                    <OrgNode
                      person={orgData.kasekjenan}
                      onClick={() => setSelected(orgData.kasekjenan)}
                    />
                    <ul>
                      {orgData.kasekjenanSubs.map((sub) => (
                        <li key={sub.role}>
                          <OrgNode
                            person={sub}
                            onClick={() => setSelected(sub)}
                          />
                        </li>
                      ))}
                    </ul>
                  </li>

                  <li>
                    <OrgNode
                      person={orgData.wakilPupuhu}
                      onClick={() => setSelected(orgData.wakilPupuhu)}
                    />
                  </li>

                  {orgData.groups.map((group) => (
                    <li key={group.head.role}>
                      <OrgNode
                        person={group.head}
                        onClick={() => setSelected(group.head)}
                      />
                      <ul>
                        {group.members.map((member) => (
                          <li key={member.role}>
                            <OrgNode
                              person={member}
                              onClick={() => setSelected(member)}
                            />
                          </li>
                        ))}
                      </ul>
                    </li>
                  ))}
                </ul>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Modal detail jabatan */}
      {selected && (
        <div className="org-modal-overlay" onClick={() => setSelected(null)}>
          <div className="org-modal-card" onClick={(e) => e.stopPropagation()}>
            <button
              aria-label="Tutup"
              className="org-modal-close"
              onClick={() => setSelected(null)}
            >
              <X size={18} />
            </button>
            <div className="ketua-photo-placeholder mx-auto">
              <User size={36} />
            </div>
            <h3 className="text-xl font-bold text-white mt-4 text-center">
              {selected.name}
            </h3>
            <p className="text-center text-[#A3C544] text-sm font-medium mt-1">
              {selected.role}
            </p>
          </div>
        </div>
      )}
    </main>
  );
}
