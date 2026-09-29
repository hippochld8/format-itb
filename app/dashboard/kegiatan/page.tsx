import { getAllKegiatan } from "@/db/queries";
import { renderCmsResource } from "../_lib/render-cms-resource";

export const dynamic = "force-dynamic";

export default function KegiatanAdminPage() {
  return renderCmsResource({
    section: "kegiatan",
    resource: "kegiatan",
    load: getAllKegiatan,
  });
}
