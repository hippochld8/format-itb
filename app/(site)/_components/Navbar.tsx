"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { Menu, X, ChevronDown, LayoutDashboard, LogOut, LogIn, UserCircle } from "lucide-react";
import { useSession, signOut } from "@/lib/auth-client";
import { isAdminRole, type Role } from "@/lib/permissions";
import { socialLinks } from "./social-links";

const programSubmenu = [
  { label: "Akademik", href: "/program/akademik" },
  { label: "Beasiswa", href: "/program/beasiswa" },
  { label: "Cinta Lokal", href: "/cilok" },
  { label: "Konsultasi", href: "/program/konsultasi" },
];

const menuItems: {
  label: string;
  href?: string;
  submenu?: typeof programSubmenu;
}[] = [
  { label: "Beranda", href: "/" },
  { label: "Kegiatan", href: "/kegiatan" },
  { label: "Galeri", href: "/galeri" },
  { label: "Program", submenu: programSubmenu },
  { label: "Merch", href: "/merch" },
  { label: "Tentang Kami", href: "/tentang-kami" },
];

export default function Navbar() {
  const { data: session, isPending } = useSession();
  const [accountOpen, setAccountOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [programOpen, setProgramOpen] = useState(false);
  const [mobileProgramOpen, setMobileProgramOpen] = useState(false);
  const pathname = usePathname();

  // Navbar "menempel" + berubah warna begitu halaman di-scroll.
  const [scrolled, setScrolled] = useState(false);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    const onScroll = () => {
      if (rafRef.current) return;
      rafRef.current = requestAnimationFrame(() => {
        rafRef.current = null;
        setScrolled(window.scrollY > 24);
      });
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", onScroll);
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      }
    };
  }, []);

  const isProgramActive =
    pathname === "/program" ||
    pathname.startsWith("/program/") ||
    pathname === "/cilok" ||
    pathname.startsWith("/cilok/");

  const isAdmin = isAdminRole((session?.user.role as Role) ?? undefined);

  const accountButton = isPending ? (
    <span className="shrink-0 w-9 h-9 rounded-full bg-white/10 animate-pulse" />
  ) : session ? (
    <div className="relative h-full flex items-center">
      <button
        onClick={() => setAccountOpen((v) => !v)}
        aria-label="Menu akun"
        className="lg-orb-btn shrink-0 w-9 h-9 overflow-hidden"
      >
        <span className="w-full h-full flex items-center justify-center">
          <UserCircle size={22} strokeWidth={1.8} />
        </span>
      </button>

      <div className={`nav-dropdown nav-dropdown-account ${accountOpen ? "nav-dropdown-open" : ""}`}>
        <div className="px-5 py-4 border-b border-white/10">
          <p className="text-white font-semibold text-sm truncate">{session.user.name}</p>
          <p className="text-white/50 text-xs truncate mt-0.5">{session.user.email}</p>
        </div>
        {isAdmin && (
          <Link
            href="/dashboard"
            onClick={() => setAccountOpen(false)}
            className="nav-dropdown-link flex items-center gap-2 text-sm"
          >
            <LayoutDashboard size={15} />
            Dashboard
          </Link>
        )}
        <button
          onClick={() => {
            setAccountOpen(false);
            signOut();
          }}
          className="w-full nav-dropdown-link flex items-center gap-2 text-sm"
        >
          <LogOut size={15} />
          Keluar
        </button>
      </div>
    </div>
  ) : (
    <Link
      href={`/auth/sign-in?redirect=${encodeURIComponent(pathname)}`}
      className="lg-btn lg-btn-primary shrink-0 h-9 px-4 text-sm"
    >
      <LogIn size={15} />
      Masuk
    </Link>
  );

  return (
    <>
      <nav
        className={`lg-nav fixed left-1/2 -translate-x-1/2 z-50 top-[var(--lg-nav-top)] w-[var(--lg-nav-w)] h-[var(--lg-nav-h)] rounded-[var(--lg-nav-radius)] ${
          scrolled ? "lg-nav-stuck" : ""
        }`}
      >
        <div className="relative z-[2] flex h-full items-center justify-between px-6">
          <div className="flex items-center navbar-logo shrink-0">
            <Link href="/">
              <Image src="/logo_navbar.svg" alt="Logo" width={36} height={36} priority />
            </Link>
          </div>

          <ul className="hidden md:flex items-center gap-6 absolute left-1/2 -translate-x-1/2 inset-y-0">
            {menuItems.map((item) => {
              if (item.submenu) {
                return (
                  <li
                    key={item.label}
                    className="relative h-full flex items-center"
                    onMouseEnter={() => setProgramOpen(true)}
                    onMouseLeave={() => setProgramOpen(false)}
                  >
                    <button
                      type="button"
                      onClick={() => setProgramOpen((v) => !v)}
                      aria-expanded={programOpen}
                      aria-haspopup="true"
                      className={`nav-link cursor-pointer items-center gap-1 text-sm font-bold transition-colors ${
                        isProgramActive
                          ? "text-[var(--lg-nav-fg-active)] nav-link-active"
                          : "text-[var(--lg-nav-fg)] hover:text-[var(--lg-nav-fg-hover)]"
                      }`}
                    >
                      {item.label}
                      <ChevronDown
                        size={14}
                        className={`transition-transform duration-200 ${programOpen ? "rotate-180" : ""}`}
                      />
                      <span className="nav-underline" />
                    </button>

                    <div className={`nav-dropdown ${programOpen ? "nav-dropdown-open" : ""}`}>
                      {item.submenu.map((sub) => (
                        <Link
                          key={sub.href}
                          href={sub.href}
                          className={`nav-dropdown-link ${pathname === sub.href ? "nav-dropdown-link-active" : ""}`}
                        >
                          {sub.label}
                        </Link>
                      ))}
                    </div>
                  </li>
                );
              }

              const isActive = item.href === "/" ? pathname === "/" : pathname === item.href;

              return (
                <li key={item.href}>
                  <Link
                    href={item.href!}
                    className={`nav-link text-sm font-bold transition-colors ${
                      isActive
                        ? "text-[var(--lg-nav-fg-active)] nav-link-active"
                        : "text-[var(--lg-nav-fg)] hover:text-[var(--lg-nav-fg-hover)]"
                    }`}
                  >
                    {item.label}
                    <span className="nav-underline" />
                  </Link>
                </li>
              );
            })}
          </ul>

          <div className="flex items-center gap-2">
            {accountButton}

            <button
              onClick={() => setMenuOpen(true)}
              aria-label="Buka menu"
              aria-expanded={menuOpen}
              className="lg-orb-btn md:hidden shrink-0 w-9 h-9"
            >
              <Menu size={18} />
            </button>
          </div>
        </div>
      </nav>

      {/* Overlay gelap di belakang sidebar */}
      <div
        onClick={() => setMenuOpen(false)}
        className={`mobile-overlay md:hidden ${menuOpen ? "mobile-overlay-open" : ""}`}
      />

      {/* Sidebar mobile / tablet */}
      <aside
        className={`mobile-sidebar md:hidden ${menuOpen ? "mobile-sidebar-open" : ""}`}
      >
        <div className="relative z-[2] flex items-center justify-between px-6 pt-6">
          <Link href="/" onClick={() => setMenuOpen(false)}>
            <Image src="/logo_navbar.svg" alt="Logo" width={34} height={34} />
          </Link>
          <button
            onClick={() => setMenuOpen(false)}
            aria-label="Tutup menu"
            className="lg-orb-btn w-9 h-9"
          >
            <X size={18} />
          </button>
        </div>

        <ul className="relative z-[2] flex flex-col gap-1 px-4 mt-8">
          {menuItems.map((item) => {
            if (item.submenu) {
              return (
                <li key={item.label}>
                  <button
                    onClick={() => setMobileProgramOpen(!mobileProgramOpen)}
                    aria-expanded={mobileProgramOpen}
                    className={`w-full flex items-center justify-between py-3 px-3 rounded-xl text-base font-medium transition-colors ${
                      isProgramActive ? "text-[#A3C544]" : "text-white/90 hover:text-white"
                    }`}
                  >
                    {item.label}
                    <ChevronDown
                      size={18}
                      className={`transition-transform duration-200 ${mobileProgramOpen ? "rotate-180" : ""}`}
                    />
                  </button>

                  <div className={`mobile-submenu ${mobileProgramOpen ? "mobile-submenu-open" : ""}`}>
                    {item.submenu.map((sub) => (
                      <Link
                        key={sub.href}
                        href={sub.href}
                        onClick={() => setMenuOpen(false)}
                        className={`block py-2.5 px-3 rounded-lg text-sm transition-colors ${
                          pathname === sub.href ? "text-[#A3C544]" : "text-white/70 hover:text-white"
                        }`}
                      >
                        {sub.label}
                      </Link>
                    ))}
                  </div>
                </li>
              );
            }

            const isActive = item.href === "/" ? pathname === "/" : pathname === item.href;

            return (
              <li key={item.href}>
                <Link
                  href={item.href!}
                  onClick={() => setMenuOpen(false)}
                  className={`mobile-nav-link block py-3 px-3 text-base font-medium transition-colors ${
                    isActive ? "text-[#A3C544]" : "text-white/90 hover:text-white"
                  }`}
                >
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>

        <div className="relative z-[2] mt-auto px-6 pb-8">
          <div className="footer-divider mb-5" />

          {session ? (
            <div className="mb-5">
              {isAdmin && (
                <Link
                  href="/dashboard"
                  onClick={() => setMenuOpen(false)}
                  className="lg-btn lg-btn-primary w-full px-4 py-2.5 mb-2 text-sm"
                >
                  <LayoutDashboard size={16} />
                  Dashboard
                </Link>
              )}
              <button
                onClick={() => signOut()}
                className="lg-btn lg-btn-glass w-full px-4 py-2.5 text-sm"
              >
                <LogOut size={16} />
                Keluar ({session.user.name?.split(" ")[0]})
              </button>
            </div>
          ) : (
            <Link
              href={`/auth/sign-in?redirect=${encodeURIComponent(pathname)}`}
              onClick={() => setMenuOpen(false)}
              className="lg-btn lg-btn-primary w-full px-4 py-2.5 mb-5 text-sm"
            >
              <LogIn size={16} />
              Masuk
            </Link>
          )}

          <div className="flex items-center justify-between gap-3">
            {socialLinks.map(({ label, href, icon: Icon }) => (
              <Link
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="footer-social-btn"
              >
                <Icon size={18} />
              </Link>
            ))}
          </div>
        </div>
      </aside>
    </>
  );
}