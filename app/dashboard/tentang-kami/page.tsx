import { db } from "@/db";
import { orgMember } from "@/db/schema";
import { getCmsResource } from "@/lib/cms-config";
import { requireSection, toPlain } from "@/lib/dashboard-guard";
import ResourceManager from "@/app/dashboard/components/ResourceManager";

export const dynamic = "force-dynamic";

export default async function TentangKamiAdminPage() {
  await requireSection("tentang-kami");
  const config = getCmsResource("tentang-kami")!;
  const rows = toPlain(
    await db.select().from(orgMember)
  );
  return <ResourceManager config={config} rows={rows} />;
}
