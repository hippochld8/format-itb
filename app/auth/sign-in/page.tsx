"use client";

import { useState, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { ArrowLeft, ShieldCheck } from "lucide-react";
import { signIn } from "@/lib/auth-client";

function SignInContent() {
  const [loading, setLoading] = useState(false);
  const searchParams = useSearchParams();
  const redirectTo = searchParams.get("redirect") || "/";

  async function handleGoogle() {
    setLoading(true);
    await signIn.social({ provider: "google", callbackURL: redirectTo });
  }

  return (
    <main className="relative min-h-screen flex flex-col items-center justify-center px-6 py-16">
      <Link
        href="/"
        aria-label="Kembali ke Beranda"
        className="fixed top-6 left-6 inline-flex items-center gap-2 rounded-full text-sm font-medium text-white/70 hover:text-white transition-colors"
      >
        <span
          className="inline-flex items-center justify-center w-8 h-8 rounded-full text-[#13202C] transition-transform hover:scale-105"
          style={{ backgroundColor: "#A3C544" }}
        >
          <ArrowLeft size={18} />
        </span>
        Beranda
      </Link>

      <div className="auth-enter w-full max-w-md">
        <div className="kegiatan-glass rounded-3xl px-6 py-10 sm:px-10 sm:py-12">
          <div className="text-center mb-8">
            <span
              className="inline-flex items-center justify-center w-12 h-12 rounded-2xl text-[#13202C] mb-5"
              style={{ backgroundColor: "#A3C544" }}
            >
              <ShieldCheck size={24} />
            </span>
            <h1 className="text-2xl sm:text-3xl font-bold text-white">Masuk</h1>
            <p className="mt-2 text-sm text-white/60 leading-relaxed">
              Masuk dengan akun Google untuk mengelola FORMAT ITB
            </p>
          </div>

          <button
            onClick={handleGoogle}
            disabled={loading}
            className="w-full flex items-center justify-center gap-3 px-6 py-3 rounded-full text-sm font-semibold text-[#13202C] transition-all hover:scale-[1.02] active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#A3C544] focus-visible:ring-offset-2 focus-visible:ring-offset-[#13202C] disabled:opacity-60 disabled:hover:scale-100 disabled:cursor-not-allowed"
            style={{ backgroundColor: "#A3C544" }}
          >
            {loading ? (
              <span className="inline-block w-4 h-4 border-2 border-[#13202C]/40 border-t-[#13202C] rounded-full animate-spin" />
            ) : (
              <svg width="18" height="18" viewBox="0 0 48 48" aria-hidden="true">
                <path
                  fill="#FFC107"
                  d="M43.611 20.083H42V20H24v8h11.303c-1.649 4.657-6.08 8-11.303 8-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4 12.955 4 4 12.955 4 24s8.955 20 20 20 20-8.955 20-20c0-1.341-.138-2.65-.389-3.917z"
                />
                <path
                  fill="#FF3D00"
                  d="M6.306 14.691l6.571 4.819C14.655 15.108 18.961 12 24 12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4 16.318 4 9.656 8.337 6.306 14.691z"
                />
                <path
                  fill="#4CAF50"
                  d="M24 44c5.166 0 9.86-1.977 13.409-5.192l-6.19-5.238A11.91 11.91 0 0 1 24 36c-5.202 0-9.619-3.317-11.283-7.946l-6.522 5.025C9.505 39.556 16.227 44 24 44z"
                />
                <path
                  fill="#1976D2"
                  d="M43.611 20.083H42V20H24v8h11.303a12.04 12.04 0 0 1-4.087 5.571l.003-.002 6.19 5.238C36.971 39.205 44 34 44 24c0-1.341-.138-2.65-.389-3.917z"
                />
              </svg>
            )}
            {loading ? "Mengarahkan..." : "Lanjutkan dengan Google"}
          </button>

          <p className="mt-6 text-center text-xs text-white/50 leading-relaxed">
            Halaman ini untuk pengurus/anggota FORMAT ITB.
            <br />
            Akses role akan diatur oleh superadmin.
          </p>
        </div>
      </div>
    </main>
  );
}

export default function SignInPage() {
  return (
    <Suspense fallback={null}>
      <SignInContent />
    </Suspense>
  );
}
