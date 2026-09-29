"use server";

import { revalidatePath } from "next/cache";
import { headers } from "next/headers";
import { eq } from "drizzle-orm";
import type { AnySQLiteTable, SQLiteColumn } from "drizzle-orm/sqlite-core";
import { db } from "@/db";
import * as schema from "@/db/schema";
import { auth } from "@/lib/auth";
import {
  canAccessSection,
  ROLES,
  type Role,
} from "@/lib/permissions";
import { getCmsResource, type CmsFieldConfig, type CmsResourceConfig } from "@/lib/cms-config";
import type { AuditChange, AuditLogDetail } from "@/db/schema";

function getFieldKey(config: CmsResourceConfig) {
  return config.fields.find((f) => ["title", "name"].includes(f.key))?.key;
}

// Next.js menghapus pesan error dari Server Action pada production build
// (menggantinya dengan "An error occurred in the Server Components render...").
// Karena itu error yang memang diharapkan (validasi, hak akses) tidak dilempar,
// tapi dikembalikan sebagai { ok: false, error } supaya pesannya tetap terbaca.
class ValidationError extends Error {}

export type ActionResult = { ok: true } | { ok: false; error: string };

async function runAction(fn: () => Promise<void>): Promise<ActionResult> {
  try {
    await fn();
    return { ok: true };
  } catch (e) {
    if (e instanceof ValidationError) {
      return { ok: false, error: e.message };
    }
    console.error("[dashboard-action]", e);
    throw e;
  }
}

function auditTitle(
  config: CmsResourceConfig,
  row: Record<string, unknown>
): string {
  const nameKey = getFieldKey(config);
  if (nameKey && row[nameKey] !== undefined && row[nameKey] !== null && row[nameKey] !== "") {
    return String(row[nameKey]);
  }
  const parts = config.listColumns
    .map((c) => row[c])
    .filter((v) => v !== undefined && v !== null && v !== "")
    .map((v) => String(v));
  return parts.length > 0 ? parts.join(" — ") : "";
}

function auditChanges(
  config: CmsResourceConfig,
  oldRow: Record<string, unknown> | null,
  newValues: Record<string, unknown> | null
): AuditChange[] {
  const changes: AuditChange[] = [];
  for (const field of config.fields) {
    if (field.key === config.idField || field.readOnly) continue;
    const key = field.key;
    const oldVal = oldRow?.[key];
    const newVal = newValues?.[key];
    const oldStr = oldVal === undefined ? undefined : JSON.stringify(oldVal);
    const newStr = newVal === undefined ? undefined : JSON.stringify(newVal);
    if (oldStr === newStr) continue;
    changes.push({ label: field.label, old: oldStr, new: newStr });
  }
  return changes;
}

async function logAudit(
  action: "create" | "update" | "delete" | "role-change",
  resource: string,
  itemId: string | number,
  detail: AuditLogDetail
) {
  try {
    const session = await auth.api.getSession({ headers: await headers() });
    if (!session) return;
    await db.insert(schema.auditLog).values({
      userId: session.user.id,
      userName: session.user.name ?? "",
      action,
      resource,
      itemId: String(itemId),
      detail,
    });
  } catch {
    // Audit log tidak boleh menggagalkan operasi utama
  }
}

function getTable(resource: string): AnySQLiteTable | null {
  switch (resource) {
    case "kegiatan":
      return schema.kegiatan;
    case "cinta-lokal":
      return schema.cintaLokal;
    case "galeri":
      return schema.galeriAlbum;
    case "galeri-foto":
      return schema.galeriFoto;
    case "akademik":
      return schema.akademikMatkul;
    case "akademik-bab":
      return schema.akademikBab;
    case "beasiswa":
      return schema.beasiswa;
    case "konsultasi":
      return schema.konselor;
    case "merch":
      return schema.merchProduct;
    case "orders":
      return schema.merchOrder;
    case "tentang-kami":
      return schema.orgMember;
    case "site-content":
      return schema.siteContent;
    default:
      return null;
  }
}

async function getConfig(resource: string) {
  const config = getCmsResource(resource);
  if (!config) throw new ValidationError("Resource tidak dikenal");

  const session = await auth.api.getSession({ headers: await headers() });
  const role = session?.user.role as Role | undefined;
  if (!canAccessSection(role, config.section)) {
    throw new ValidationError("Anda tidak punya akses");
  }
  return config;
}

// Admin sering mengetik "85.000" / "85,000" / "Rp 85.000". Ambil digitnya saja
// supaya tidak jadi NaN atau terpotong diam-diam jadi 85.
function toNumber(raw: unknown) {
  const digits = String(raw).replace(/[^0-9]/g, "");
  if (digits === "") return Number.NaN;
  return Number(digits);
}

