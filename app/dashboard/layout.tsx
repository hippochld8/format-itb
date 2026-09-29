import { redirect } from "next/navigation";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import {
  canAccessSection,
  isAdminRole,
  normalizeRole,
  ROLE_LABELS,
} from "@/lib/permissions";
import DashboardSidebar, { type DashboardNavItem } from "./_components/DashboardSidebar";

const NAV_ITEMS: DashboardNavItem[] = [
  { href: "/dashboard", label: "Ringkasan" },
  { href: "/dashboard/kegiatan", label: "Kegiatan", section: "kegiatan" },
  { href: "/dashboard/cinta-lokal", label: "Cinta Lokal", section: "cinta-lokal" },
  { href: "/dashboard/galeri", label: "Galeri", section: "galeri" },
  { href: "/dashboard/galeri/foto", label: "Galeri â€” Foto", section: "galeri" },
  { href: "/dashboard/akademik", label: "Akademik", section: "akademik" },
  { href: "/dashboard/akademik/bab", label: "Akademik â€” Bab", section: "akademik" },
  { href: "/dashboard/beasiswa", label: "Beasiswa", section: "beasiswa" },
  { href: "/dashboard/konsultasi", label: "Konsultasi", section: "konsultasi" },
  { href: "/dashboard/merch", label: "Merch", section: "merch" },
  { href: "/dashboard/orders", label: "Pesanan", section: "orders" },
  { href: "/dashboard/tentang-kami", label: "Tentang Kami", section: "tentang-kami" },
  { href: "/dashboard/site-content", label: "Konten Umum", section: "site-content" },
  { href: "/dashboard/users", label: "Kelola User", section: "users" },
  { href: "/dashboard/audit-log", label: "Audit Log", section: "audit" },
];

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  const role = normalizeRole(session?.user.role);

  if (!session || !isAdminRole(role)) {
    redirect("/");
  }

  const visibleNav = NAV_ITEMS.filter(
    (item) => !item.section || canAccessSection(role, item.section)
  );

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      <DashboardSidebar
        navItems={visibleNav}
        userName={session.user.name}
        userImage={session.user.image}
        roleLabel={ROLE_LABELS[role]}
      />
      <div className="flex-1 px-6 md:px-10 py-8 md:py-10">
        <div className="max-w-5xl">{children}</div>
      </div>
    </div>
  );
}