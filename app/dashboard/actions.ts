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
import { getCmsResource, type CmsFieldConfig } from "@/lib/cms-config";

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
  if (!config) throw new Error("Resource tidak dikenal");

  const session = await auth.api.getSession({ headers: await headers() });
  const role = session?.user.role as Role | undefined;
  if (!canAccessSection(role, config.section)) {
    throw new Error("Anda tidak punya akses");
  }
  return config;
}

function parseValue(field: CmsFieldConfig, raw: unknown) {
  if (raw === null || raw === undefined || raw === "") {
    if (field.required) throw new Error(`${field.label} wajib diisi`);
    return null;
  }
  switch (field.type) {
    case "number": {
      const n = Number(raw);
      if (Number.isNaN(n)) throw new Error(`${field.label} harus berupa angka`);
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
        throw new Error(`${field.label} bukan JSON yang valid`);
      }
    }
    case "select": {
      if (field.valueType === "number") {
        const n = Number(raw);
        if (Number.isNaN(n)) throw new Error(`${field.label} tidak valid`);
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

export async function createItem(resource: string, values: Record<string, unknown>) {
  const config = await getConfig(resource);
  if (config.allowCreate === false) throw new Error("Tidak bisa menambah data ini");

  const table = getTable(resource);
  if (!table) throw new Error("Resource tidak dikenal");

  const data: Record<string, unknown> = {};
  for (const field of config.fields) {
    if (field.key === config.idField) continue;
    data[field.key] = parseValue(field, values[field.key]);
  }

  await db.insert(table).values(data as never);
  revalidateFor(config);
  return { ok: true };
}

export async function updateItem(
  resource: string,
  id: string | number,
  values: Record<string, unknown>
) {
  const config = await getConfig(resource);
  if (config.allowUpdate === false) throw new Error("Tidak bisa mengubah data ini");

  const table = getTable(resource);
  if (!table) throw new Error("Resource tidak dikenal");

  const data: Record<string, unknown> = {};
  for (const field of config.fields) {
    if (field.key === config.idField || field.readOnly) continue;
    if (!(field.key in values)) continue;
    data[field.key] = parseValue(field, values[field.key]);
  }

  if (Object.keys(data).length === 0) {
    throw new Error("Tidak ada data yang diubah");
  }

  const idColumn = (table as unknown as Record<string, SQLiteColumn>)[config.idField];
  await db.update(table).set(data as never).where(eq(idColumn, id as never));
  revalidateFor(config);
  return { ok: true };
}

export async function deleteItem(resource: string, id: string | number) {
  const config = await getConfig(resource);
  if (config.allowDelete === false) throw new Error("Tidak bisa menghapus data ini");

  const table = getTable(resource);
  if (!table) throw new Error("Resource tidak dikenal");

  const idColumn = (table as unknown as Record<string, SQLiteColumn>)[config.idField];
  await db.delete(table).where(eq(idColumn, id as never));
  revalidateFor(config);
  return { ok: true };
}

export async function setUserRole(userId: string, role: string) {
  const session = await auth.api.getSession({ headers: await headers() });
  if (session?.user.role !== "superadmin") {
    throw new Error("Anda tidak punya akses");
  }
  if (!ROLES.includes(role as Role)) {
    throw new Error("Role tidak valid");
  }
  await db.update(schema.user).set({ role: role as Role }).where(eq(schema.user.id, userId));
  revalidatePath("/dashboard/users");
  return { ok: true };
}
