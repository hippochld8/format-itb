import { db } from "@/db";
import { siteContent } from "@/db/schema";
import { asc } from "drizzle-orm";
import { renderCmsResource } from "../_lib/render-cms-resource";

export const dynamic = "force-dynamic";

export default function SiteContentAdminPage() {
  return renderCmsResource({
    section: "site-content",
    resource: "site-content",
    load: () => db.select().from(siteContent).orderBy(asc(siteContent.key)),
  });
}
