"use client";

import Image from "next/image";
import Link from "next/link";

// Lucide sudah tidak menyediakan icon brand/logo (Instagram, LinkedIn, X, dll)
// karena alasan trademark, jadi semua logo sosmed di bawah pakai custom SVG.

function InstagramIcon({ size = 22, className }: { size?: number; className?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      className={className}
    >
      <rect x="2.5" y="2.5" width="19" height="19" rx="5" />
      <circle cx="12" cy="12" r="4.4" />
      <circle cx="17.4" cy="6.6" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

function XIcon({ size = 22, className }: { size?: number; className?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
    >
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

function LinkedinIcon({ size = 22, className }: { size?: number; className?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
    >
      <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.02-3.03-1.85-3.03-1.85 0-2.14 1.45-2.14 2.94v5.66H9.36V9h3.41v1.56h.05c.47-.9 1.63-1.85 3.36-1.85 3.6 0 4.27 2.37 4.27 5.45v6.29zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zM7.11 20.45H3.56V9h3.55v11.45z" />
    </svg>
  );
}

const socialLinks = [
  { label: "Instagram", href: "https://instagram.com/format.itb", icon: InstagramIcon },
  { label: "X", href: "https://x.com/format_itb", icon: XIcon },
  { label: "LinkedIn", href: "https://linkedin.com/company/format-itb", icon: LinkedinIcon },
];

export default function Footer() {
  return (
    <footer className="w-full px-6 md:px-16 py-10">
      <div className="footer-glass mx-auto rounded-3xl px-8 py-10 md:px-14 md:py-12">
        <div className="flex flex-col items-center text-center gap-8 md:flex-row md:items-center md:justify-between md:text-left">
          <Link href="/" className="footer-logo shrink-0">
            <Image src="/logo_navbar.svg" alt="Logo" width={128} height={128} />
          </Link>

          <div className="flex flex-col items-center gap-4 md:items-end">
            <div className="flex items-center gap-3">
              {socialLinks.map(({ label, href, icon: Icon }, i) => (
                <Link
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="footer-social-btn"
                  style={{ animationDelay: `${i * 90}ms` }}
                >
                  <Icon size={22} />
                </Link>
              ))}
            </div>

            <div className="flex flex-col items-center w-fit mx-auto md:items-end md:mx-0 md:ml-auto">
              <div className="footer-divider" />
              <p className="mt-3 text-center md:text-right text-white/60 text-sm whitespace-nowrap">
                &copy; FORMAT ITB 2026. All rights reserved.
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}