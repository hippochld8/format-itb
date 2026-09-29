import { db } from "@/db";
import { auditLog } from "@/db/schema";
import { desc } from "drizzle-orm";
import { requireSection, toPlain } from "@/lib/dashboard-guard";
import AuditLogViewer, { type AuditRow } from "@/app/dashboard/_components/AuditLogViewer";

export const dynamic = "force-dynamic";

export default async function AuditLogPage() {
  await requireSection("audit");
  const rows = toPlain(
    await db.select().from(auditLog).orderBy(desc(auditLog.createdAt)).limit(500)
  );

  return <AuditLogViewer rows={rows as unknown as AuditRow[]} />;
}