function parseValue(field: CmsFieldConfig, raw: unknown) {
  if (raw === null || raw === undefined || raw === "") {
    if (field.required) throw new ValidationError(`${field.label} wajib diisi`);
    return null;
  }
  switch (field.type) {
    case "number": {
      const n = toNumber(raw);
      if (Number.isNaN(n)) throw new ValidationError(`${field.label} harus berupa angka`);
      return n;
    }
    case "list": {
      return String(raw)
        .split(/[\n,]/)
        .map((s) => s.trim())
        .filter(Boolean);
    }
    case "json": {
      try {
        return JSON.parse(String(raw));
      } catch {
        throw new ValidationError(`${field.label} bukan JSON yang valid`);
      }
    }
    case "select": {
      if (field.valueType === "number") {
        const n = toNumber(raw);
        if (Number.isNaN(n)) throw new ValidationError(`${field.label} tidak valid`);
        return n;
      }
      return String(raw);
    }
    default:
      return String(raw);
  }
}

function revalidateFor(config: Awaited<ReturnType<typeof getConfig>>) {
  for (const p of config.pathToRevalidate) {
    revalidatePath(p);
  }
  revalidatePath(`/dashboard/${config.resource}`);
}

export async function createItem(
  resource: string,
  values: Record<string, unknown>
): Promise<ActionResult> {
  return runAction(async () => {
    const config = await getConfig(resource);
    if (config.allowCreate === false) throw new ValidationError("Tidak bisa menambah data ini");

    const table = getTable(resource);
    if (!table) throw new ValidationError("Resource tidak dikenal");

    const data: Record<string, unknown> = {};
    for (const field of config.fields) {
      if (field.key === config.idField) continue;
      data[field.key] = parseValue(field, values[field.key]);
    }

    const idColumn = (table as unknown as Record<string, SQLiteColumn>).id;
    const inserted = await db
      .insert(table)
      .values(data as never)
      .returning({ id: idColumn });
    const newId = inserted[0]?.id as string | number | undefined;

    const changes = auditChanges(config, null, data);
    await logAudit("create", resource, newId ?? "", {
      title: auditTitle(config, data),
      changes,
    });
    revalidateFor(config);
  });
}

export async function updateItem(
  resource: string,
  id: string | number,
  values: Record<string, unknown>
): Promise<ActionResult> {
  return runAction(async () => {
    const config = await getConfig(resource);
    if (config.allowUpdate === false) throw new ValidationError("Tidak bisa mengubah data ini");

    const table = getTable(resource);
    if (!table) throw new ValidationError("Resource tidak dikenal");

    const data: Record<string, unknown> = {};
    for (const field of config.fields) {
      if (field.key === config.idField || field.readOnly) continue;
      if (!(field.key in values)) continue;
      data[field.key] = parseValue(field, values[field.key]);
    }

    if (Object.keys(data).length === 0) {
      throw new ValidationError("Tidak ada data yang diubah");
    }

    const idColumn = (table as unknown as Record<string, SQLiteColumn>)[config.idField];
    const oldRows = await db
      .select()
      .from(table)
      .where(eq(idColumn, id as never))
      .limit(1);
    const oldRow = oldRows[0];

    await db.update(table).set(data as never).where(eq(idColumn, id as never));

    if (oldRow) {
      const changes = auditChanges(config, oldRow, data);
      await logAudit("update", resource, id, {
        title: auditTitle(config, { ...oldRow, ...data }),
        changes,
      });
    }
    revalidateFor(config);
  });
}

export async function deleteItem(
  resource: string,
  id: string | number
): Promise<ActionResult> {
  return runAction(async () => {
    const config = await getConfig(resource);
    if (config.allowDelete === false) throw new ValidationError("Tidak bisa menghapus data ini");

    const table = getTable(resource);
    if (!table) throw new ValidationError("Resource tidak dikenal");

    const idColumn = (table as unknown as Record<string, SQLiteColumn>)[config.idField];
    const oldRows = await db
      .select()
      .from(table)
      .where(eq(idColumn, id as never))
      .limit(1);
    const oldRow = oldRows[0];

    await db.delete(table).where(eq(idColumn, id as never));

    if (oldRow) {
      const changes = auditChanges(config, oldRow, null);
      await logAudit("delete", resource, id, {
        title: auditTitle(config, oldRow),
        changes,
      });
    }
    revalidateFor(config);
  });
}

export async function setUserRole(userId: string, role: string) {
  const session = await auth.api.getSession({ headers: await headers() });
  if (session?.user.role !== "superadmin") {
    throw new Error("Anda tidak punya akses");
  }
  if (!ROLES.includes(role as Role)) {
    throw new Error("Role tidak valid");
  }
  const targetRows = await db
    .select({ name: schema.user.name, role: schema.user.role })
    .from(schema.user)
    .where(eq(schema.user.id, userId))
    .limit(1);
  const target = targetRows[0];
  if (!target) throw new Error("User tidak ditemukan");

  await db.update(schema.user).set({ role: role as Role }).where(eq(schema.user.id, userId));
  revalidatePath("/dashboard/users");

  await logAudit("role-change", "user", userId, {
    title: target.name ?? userId,
    changes: [{ label: "Role", old: target.role ?? "user", new: role }],
  });
  return { ok: true };
}
