import { getOrgMembers, getSiteContent } from "@/db/queries";
import { ORG_STRUCTURE, type OrgBranch } from "@/lib/org-structure";
import type { OrgPerson } from "@/lib/types";
import TentangKamiClient from "./TentangKamiClient";

export const dynamic = "force-dynamic";

export type OrgBranchWithPerson = Omit<OrgBranch, "head" | "members"> & {
  head: OrgPerson;
  members: OrgPerson[];
};

export default async function TentangKamiPage() {
  const [members, content] = await Promise.all([getOrgMembers(), getSiteContent()]);

  const byRoleKey = new Map(members.map((m) => [m.roleKey, m]));

  // Posisi yang datanya belum ada di database disembunyikan supaya organogram
  // tidak menampilkan kotak kosong.
  const toPerson = (roleKey: string): OrgPerson | null => {
    const row = byRoleKey.get(roleKey);
    if (!row) return null;
    return { roleKey: row.roleKey, role: row.roleLabel, name: row.name, photo: row.photo };
  };

  const toBranch = (branch: OrgBranch): OrgBranchWithPerson | null => {
    const head = toPerson(branch.head);
    if (!head) return null;
    return { wide: branch.wide, head, members: branch.members.map(toPerson).filter((p) => p !== null) };
  };

  const root = toPerson(ORG_STRUCTURE.root);
  const firstLevel = ORG_STRUCTURE.firstLevel.map(toBranch).filter((b) => b !== null);
  const divisi = ORG_STRUCTURE.divisi.map(toBranch).filter((b) => b !== null);

  return (
    <TentangKamiClient
      root={root}
      firstLevel={firstLevel}
      divisi={divisi}
      tentangFormat={content["tentang-format"]}
      kataPengantarKetua={content["kata-pengantar-ketua"]}
    />
  );
}
