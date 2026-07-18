"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { Search } from "lucide-react";

const menuItems = [
  { label: "Beranda", href: "/" },
  { label: "Kegiatan", href: "/kegiatan" },
  { label: "Galeri", href: "/galeri" },
  { label: "Produk", href: "/produk" },
  { label: "Tentang Kami", href: "/tentang-kami" },
];

export default function Navbar() {
  const [searchOpen, setSearchOpen] = useState(false);
  const pathname = usePathname();

  return (
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
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={`nav-link text-l font-medium transition-colors ${
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

        <button
          onClick={() => setSearchOpen(!searchOpen)}
          aria-label="Search"
          className="shrink-0 w-9 h-9 rounded-full flex items-center justify-center hover:bg-white/10 transition-colors"
        >
          <Search size={18} className="text-white/90" />
        </button>
      </div>
    </nav>
  );
}