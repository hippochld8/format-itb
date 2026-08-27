"use client";

import { useState } from "react";
import { Plus, Pencil, Trash2, X } from "lucide-react";
import { createItem, updateItem, deleteItem } from "@/app/dashboard/actions";
import { UploadButton } from "@/lib/uploadthing";
import type { CmsResourceConfig, CmsFieldConfig } from "@/lib/cms-config";

interface ResourceManagerProps {
  config: CmsResourceConfig;
  rows: Record<string, unknown>[];
  selectOptions?: Record<string, { value: string; label: string }[]>;
}

type FormValues = Record<string, string>;

export default function ResourceManager({
  config,
  rows,
  selectOptions,
}: ResourceManagerProps) {
  const [modal, setModal] = useState<
    | { mode: "create" }
    | { mode: "edit"; row: Record<string, unknown> }
    | null
  >(null);
  const [form, setForm] = useState<FormValues>({});
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  const openCreate = () => {
    setForm({});
    setError(null);
    setModal({ mode: "create" });
  };

  const openEdit = (row: Record<string, unknown>) => {
    const values: FormValues = {};
    for (const field of config.fields) {
      const v = row[field.key];
      if (v === null || v === undefined) continue;
      if (field.type === "json") {
        values[field.key] = JSON.stringify(v, null, 2);
      } else if (field.type === "list") {
        values[field.key] = Array.isArray(v) ? v.join(", ") : "";
      } else {
        values[field.key] = String(v);
      }
    }
    setForm(values);
    setError(null);
    setModal({ mode: "edit", row });
  };

  const close = () => {
    if (busy) return;
    setModal(null);
    setError(null);
  };

  const idOf = (row: Record<string, unknown>) =>
    (row[config.idField] as string | number) ?? null;

  const submit = async () => {
    if (!modal) return;
    setBusy(true);
    setError(null);
    try {
      if (modal.mode === "create") {
        await createItem(config.resource, form);
      } else {
        await updateItem(config.resource, idOf(modal.row)!, form);
      }
      setModal(null);
      window.location.reload();
    } catch (e) {
      setError(e instanceof Error ? e.message : "Terjadi kesalahan");
    } finally {
      setBusy(false);
    }
  };

  const remove = async (row: Record<string, unknown>) => {
    if (!confirm(`Hapus data ini?`)) return;
    try {
      await deleteItem(config.resource, idOf(row)!);
      window.location.reload();
    } catch (e) {
      alert(e instanceof Error ? e.message : "Gagal menghapus");
    }
  };

  const fieldOptions = (field: CmsFieldConfig) =>
    selectOptions?.[field.key] ?? field.options ?? [];

  const cellText = (field: CmsFieldConfig, row: Record<string, unknown>) => {
    const v = row[field.key];
    if (v === null || v === undefined) return "—";
    if (field.type === "list" || field.type === "json") return JSON.stringify(v);
    if (field.key === "total" && typeof v === "number")
      return "Rp" + v.toLocaleString("id-ID");
    return String(v);
  };

  const displayField = (field: CmsFieldConfig) => {
    if (field.readOnly && modal?.mode === "edit") {
      const v = form[field.key];
      return (
        <div className="text-sm text-white/60 bg-white/5 rounded-xl px-3 py-2.5">
          {v ?? "—"}
        </div>
      );
    }

    switch (field.type) {
      case "textarea":
        return (
          <textarea
            value={form[field.key] ?? ""}
            rows={field.textareaRows ?? 4}
            onChange={(e) => setForm((f) => ({ ...f, [field.key]: e.target.value }))}
            className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2.5 text-sm text-white outline-none focus:border-[#A3C544]"
          />
        );
      case "number":
        return (
          <input
            type="number"
            value={form[field.key] ?? ""}
            onChange={(e) => setForm((f) => ({ ...f, [field.key]: e.target.value }))}
            className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2.5 text-sm text-white outline-none focus:border-[#A3C544]"
          />
        );
      case "select":
        return (
          <select
            value={form[field.key] ?? ""}
            onChange={(e) => setForm((f) => ({ ...f, [field.key]: e.target.value }))}
            className="w-full bg-[#1a2430] border border-white/10 rounded-xl px-3 py-2.5 text-sm text-white outline-none focus:border-[#A3C544]"
          >
            <option value="">Pilih…</option>
            {fieldOptions(field).map((o) => (
              <option key={o.value} value={o.value}>
                {o.label}
              </option>
            ))}
          </select>
        );
      case "image":
        return (
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-3">
              {form[field.key] && (
                <img
                  src={form[field.key]}
                  alt=""
                  className="w-16 h-16 rounded-xl object-cover border border-white/10"
                />
              )}
              <div>
                <UploadButton
                  endpoint="imageUploader"
                  onClientUploadComplete={(res) => {
                    const url = res?.[0]?.url;
                    if (url) setForm((f) => ({ ...f, [field.key]: url }));
                  }}
                  onUploadError={(e) => setError(e.message)}
                  appearance={{
                    button: {
                      background: "rgba(255,255,255,0.08)",
                      color: "#fff",
                      fontSize: "13px",
                      padding: "8px 16px",
                      borderRadius: "9999px",
                    },
                  }}
                />
              </div>
            </div>
            <input
              type="text"
              value={form[field.key] ?? ""}
              onChange={(e) => setForm((f) => ({ ...f, [field.key]: e.target.value }))}
              placeholder="Atau tempel URL gambar"
              className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2.5 text-sm text-white outline-none focus:border-[#A3C544]"
            />
          </div>
        );
      case "list":
        return (
          <>
            <textarea
              value={form[field.key] ?? ""}
              rows={2}
              onChange={(e) => setForm((f) => ({ ...f, [field.key]: e.target.value }))}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2.5 text-sm text-white outline-none focus:border-[#A3C544]"
            />
            <p className="text-xs text-white/40 mt-1">{field.help ?? "Pisahkan dengan koma"}</p>
          </>
        );
      case "json":
        return (
          <>
            <textarea
              value={form[field.key] ?? ""}
              rows={field.textareaRows ?? 10}
              onChange={(e) => setForm((f) => ({ ...f, [field.key]: e.target.value }))}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2.5 text-sm text-white font-mono outline-none focus:border-[#A3C544]"
            />
            <p className="text-xs text-white/40 mt-1">{field.help}</p>
          </>
        );
      default:
        return (
          <input
            type="text"
            value={form[field.key] ?? ""}
            onChange={(e) => setForm((f) => ({ ...f, [field.key]: e.target.value }))}
            placeholder={field.placeholder}
            className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2.5 text-sm text-white outline-none focus:border-[#A3C544]"
          />
        );
    }
  };

  return (
    <div className="flex flex-col gap-5">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-white">{config.title}</h2>
          {config.description && (
            <p className="text-sm text-white/50 mt-1">{config.description}</p>
          )}
        </div>
        {config.allowCreate !== false && (
          <button
            onClick={openCreate}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full font-semibold text-sm text-[#13202C] hover:scale-105 transition-transform"
            style={{ backgroundColor: "#A3C544" }}
          >
            <Plus size={16} />
            Tambah
          </button>
        )}
      </div>

      <div className="rounded-2xl border border-white/10 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-white/10 bg-white/[0.03]">
                {config.listColumns.map((col) => {
                  const field = config.fields.find((f) => f.key === col);
                  return (
                    <th
                      key={col}
                      className="px-4 py-3 text-xs font-semibold text-white/50 uppercase tracking-wide"
                    >
                      {field?.label ?? col}
                    </th>
                  );
                })}
                <th className="px-4 py-3 text-xs font-semibold text-white/50 uppercase tracking-wide text-right">
                  Aksi
                </th>
              </tr>
            </thead>
            <tbody>
              {rows.length === 0 && (
                <tr>
                  <td
                    colSpan={config.listColumns.length + 1}
                    className="px-4 py-10 text-center text-sm text-white/40"
                  >
                    Belum ada data.
                  </td>
                </tr>
              )}
              {rows.map((row, i) => (
                <tr
                  key={String(row[config.idField]) + i}
                  className="border-b border-white/5 hover:bg-white/[0.02] transition-colors"
                >
                  {config.listColumns.map((col) => {
                    const field = config.fields.find((f) => f.key === col);
                    const v = row[col];
                    if (config.imageKey === col && v) {
                      return (
                        <td key={col} className="px-4 py-2.5">
                          <img
                            src={String(v)}
                            alt=""
                            className="w-12 h-12 rounded-lg object-cover border border-white/10"
                          />
                        </td>
                      );
                    }
                    return (
                      <td
                        key={col}
                        className="px-4 py-2.5 text-sm text-white/80 max-w-[280px] truncate"
                        title={typeof v === "string" ? v : undefined}
                      >
                        {field ? cellText(field, row) : String(v ?? "—")}
                      </td>
                    );
                  })}
                  <td className="px-4 py-2.5">
                    <div className="flex items-center justify-end gap-1">
                      {config.allowUpdate !== false && (
                        <button
                          onClick={() => openEdit(row)}
                          aria-label="Edit"
                          className="w-8 h-8 rounded-lg flex items-center justify-center hover:bg-white/10 transition-colors"
                        >
                          <Pencil size={15} className="text-white/70" />
                        </button>
                      )}
                      {config.allowDelete !== false && (
                        <button
                          onClick={() => remove(row)}
                          aria-label="Hapus"
                          className="w-8 h-8 rounded-lg flex items-center justify-center hover:bg-red-500/20 transition-colors"
                        >
                          <Trash2 size={15} className="text-red-400" />
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {modal && (
        <div
          className="fixed inset-0 z-[60] bg-black/70 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={close}
        >
          <div
            className="w-full max-w-lg rounded-3xl border border-white/10 bg-[#0f1821] p-6 max-h-[85vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-bold text-white">
                {modal.mode === "create" ? `Tambah ${config.title}` : `Edit ${config.title}`}
              </h3>
              <button
                onClick={close}
                className="org-modal-close"
                aria-label="Tutup"
              >
                <X size={18} />
              </button>
            </div>

            <div className="flex flex-col gap-4">
              {config.fields.map((field) => (
                <div key={field.key}>
                  <label className="block text-sm font-medium text-white/70 mb-1.5">
                    {field.label}
                    {field.required && <span className="text-[#A3C544]"> *</span>}
                  </label>
                  {displayField(field)}
                </div>
              ))}

              {error && (
                <p className="text-sm text-red-400 bg-red-500/10 border border-red-500/20 rounded-xl px-3 py-2">
                  {error}
                </p>
              )}

              <button
                onClick={submit}
                disabled={busy}
                className="mt-2 w-full inline-flex items-center justify-center px-4 py-3 rounded-full font-semibold text-sm text-[#13202C] hover:scale-[1.02] transition-transform disabled:opacity-60"
                style={{ backgroundColor: "#A3C544" }}
              >
                {busy
                  ? "Menyimpan..."
                  : modal.mode === "create"
                    ? "Simpan"
                    : "Simpan Perubahan"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
