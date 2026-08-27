"use client";

import { signOut } from "@/lib/auth-client";

export default function SignOutButton() {
  return (
    <button
      onClick={() => signOut()}
      className="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-sm font-medium text-white/70 hover:text-white hover:bg-white/5 transition-colors"
    >
      Keluar
    </button>
  );
}
