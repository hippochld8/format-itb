export const ROLES = [
  "superadmin",
  "admin-akademik",
  "admin-riset",
  "admin-dokumentasi",
  "admin-beasiswa",
  "admin-merch",
  "user",
] as const;

export type Role = (typeof ROLES)[number];

export const ROLE_LABELS: Record<Role, string> = {
  superadmin: "Super Admin",
  "admin-akademik": "Admin Akademik",
  "admin-riset": "Admin Riset",
  "admin-dokumentasi": "Admin Dokumentasi & Publikasi",
  "admin-beasiswa": "Admin Beasiswa",
  "admin-merch": "Admin Merch",
  user: "User",
};

// Role lama yang digabung (admin-konsultasi dilebur ke admin-akademik).
// Dipetakan agar akun lama tetap berfungsi tanpa kehilangan akses.
const LEGACY_ROLE_MAP: Record<string, Role> = {
  "admin-konsultasi": "admin-akademik",
};

export function normalizeRole(role: string | null | undefined): Role {
  if (!role) return "user";
  const mapped = LEGACY_ROLE_MAP[role];
  if (mapped) return mapped;
  if (ROLES.includes(role as Role)) return role as Role;
  return "user";
}

export type DashboardSection =
  | "kegiatan"
  | "cinta-lokal"
  | "galeri"
  | "akademik"
  | "beasiswa"
  | "konsultasi"
  | "merch"
  | "orders"
  | "tentang-kami"
  | "site-content"
  | "users"
  | "audit";

export const SECTION_ROLES: Record<DashboardSection, Role[]> = {
  kegiatan: ["superadmin", "admin-dokumentasi"],
  "cinta-lokal": ["superadmin", "admin-riset"],
  galeri: ["superadmin", "admin-dokumentasi"],
  akademik: ["superadmin", "admin-akademik"],
  beasiswa: ["superadmin", "admin-beasiswa"],
  konsultasi: ["superadmin", "admin-akademik"],
  merch: ["superadmin", "admin-merch"],
  orders: ["superadmin", "admin-merch"],
  "tentang-kami": ["superadmin"],
  "site-content": ["superadmin"],
  users: ["superadmin"],
  audit: ["superadmin"],
};

export function canAccessSection(
  role: Role | undefined | null,
  section: DashboardSection
) {
  if (!role) return false;
  if (role === "superadmin") return true;
  return SECTION_ROLES[section].includes(LEGACY_ROLE_MAP[role] ?? role);
}

export function isAdminRole(role: Role | undefined | null) {
  return !!role && role !== "user";
}
