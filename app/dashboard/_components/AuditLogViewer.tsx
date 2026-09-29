"use client";

import { getCmsResource } from "@/lib/cms-config";

interface AuditChange {
  label: string;
  old?: string;
  new?: string;
}

export interface AuditRow {
  id: number;
  userName: string;
  action: string;
  resource: string;
  itemId: string;
  detail: { title?: string; changes?: AuditChange[] };
  createdAt: string;
}

const ACTION_META: Record<
  string,
  { label: string; className: string }
> = {
  create: {
    label: "Tambah",
    className: "text-[#A3C544] border-[#A3C544]/40 bg-[#A3C544]/10",
  },
  update: {
    label: "Ubah",
    className: "text-sky-300 border-sky-300/40 bg-sky-300/10",
  },
  delete: {
    label: "Hapus",
    className: "text-red-300 border-red-300/40 bg-red-300/10",
  },
  "role-change": {
    label: "Ganti Role",
    className: "text-amber-300 border-amber-300/40 bg-amber-300/10",
  },
};

function formatTime(iso: string) {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "—";
  return d.toLocaleString("id-ID", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function resourceLabel(resource: string) {
  if (resource === "user") return "Akun User";
  return getCmsResource(resource)?.title ?? resource;
}

export default function AuditLogViewer({ rows }: { rows: AuditRow[] }) {
  return (
    <div className="flex flex-col gap-5">
      <div>
        <h2 className="text-2xl font-bold text-white">Audit Log</h2>
        <p className="text-sm text-white/50 mt-1">
          Catatan setiap perubahan yang dilakukan admin, dari waktu sampai
          detail yang diubah. Hanya terlihat oleh super admin.
        </p>
      </div>

      {rows.length === 0 ? (
        <p className="text-sm text-white/50">
          Belum ada perubahan yang tercatat.
        </p>
      ) : (
        <div className="lg-table-shell">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[820px] text-left">
              <thead>
                <tr>
                  {["Waktu", "Admin", "Aksi", "Modul", "Item", "Perubahan"].map(
                    (h) => (
                      <th
                        key={h}
                        className="px-4 py-3 text-xs font-semibold text-white/50 uppercase tracking-wide"
                      >
                        {h}
                      </th>
                    )
                  )}
                </tr>
              </thead>
              <tbody>
                {rows.map((row) => {
                  const meta = ACTION_META[row.action] ?? {
                    label: row.action,
                    className: "text-white/60 border-white/20 bg-white/5",
                  };
                  const changes = row.detail?.changes ?? [];
                  return (
                    <tr
                      key={row.id}
                      className="align-top"
                    >
                      <td className="px-4 py-3 text-xs text-white/60 whitespace-nowrap">
                        {formatTime(row.createdAt)}
                      </td>
                      <td className="px-4 py-3 text-sm text-white truncate max-w-[160px]">
                        {row.userName || "—"}
                      </td>
                      <td className="px-4 py-3">
                        <span
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold border whitespace-nowrap ${meta.className}`}
                        >
                          {meta.label}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-sm text-white/70 whitespace-nowrap">
                        {resourceLabel(row.resource)}
                      </td>
                      <td className="px-4 py-3 text-sm text-white max-w-[200px] truncate">
                        {row.detail?.title || `#${row.itemId || row.id}`}
                      </td>
                      <td className="px-4 py-3">
                        {changes.length > 0 ? (
                          <div className="flex flex-col gap-1.5 max-w-sm">
                            {changes.slice(0, 6).map((c, i) => (
                              <div key={i} className="text-xs leading-snug">
                                <span className="text-white/80 font-medium">
                                  {c.label}:
                                </span>{" "}
                                {c.new !== undefined && c.old !== undefined ? (
                                  <span className="text-white/50">
                                    <s className="text-white/35">{c.old}</s>{" → "}
                                    <span className="text-[#A3C544]">
                                      {c.new}
                                    </span>
                                  </span>
                                ) : c.new !== undefined ? (
                                  <span className="text-[#A3C544]">{c.new}</span>
                                ) : (
                                  <span className="text-red-300/80">
                                    {c.old}
                                  </span>
                                )}
                              </div>
                            ))}
                            {changes.length > 6 && (
                              <span className="text-xs text-white/30">
                                +{changes.length - 6} lainnya
                              </span>
                            )}
                          </div>
                        ) : (
                          <span className="text-white/30">—</span>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}