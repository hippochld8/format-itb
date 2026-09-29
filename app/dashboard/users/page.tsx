import { db } from "@/db";
import { user } from "@/db/schema";
import { asc } from "drizzle-orm";
import { requireSection, toPlain } from "@/lib/dashboard-guard";
import { normalizeRole } from "@/lib/permissions";
import UsersManager from "@/app/dashboard/_components/UsersManager";

export const dynamic = "force-dynamic";

export default async function UsersAdminPage() {
  const { session } = await requireSection("users");
  const users = toPlain(await db.select().from(user).orderBy(asc(user.createdAt)));

  return (
    <UsersManager
      users={users.map((u) => ({
        id: u.id,
        name: u.name,
        email: u.email,
        image: u.image,
        role: normalizeRole(u.role),
      }))}
      currentUserId={session.user.id}
    />
  );
}
