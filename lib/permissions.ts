export const ROLES = [
  "superadmin",
  "admin-akademik",
  "admin-beasiswa",
  "admin-konsultasi",
  "admin-merch",
  "user",
] as const;

export type Role = (typeof ROLES)[number];

export const ROLE_LABELS: Record<Role, string> = {
  superadmin: "Super Admin",
  "admin-akademik": "Admin Akademik",
  "admin-beasiswa": "Admin Beasiswa",
  "admin-konsultasi": "Admin Konsultasi",
  "admin-merch": "Admin Merch",
  user: "User",
};

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
  | "users";

export const SECTION_ROLES: Record<DashboardSection, Role[]> = {
  kegiatan: ["superadmin"],
  "cinta-lokal": ["superadmin"],
  galeri: ["superadmin"],
  akademik: ["superadmin", "admin-akademik"],
  beasiswa: ["superadmin", "admin-beasiswa"],
  konsultasi: ["superadmin", "admin-konsultasi"],
  merch: ["superadmin", "admin-merch"],
  orders: ["superadmin", "admin-merch"],
  "tentang-kami": ["superadmin"],
  "site-content": ["superadmin"],
  users: ["superadmin"],
};

export function canAccessSection(
  role: Role | undefined | null,
  section: DashboardSection
) {
  if (!role) return false;
  if (role === "superadmin") return true;
  return SECTION_ROLES[section].includes(role);
}

export function isAdminRole(role: Role | undefined | null) {
  return !!role && role !== "user";
}
