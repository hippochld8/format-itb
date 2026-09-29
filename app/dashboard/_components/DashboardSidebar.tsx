"use client";

import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { ArrowLeft, LayoutDashboard, Menu, X } from "lucide-react";
import type { DashboardSection } from "@/lib/permissions";
import SignOutButton from "./SignOutButton";

export interface DashboardNavItem {
  href: string;
  label: string;
  section?: DashboardSection;
}

interface DashboardSidebarProps {
  navItems: DashboardNavItem[];
  userName?: string;
  userImage?: string | null;
  roleLabel: string;
}

export default function DashboardSidebar({
  navItems,
  userName,
  userImage,
  roleLabel,
}: DashboardSidebarProps) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  const userBadge = (
    <>
      {userImage ? (
        <img
          src={userImage}
          alt=""
          className="w-9 h-9 rounded-full object-cover mb-2 ring-1 ring-white/20"
        />
      ) : (
        <span className="relative overflow-hidden isolate lg-btn-primary w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold mb-2">
          {userName?.[0]?.toUpperCase() ?? "U"}
        </span>
      )}
      <p className="text-white text-sm font-semibold truncate">{userName}</p>
      <p className="text-white/50 text-xs mb-3 truncate">{roleLabel}</p>
    </>
  );

  const navLinks = (
    <nav className="flex flex-col gap-1">
      {navItems.map((item) => {
        const active = pathname === item.href;
        return (
          <Link
            key={item.href}
            href={item.href}
            onClick={() => setOpen(false)}
            className={`dash-nav-link inline-flex items-center gap-2 px-3 py-2.5 rounded-xl text-sm font-medium ${
              active ? "dash-nav-link-active" : "text-white/65 hover:text-white"
            }`}
          >
            <LayoutDashboard size={15} className="shrink-0" />
            {item.label}
          </Link>
        );
      })}
    </nav>
  );

  return (
    <>
      {/* Top bar mobile */}
      <header className="dash-bar md:hidden sticky top-0 z-40 mx-3 mt-3 flex items-center justify-between gap-3 px-4 py-3">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm font-semibold text-white/70 hover:text-white transition-colors"
        >
          <ArrowLeft size={16} />
          Kembali ke situs
        </Link>
        <button
          onClick={() => setOpen(true)}
          aria-label="Buka menu dashboard"
          aria-expanded={open}
          className="lg-orb-btn shrink-0 w-9 h-9"
        >
          <Menu size={19} />
        </button>
      </header>

      {/* Sidebar desktop */}
      <aside className="dash-bar hidden md:flex md:w-72 md:max-h-[calc(100vh-2rem)] md:m-4 md:flex-col md:sticky md:top-0 md:self-start md:overflow-hidden">
        <div className="relative z-[2] flex-1 overflow-y-auto px-4 py-5">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm font-semibold text-white/65 hover:text-white transition-colors px-2 mb-6"
          >
            <ArrowLeft size={16} />
            Kembali ke situs
          </Link>
          <div className="flex items-center gap-2.5 mb-7 px-2">
            <span className="relative overflow-hidden isolate lg-btn-primary w-9 h-9 rounded-full flex items-center justify-center text-lg font-bold shrink-0">
              F
            </span>
            <div>
              <p className="text-white font-bold leading-tight">Dashboard</p>
              <p className="text-white/50 text-xs">FORMAT ITB</p>
            </div>
          </div>
          {navLinks}
        </div>
        <div className="relative z-[2] shrink-0 px-5 py-4">
          <div className="footer-divider mb-4" />
          {userBadge}
          <SignOutButton />
        </div>
      </aside>

      {/* Overlay gelap di belakang drawer mobile */}
      <div
        onClick={() => setOpen(false)}
        className={`mobile-overlay md:hidden ${open ? "mobile-overlay-open" : ""}`}
      />

      {/* Drawer mobile / tablet */}
      <aside className={`mobile-sidebar md:hidden ${open ? "mobile-sidebar-open" : ""}`}>
        <div className="relative z-[2] flex items-center justify-between px-6 pt-6">
          <div className="flex items-center gap-2.5">
            <span className="relative overflow-hidden isolate lg-btn-primary w-9 h-9 rounded-full flex items-center justify-center text-lg font-bold">
              F
            </span>
            <div>
              <p className="text-white font-bold leading-tight">Dashboard</p>
              <p className="text-white/50 text-xs">FORMAT ITB</p>
            </div>
          </div>
          <button
            onClick={() => setOpen(false)}
            aria-label="Tutup menu dashboard"
            className="lg-orb-btn w-9 h-9"
          >
            <X size={18} />
          </button>
        </div>

        <div className="relative z-[2] flex-1 overflow-y-auto px-4 mt-6">{navLinks}</div>

        <div className="relative z-[2] px-6 pb-8 pt-4">
          <div className="footer-divider mb-5" />
          {userBadge}
          <SignOutButton />
        </div>
      </aside>
    </>
  );
}
