import Link from "next/link";
import { redirect } from "next/navigation";
import { headers } from "next/headers";
import { LayoutDashboard, ArrowLeft } from "lucide-react";
import { auth } from "@/lib/auth";
import {
  canAccessSection,
  isAdminRole,
  ROLE_LABELS,
  type DashboardSection,
  type Role,
} from "@/lib/permissions";
import SignOutButton from "./components/SignOutButton";

const NAV_ITEMS: { href: string; label: string; section?: DashboardSection }[] = [
  { href: "/dashboard", label: "Ringkasan" },
  { href: "/dashboard/kegiatan", label: "Kegiatan", section: "kegiatan" },
  { href: "/dashboard/cinta-lokal", label: "Cinta Lokal", section: "cinta-lokal" },
  { href: "/dashboard/galeri", label: "Galeri", section: "galeri" },
  { href: "/dashboard/galeri/foto", label: "Galeri — Foto", section: "galeri" },
  { href: "/dashboard/akademik", label: "Akademik", section: "akademik" },
  { href: "/dashboard/akademik/bab", label: "Akademik — Bab", section: "akademik" },
  { href: "/dashboard/beasiswa", label: "Beasiswa", section: "beasiswa" },
  { href: "/dashboard/konsultasi", label: "Konsultasi", section: "konsultasi" },
  { href: "/dashboard/merch", label: "Merch", section: "merch" },
  { href: "/dashboard/orders", label: "Pesanan", section: "orders" },
  { href: "/dashboard/tentang-kami", label: "Tentang Kami", section: "tentang-kami" },
  { href: "/dashboard/site-content", label: "Konten Umum", section: "site-content" },
  { href: "/dashboard/users", label: "Kelola User", section: "users" },
];

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  const role = session?.user.role as Role | undefined;

  if (!session || !isAdminRole(role)) {
    redirect("/");
  }

  const visibleNav = NAV_ITEMS.filter(
    (item) => !item.section || canAccessSection(role, item.section)
  );

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Sidebar */}
      <aside className="md:w-64 md:min-h-screen border-b md:border-b-0 md:border-r border-white/10 bg-[#0c141c] md:sticky md:top-0 md:self-start">
        <div className="flex md:flex-col gap-4 md:gap-0 px-4 py-4 md:px-5 md:py-6">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm font-semibold text-white/70 hover:text-white transition-colors md:mb-6"
          >
            <ArrowLeft size={16} />
            Kembali ke situs
          </Link>

          <div className="hidden md:flex items-center gap-2.5 mb-8">
            <span
              className="w-9 h-9 rounded-full flex items-center justify-center text-lg font-bold text-[#13202C]"
              style={{ backgroundColor: "#A3C544" }}
            >
              F
            </span>
            <div>
              <p className="text-white font-bold leading-tight">Dashboard</p>
              <p className="text-white/50 text-xs">FORMAT ITB</p>
            </div>
          </div>

          <nav className="flex md:flex-col gap-1 overflow-x-auto md:overflow-visible">
            {visibleNav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="shrink-0 inline-flex items-center gap-2 px-3 py-2 rounded-xl text-sm font-medium text-white/70 hover:text-white hover:bg-white/5 transition-colors"
              >
                <LayoutDashboard size={15} className="shrink-0" />
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="md:hidden mt-4">
            <SignOutButton />
          </div>
        </div>

        <div className="hidden md:block mt-auto px-5 py-5 border-t border-white/10">
          {session.user.image ? (
            <img
              src={session.user.image}
              alt=""
              className="w-9 h-9 rounded-full object-cover mb-2"
            />
          ) : (
            <span
              className="w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold text-[#13202C] mb-2"
              style={{ backgroundColor: "#A3C544" }}
            >
              {session.user.name?.[0]?.toUpperCase() ?? "U"}
            </span>
          )}
          <p className="text-white text-sm font-semibold truncate">{session.user.name}</p>
          <p className="text-white/50 text-xs mb-3 truncate">
            {ROLE_LABELS[role]}
          </p>
          <SignOutButton />
        </div>
      </aside>

      {/* Content */}
      <div className="flex-1 px-6 md:px-10 py-8 md:py-10">
        <div className="max-w-5xl">{children}</div>
      </div>
    </div>
  );
}
