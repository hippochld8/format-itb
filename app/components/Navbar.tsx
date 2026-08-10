"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { Search, Menu, X, ChevronDown } from "lucide-react";

const programSubmenu = [
  { label: "Akademik", href: "/program/akademik" },
  { label: "Beasiswa", href: "/program/beasiswa" },
  { label: "Cinta Lokal", href: "/cilok" },
  { label: "Konsultasi", href: "/program/konsultasi" },
];

const menuItems = [
  { label: "Beranda", href: "/" },
  { label: "Kegiatan", href: "/kegiatan" },
  { label: "Galeri", href: "/galeri" },
  { label: "Program", href: "/program", submenu: programSubmenu },
  { label: "Merch", href: "/merch" },
  { label: "Tentang Kami", href: "/tentang-kami" },
];

function InstagramIcon({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <rect x="2.5" y="2.5" width="19" height="19" rx="5" />
      <circle cx="12" cy="12" r="4.4" />
      <circle cx="17.4" cy="6.6" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

function XIcon({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

function LinkedinIcon({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.02-3.03-1.85-3.03-1.85 0-2.14 1.45-2.14 2.94v5.66H9.36V9h3.41v1.56h.05c.47-.9 1.63-1.85 3.36-1.85 3.6 0 4.27 2.37 4.27 5.45v6.29zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zM7.11 20.45H3.56V9h3.55v11.45z" />
    </svg>
  );
}

const socialLinks = [
  { label: "Instagram", href: "https://instagram.com/format.itb", icon: InstagramIcon },
  { label: "X", href: "https://x.com/format_itb", icon: XIcon },
  { label: "LinkedIn", href: "https://linkedin.com/company/format-itb", icon: LinkedinIcon },
];

export default function Navbar() {
  const [searchOpen, setSearchOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [programOpen, setProgramOpen] = useState(false);
  const [mobileProgramOpen, setMobileProgramOpen] = useState(false);
  const pathname = usePathname();

  const isProgramActive =
    pathname === "/program" ||
    pathname.startsWith("/program/") ||
    pathname === "/cilok" ||
    pathname.startsWith("/cilok/");

  return (
    <>
      <nav className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[92%] h-16 rounded-full navbar-glass">
        <div className="flex h-full items-center justify-between px-6">
          <div className="flex items-center navbar-logo shrink-0">
            <Link href="/">
              <Image src="/logo_navbar.svg" alt="Logo" width={36} height={36} priority />
            </Link>
          </div>

          <ul className="hidden md:flex items-center gap-6 absolute left-1/2 -translate-x-1/2">
            {menuItems.map((item) => {
              const isActive = pathname === item.href;

              if (item.submenu) {
                return (
                  <li
                    key={item.href}
                    className="relative"
                    onMouseEnter={() => setProgramOpen(true)}
                    onMouseLeave={() => setProgramOpen(false)}
                  >
                    <Link
                      href={item.href}
                      className={`nav-link flex items-center gap-1 text-lg font-medium transition-colors ${
                        isProgramActive ? "text-[#A3C544] nav-link-active" : "text-white/90 hover:text-white"
                      }`}
                    >
                      {item.label}
                      <ChevronDown
                        size={14}
                        className={`transition-transform duration-200 ${programOpen ? "rotate-180" : ""}`}
                      />
                      <span className="nav-underline" />
                    </Link>

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

              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={`nav-link text-lg font-medium transition-colors ${
                      isActive ? "text-[#A3C544] nav-link-active" : "text-white/90 hover:text-white"
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
            <button
              onClick={() => setSearchOpen(!searchOpen)}
              aria-label="Search"
              className="shrink-0 w-9 h-9 rounded-full flex items-center justify-center hover:bg-white/10 transition-colors"
            >
              <Search size={18} className="text-white/90" />
            </button>

            <button
              onClick={() => setMenuOpen(true)}
              aria-label="Buka menu"
              aria-expanded={menuOpen}
              className="md:hidden shrink-0 w-9 h-9 rounded-full flex items-center justify-center hover:bg-white/10 transition-colors"
            >
              <Menu size={18} className="text-white/90" />
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
        <div className="flex items-center justify-between px-6 pt-6">
          <Link href="/" onClick={() => setMenuOpen(false)}>
            <Image src="/logo_navbar.svg" alt="Logo" width={34} height={34} />
          </Link>
          <button
            onClick={() => setMenuOpen(false)}
            aria-label="Tutup menu"
            className="w-9 h-9 rounded-full flex items-center justify-center hover:bg-white/10 transition-colors"
          >
            <X size={18} className="text-white/90" />
          </button>
        </div>

        <ul className="flex flex-col gap-1 px-4 mt-8">
          {menuItems.map((item) => {
            const isActive = pathname === item.href;

            if (item.submenu) {
              return (
                <li key={item.href}>
                  <button
                    onClick={() => setMobileProgramOpen(!mobileProgramOpen)}
                    aria-expanded={mobileProgramOpen}
                    className={`w-full flex items-center justify-between py-3 px-3 rounded-xl text-xl font-medium transition-colors ${
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
                        className={`block py-2.5 px-3 rounded-lg text-base transition-colors ${
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

            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={() => setMenuOpen(false)}
                  className={`mobile-nav-link block py-3 px-3 rounded-xl text-xl font-medium transition-colors ${
                    isActive ? "text-[#A3C544]" : "text-white/90 hover:text-white"
                  }`}
                >
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>

        <div className="mt-auto px-6 pb-8">
          <div className="footer-divider mb-5" />
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