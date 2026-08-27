import { getAllBeasiswa } from "@/db/queries";
import BeasiswaClient from "./BeasiswaClient";

export const dynamic = "force-dynamic";

export default async function BeasiswaPage() {
  const rows = await getAllBeasiswa();

  const beasiswaList = rows.map((b) => ({
    id: String(b.id),
    name: b.name,
    provider: b.provider,
    description: b.description,
    deadline: b.deadline,
    status: b.status,
    quota: b.quota ?? undefined,
    link: b.link,
  }));

  return <BeasiswaClient beasiswaList={beasiswaList} />;
}
