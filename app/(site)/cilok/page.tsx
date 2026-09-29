import { getCintaLokalSummaries } from "@/db/queries";
import CintaLokalClient from "./CintaLokalClient";

export const dynamic = "force-dynamic";

export default async function CintaLokalPage() {
  const articles = await getCintaLokalSummaries();

  return <CintaLokalClient articles={articles} />;
}
