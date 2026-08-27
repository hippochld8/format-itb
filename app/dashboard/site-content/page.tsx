import { db } from "@/db";
import { siteContent } from "@/db/schema";
import { asc } from "drizzle-orm";
import { getCmsResource } from "@/lib/cms-config";
import { requireSection, toPlain } from "@/lib/dashboard-guard";
import ResourceManager from "@/app/dashboard/components/ResourceManager";

export const dynamic = "force-dynamic";

export default async function SiteContentAdminPage() {
  await requireSection("site-content");
  const config = getCmsResource("site-content")!;
  const rows = toPlain(
    await db.select().from(siteContent).orderBy(asc(siteContent.key))
  );
  return <ResourceManager config={config} rows={rows} />;
}
