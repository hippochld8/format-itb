"use client";

import { useRef, useState, type ReactNode } from "react";
import { User, X } from "lucide-react";
import { PageHeader } from "../_components/PageHeader";
import type { OrgBranchWithPerson } from "./page";
import type { OrgPerson } from "@/lib/types";

const KABINET = "Mandala Galuh";

function getInitials(name: string) {
  const parts = name.replace(/[^a-zA-Z0-9\s]/g, "").split(/\s+/).filter(Boolean);
  if (!parts.length) return "";
  const first = parts[0][0] ?? "";
  const last = parts.length > 1 ? parts[parts.length - 1][0] ?? "" : "";
  return (first + last).toUpperCase();
}

function PersonAvatar({ person, size }: { person: OrgPerson; size: "node" | "modal" }) {
  if (person.photo) {
    return (
      <img
        src={person.photo}
        alt={person.name}
        className={size === "node" ? "org-c-avatar org-c-avatar--photo" : "ketua-photo-placeholder"}
      />
    );
  }

  return (
    <span className="org-c-avatar" data-size={size}>
      {size === "node" ? getInitials(person.name) : <User size={36} />}
    </span>
  );
}

function OrgChartNode({
  person,
  onSelect,
  primary = false,
}: {
  person: OrgPerson;
  onSelect: (p: OrgPerson) => void;
  primary?: boolean;
}) {
  return (
    <button
      onClick={() => onSelect(person)}
      className={`org-c-node${primary ? " org-c-node--primary" : ""}`}
      aria-label={`${person.role}: ${person.name}`}
    >
      <PersonAvatar person={person} size="node" />
      <span className="org-c-role">{person.role}</span>
      <span className="org-c-name">{person.name}</span>
    </button>
  );
}

function OrgCol({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div className={`org-col${className ? ` ${className}` : ""}`}>
      <span className="org-drop" aria-hidden="true" />
      {children}
    </div>
  );
}

function OrgLevel({ children, long = false }: { children: ReactNode; long?: boolean }) {
  return (
    <div className="org-level">
      <div className={`org-v${long ? " org-v-long" : " org-v-tall"}`} />
      <div className="org-rail">{children}</div>
    </div>
  );
}

function BranchBlock({
  branch,
  onSelect,
}: {
  branch: OrgBranchWithPerson;
  onSelect: (p: OrgPerson) => void;
}) {
  const hasMembers = branch.members.length > 0;

  return (
    <OrgCol className={hasMembers ? (branch.wide ? "org-dept org-dept--many" : "org-dept") : undefined}>
      <OrgChartNode person={branch.head} onSelect={onSelect} />
      {hasMembers && (
        <OrgLevel>
          {branch.members.map((member) => (
            <OrgCol key={member.roleKey}>
              <OrgChartNode person={member} onSelect={onSelect} />
            </OrgCol>
          ))}
        </OrgLevel>
      )}
    </OrgCol>
  );
}

export default function TentangKamiClient({
  root,
  firstLevel,
  divisi,
  tentangFormat,
  kataPengantarKetua,
}: {
  root: OrgPerson | null;
  firstLevel: OrgBranchWithPerson[];
  divisi: OrgBranchWithPerson[];
  tentangFormat?: string;
  kataPengantarKetua?: string;
}) {
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

  const ketua = root;

  return (
    <main className="relative w-full min-h-screen">
      {/* Hero — Siapa Kami, ala landing page */}
      <section
        ref={heroRef}
        className="relative w-full px-6 md:px-16 pt-36 pb-16"
      >
        <div className="hero-fade-overlay" />

        <div className="max-w-6xl mx-auto w-full">
          <PageHeader
            title="Tentang Kami"
            titleClassName="text-3xl md:text-5xl font-bold text-white hero-fade-in hero-fade-in-active"
          />

          <div className="w-full mx-auto rounded-3xl px-8 py-10 md:px-14 md:py-14 flex flex-col md:flex-row items-center justify-between gap-10">
            {/* Teks - kiri */}
            <div className="flex flex-col gap-6 text-center md:text-left max-w-2xl">
              <h2 className="text-2xl md:text-3xl font-semibold text-white/90 hero-fade-in hero-fade-in-active">
                Forum Mahasiswa Garut ITB
              </h2>

              {tentangFormat && (
                <p className="text-white/70 text-sm md:text-base leading-relaxed hero-fade-in hero-fade-in-active">
                  {tentangFormat}
                </p>
              )}
            </div>

            {/* Logo interaktif - kanan */}
            <div className="shrink-0 relative hero-fade-in hero-fade-in-active">
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
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 text-white/60 hover:text-white/90 transition-colors hero-fade-in hero-fade-in-active"
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
        {kataPengantarKetua && ketua && (
          <div className="kegiatan-glass lg-r-lg px-8 py-10 md:px-14 md:py-14 max-w mx-auto w-full">
            <span className="kabinet-eyebrow">Kata Pengantar</span>
            <h2 className="text-2xl md:text-3xl font-bold text-white mt-2 mb-6">
              Sambutan {ketua.role}
            </h2>
            <div className="flex flex-col md:flex-row gap-6 items-start">
              <div className="shrink-0">
                <PersonAvatar person={ketua} size="modal" />
              </div>
              <div>
                <p className="text-white/70 text-xs md:text-sm leading-relaxed italic">
                  &ldquo;{kataPengantarKetua}&rdquo;
                </p>
                <p className="mt-4 text-white font-semibold">{ketua.name}</p>
                <p className="text-white/50 text-sm">
                  {ketua.role} FORMAT ITB, {KABINET}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Organogram - lebar sendiri, lebih lega dari section lain */}
        {root && (
          <div className="kegiatan-glass lg-r-lg px-4 py-12 md:px-10 md:py-16 max-w-[1400px] mx-auto w-full mt-16">
            <div className="text-center mb-14">
              <span className="kabinet-eyebrow">Struktur Kepengurusan</span>
              <h2 className="text-2xl md:text-3xl font-bold text-white mt-2">
                Organogram {KABINET}
              </h2>
            </div>

            <div
              className="org-chart org-card-w"
              aria-label="Struktur organisasi FORMAT ITB"
            >
              <OrgChartNode person={root} primary onSelect={setSelected} />

              {firstLevel.length > 0 && (
                <OrgLevel long>
                  {firstLevel.map((branch) => (
                    <BranchBlock key={branch.head.roleKey} branch={branch} onSelect={setSelected} />
                  ))}
                </OrgLevel>
              )}

              {divisi.length > 0 && (
                <OrgLevel>
                  {divisi.map((branch) => (
                    <BranchBlock key={branch.head.roleKey} branch={branch} onSelect={setSelected} />
                  ))}
                </OrgLevel>
              )}
            </div>
          </div>
        )}
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
            <div className="mx-auto">
              <PersonAvatar person={selected} size="modal" />
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
