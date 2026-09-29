import { getOrgMembers } from "@/db/queries";
import { renderCmsResource } from "../_lib/render-cms-resource";

export const dynamic = "force-dynamic";

export default function TentangKamiAdminPage() {
  return renderCmsResource({
    section: "tentang-kami",
    resource: "tentang-kami",
    load: getOrgMembers,
  });
}
