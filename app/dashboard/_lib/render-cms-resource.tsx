import ResourceManager from "@/app/dashboard/_components/ResourceManager";
import { getCmsResource } from "@/lib/cms-config";
import { requireSection, toPlain } from "@/lib/dashboard-guard";
import type { DashboardSection } from "@/lib/permissions";

/**
 * Halaman dashboard untuk sebuah resource CMS pada dasarnya selalu sama:
 * cek hak akses -> ambil konfigurasi -> query baris -> render ResourceManager.
 * Fungsi ini encapsulate pola tersebut supaya tiap route cukup menulis
 * `section`, nama resource, dan cara ambil datanya.
 */
export async function renderCmsResource({
  section,
  resource,
  load,
  loadSelectOptions,
}: {
  section: DashboardSection;
  resource: string;
  load: () => Promise<unknown[]>;
  /** Untuk field bertipe select yang butuh data referensi (mis. album, matkul). */
  loadSelectOptions?: () => Promise<Record<string, { value: string; label: string }[]>>;
}) {
  await requireSection(section);

  const config = getCmsResource(resource);
  if (!config) {
    throw new Error(
      `Resource CMS "${resource}" belum terdaftar di lib/cms-config.ts`
    );
  }

  const [rows, selectOptions] = await Promise.all([
    load(),
    loadSelectOptions?.(),
  ]);

  return (
    <ResourceManager
      config={config}
      rows={toPlain(rows) as Record<string, unknown>[]}
      selectOptions={selectOptions}
    />
  );
}
