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

  const validate = () => {
    for (const field of config.fields) {
      if (!field.required) continue;
      if (field.key === config.idField) continue;
      if (field.readOnly && modal?.mode === "edit") continue;
      const value = form[field.key];
      if (value === undefined || String(value).trim() === "") {
        return `${field.label} wajib diisi`;
      }
    }
    return null;
  };

  // Server Action yang melempar error akan disembunyikan Next.js di production
  // (pesan aslinya diganti "An error occurred in the Server Components render...").
  const readError = (e: unknown) => {
    const message = e instanceof Error ? e.message : String(e ?? "");
    if (/server components render|digest|minimum react/i.test(message)) {
      return "Terjadi kesalahan di server saat menyimpan data. Coba lagi, atau hubungi admin website bila tetap gagal.";
    }
    return message || "Terjadi kesalahan";
  };

  const handleResult = (result: { ok: boolean; error?: string }) => {
    if (result.ok) return true;
    setError(result.error || "Terjadi kesalahan");
    return false;
  };

  const submit = async () => {
    if (!modal) return;
    const invalid = validate();
    if (invalid) {
      setError(invalid);
      return;
    }
    setBusy(true);
    setError(null);
    try {
      const result =
        modal.mode === "create"
          ? await createItem(config.resource, form)
          : await updateItem(config.resource, idOf(modal.row)!, form);
      if (!handleResult(result)) return;
      setModal(null);
      window.location.reload();
    } catch (e) {
      setError(readError(e));
    } finally {
      setBusy(false);
    }
  };

  const remove = async (row: Record<string, unknown>) => {
    if (!confirm(`Hapus data ini?`)) return;
    try {
      const result = await deleteItem(config.resource, idOf(row)!);
      if (!handleResult(result)) return;
      window.location.reload();
    } catch (e) {
      setError(readError(e));
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
        <div className="lg-readonly">{v ?? "—"}</div>
      );
    }

    switch (field.type) {
      case "textarea":
        return (
          <textarea
            value={form[field.key] ?? ""}
            rows={field.textareaRows ?? 4}
            onChange={(e) => setForm((f) => ({ ...f, [field.key]: e.target.value }))}
            className="lg-field px-3 py-2.5"
          />
        );
      case "number": {
        const raw = form[field.key] ?? "";
        const digits = raw.replace(/[^0-9]/g, "");
        return (
          <>
            <input
              type="text"
              inputMode="numeric"
              placeholder={field.placeholder ?? "0"}
              value={raw}
              onChange={(e) =>
                setForm((f) => ({ ...f, [field.key]: e.target.value.replace(/[^0-9]/g, "") }))
              }
              className="lg-field px-3 py-2.5"
            />
            {digits !== "" && (
              <p className="text-xs text-white/40 mt-1">
                {/rp|harga/i.test(field.label) ? "Rp " : ""}
                {Number(digits).toLocaleString("id-ID")}
              </p>
            )}
            {field.help && <p className="text-xs text-white/40 mt-1">{field.help}</p>}
          </>
        );
      }
      case "select":
        return (
          <select
            value={form[field.key] ?? ""}
            onChange={(e) => setForm((f) => ({ ...f, [field.key]: e.target.value }))}
            className="lg-field px-3 py-2.5"
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
                      background: "rgba(255,255,255,0.10)",
                      color: "#fff",
                      fontSize: "13px",
                      padding: "8px 16px",
                      borderRadius: "9999px",
                      boxShadow:
                        "inset 0 1px 0 0 rgba(255,255,255,0.5), inset 0 0 0 1px rgba(255,255,255,0.12)",
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
              className="lg-field px-3 py-2.5"
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
              className="lg-field px-3 py-2.5"
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
              className="lg-field px-3 py-2.5 font-mono"
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
            className="lg-field px-3 py-2.5"
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
            className="lg-btn lg-btn-primary px-4 py-2 text-sm"
          >
            <Plus size={16} />
            Tambah
          </button>
        )}
      </div>

      <div className="lg-table-shell">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr>
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
                            className="w-12 h-12 rounded-xl object-cover"
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
                          className="lg-icon-btn"
                        >
                          <Pencil size={15} className="text-white/70" />
                        </button>
                      )}
                      {config.allowDelete !== false && (
                        <button
                          onClick={() => remove(row)}
                          aria-label="Hapus"
                          className="lg-icon-btn lg-icon-btn-danger"
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
        <div className="lg-scrim" onClick={close}>
          <div
            className="lg-glass lg-r-xl w-full max-w-lg p-6 max-h-[85vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative z-[2] flex flex-col gap-4">
            <div className="flex items-center justify-between mb-2">
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
                <p className="text-sm text-red-200 bg-red-500/15 rounded-xl px-3 py-2 shadow-[inset_0_0_0_1px_rgba(239,68,68,0.4)]">
                  {error}
                </p>
              )}

              <button
                onClick={submit}
                disabled={busy}
                className="lg-btn lg-btn-primary mt-2 w-full px-4 py-3 text-sm disabled:opacity-60 disabled:pointer-events-none"
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
        </div>
      )}
    </div>
  );
}
