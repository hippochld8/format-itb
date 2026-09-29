import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import {
  canAccessSection,
  normalizeRole,
  type DashboardSection,
} from "@/lib/permissions";

export async function requireSection(section: DashboardSection) {
  const session = await auth.api.getSession({ headers: await headers() });
  const role = normalizeRole(session?.user.role);
  if (!canAccessSection(role, section)) {
    redirect("/");
  }
  return { session: session as NonNullable<typeof session>, role };
}

export async function requireAdmin() {
  const session = await auth.api.getSession({ headers: await headers() });
  const role = normalizeRole(session?.user.role);
  if (!session || !role || role === "user") {
    redirect("/");
  }
  return { session: session as NonNullable<typeof session>, role };
}

// Ubah objek baris DB (berisi Date, dsb) jadi JSON murni agar aman dikirim ke client
export function toPlain<T>(value: T): T {
  return JSON.parse(JSON.stringify(value));
}
