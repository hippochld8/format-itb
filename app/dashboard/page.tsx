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
    { label: "Kegiatan", value: await count(kegiatan), href: "/dashboard/kegiatan", show: role === "superadmin" },
    { label: "Cinta Lokal", value: await count(cintaLokal), href: "/dashboard/cinta-lokal", show: role === "superadmin" },
    { label: "Beasiswa", value: await count(beasiswa), href: "/dashboard/beasiswa", show: role === "superadmin" || role === "admin-beasiswa" },
    { label: "Konselor", value: await count(konselor), href: "/dashboard/konsultasi", show: role === "superadmin" || role === "admin-konsultasi" },
    { label: "Produk Merch", value: await count(merchProduct), href: "/dashboard/merch", show: role === "superadmin" || role === "admin-merch" },
    { label: "Pesanan", value: await count(merchOrder), href: "/dashboard/orders", show: role === "superadmin" || role === "admin-merch" },
    { label: "Total User", value: await count(user), href: "/dashboard/users", show: role === "superadmin" },
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
        <span
          className="inline-block mt-3 px-3 py-1 rounded-full text-xs font-semibold text-[#13202C]"
          style={{ backgroundColor: "#A3C544" }}
        >
          {ROLE_LABELS[role]}
        </span>
      </div>

      <p className="text-white/70 text-sm leading-relaxed">
        Gunakan menu di samping (atau di atas untuk perangkat kecil) untuk
        mengelola konten sesuai role kamu.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {cards.map((c) => (
          <Link
            key={c.href}
            href={c.href}
            className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 hover:border-[#A3C544]/50 hover:bg-white/[0.05] transition-colors"
          >
            <p className="text-white/50 text-sm">{c.label}</p>
            <p className="text-3xl font-bold text-white mt-1">{c.value}</p>
            <p className="text-xs text-[#A3C544] mt-3">Kelola →</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
