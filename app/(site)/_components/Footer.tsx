"use client";

import Image from "next/image";
import Link from "next/link";
import { socialLinks } from "./social-links";

export default function Footer() {
  return (
    <footer className="w-full px-6 md:px-16 py-10">
      <div className="footer-glass mx-auto lg-r-lg px-8 py-10 md:px-14 md:py-12">
        <div className="relative z-[2] flex flex-col items-center text-center gap-8 md:flex-row md:items-center md:justify-between md:text-left">
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
