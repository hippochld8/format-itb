"use client";

import { useState } from "react";
import { setUserRole } from "@/app/dashboard/actions";
import { ROLES, ROLE_LABELS, type Role } from "@/lib/permissions";

interface UserRow {
  id: string;
  name: string;
  email: string;
  image: string | null;
  role: Role;
}

export default function UsersManager({
  users,
  currentUserId,
}: {
  users: UserRow[];
  currentUserId: string;
}) {
  const [busyId, setBusyId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const changeRole = async (user: UserRow, role: string) => {
    if (user.role === role) return;
    if (user.id === currentUserId) {
      setError("Tidak bisa mengubah role akun sendiri.");
      return;
    }
    setBusyId(user.id);
    setError(null);
    try {
      await setUserRole(user.id, role);
      window.location.reload();
    } catch (e) {
      setError(e instanceof Error ? e.message : "Gagal mengubah role");
      setBusyId(null);
    }
  };

  return (
    <div className="flex flex-col gap-5">
      <div>
        <h2 className="text-2xl font-bold text-white">Kelola User</h2>
        <p className="text-sm text-white/50 mt-1">
          Tentukan & verifikasi role tiap akun. Superadmin mengelola semua section.
        </p>
      </div>

      {error && (
        <p className="text-sm text-red-400 bg-red-500/10 border border-red-500/20 rounded-xl px-3 py-2">
          {error}
        </p>
      )}

      <div className="rounded-2xl border border-white/10 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-white/10 bg-white/[0.03]">
                <th className="px-4 py-3 text-xs font-semibold text-white/50 uppercase tracking-wide">
                  User
                </th>
                <th className="px-4 py-3 text-xs font-semibold text-white/50 uppercase tracking-wide">
                  Role
                </th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr
                  key={user.id}
                  className="border-b border-white/5 hover:bg-white/[0.02] transition-colors"
                >
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      {user.image ? (
                        <img
                          src={user.image}
                          alt=""
                          className="w-10 h-10 rounded-full object-cover"
                        />
                      ) : (
                        <span className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold text-[#13202C]"
                          style={{ backgroundColor: "#A3C544" }}
                        >
                          {user.name?.[0]?.toUpperCase() ?? "U"}
                        </span>
                      )}
                      <div className="min-w-0">
                        <p className="text-white text-sm font-medium truncate">
                          {user.name}
                          {user.id === currentUserId && (
                            <span className="ml-2 text-xs text-white/40">(kamu)</span>
                          )}
                        </p>
                        <p className="text-white/50 text-xs truncate">{user.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <select
                      value={user.role}
                      disabled={busyId === user.id || user.id === currentUserId}
                      onChange={(e) => changeRole(user, e.target.value)}
                      className="bg-[#1a2430] border border-white/10 rounded-xl px-3 py-2 text-sm text-white outline-none focus:border-[#A3C544] disabled:opacity-50"
                    >
                      {ROLES.map((r) => (
                        <option key={r} value={r}>
                          {ROLE_LABELS[r]}
                        </option>
                      ))}
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
