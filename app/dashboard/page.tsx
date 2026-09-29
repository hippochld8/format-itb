import Link from "next/link";
import type { AnySQLiteTable, SQLiteColumn } from "drizzle-orm/sqlite-core";
import { db } from "@/db";
import {
  kegiatan,
  beasiswa,
  konselor,
  merchProduct,
  merchOrder,
  user,
  cintaLokal,
  galeriAlbum,
  auditLog,
} from "@/db/schema";
import { requireAdmin } from "@/lib/dashboard-guard";
import { ROLE_LABELS } from "@/lib/permissions";

export const dynamic = "force-dynamic";

const count = async (table: AnySQLiteTable) => {
  const idColumn = (table as unknown as Record<string, SQLiteColumn>).id;
  const rows = await db.select({ id: idColumn }).from(table);
  return rows.length;
};

export default async function DashboardOverviewPage() {
  const { role, session } = await requireAdmin();

  const cards = [
    { label: "Kegiatan", value: await count(kegiatan), href: "/dashboard/kegiatan", show: role === "superadmin" || role === "admin-dokumentasi" },
    { label: "Cinta Lokal", value: await count(cintaLokal), href: "/dashboard/cinta-lokal", show: role === "superadmin" || role === "admin-riset" },
    { label: "Galeri", value: await count(galeriAlbum), href: "/dashboard/galeri", show: role === "superadmin" || role === "admin-dokumentasi" },
    { label: "Beasiswa", value: await count(beasiswa), href: "/dashboard/beasiswa", show: role === "superadmin" || role === "admin-beasiswa" },
    { label: "Konselor", value: await count(konselor), href: "/dashboard/konsultasi", show: role === "superadmin" || role === "admin-akademik" },
    { label: "Produk Merch", value: await count(merchProduct), href: "/dashboard/merch", show: role === "superadmin" || role === "admin-merch" },
    { label: "Pesanan", value: await count(merchOrder), href: "/dashboard/orders", show: role === "superadmin" || role === "admin-merch" },
    { label: "Total User", value: await count(user), href: "/dashboard/users", show: role === "superadmin" },
    { label: "Audit Log", value: await count(auditLog), href: "/dashboard/audit-log", show: role === "superadmin" },
  ].filter((c) => c.show);

  return (
    <div className="flex flex-col gap-6">
      <div>
        <p className="text-sm text-white/50">
          Selamat datang kembali!
        </p>
        <h1 className="text-2xl md:text-3xl font-bold text-white mt-1">
          {session.user.name}
        </h1>
        <span className="inline-block mt-3 px-4 py-1.5 rounded-full text-xs font-semibold text-[#0d1a10] lg-chip lg-chip-active">
          {ROLE_LABELS[role]}
        </span>
      </div>

      <p className="text-white/70 text-sm leading-relaxed">
        Gunakan menu di samping untuk mengelola konten sesuai role kamu.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {cards.map((c) => (
          <Link
            key={c.href}
            href={c.href}
            className="lg-glass-subtle lg-r-md lg-hover p-5"
          >
            <p className="relative z-[2] text-white/55 text-sm">{c.label}</p>
            <p className="relative z-[2] text-3xl font-bold text-white mt-1">{c.value}</p>
            <p className="relative z-[2] text-xs text-[#B8D95F] mt-3">Kelola →</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
