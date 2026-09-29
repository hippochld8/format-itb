import Link from "next/link";
import type { ReactNode } from "react";

function BackToHomeIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="#13202C"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M19 12H5" />
      <path d="M12 19l-7-7 7-7" />
    </svg>
  );
}

// Header halaman dalam (kegiatan, galeri, merch, akademik, beasiswa, ...) :
// tombol kembali ke beranda + judul + subjudul opsional.
export function PageHeader({
  title,
  subtitle,
  backHref = "/",
  className = "mb-14",
  titleClassName = "text-3xl md:text-5xl font-bold text-white",
  children,
}: {
  title: string;
  subtitle?: string;
  backHref?: string;
  className?: string;
  titleClassName?: string;
  children?: ReactNode;
}) {
  return (
    <div className={className}>
      <div className="relative flex items-center justify-center gap-4">
        <Link href={backHref} aria-label="Kembali ke Beranda" className="lg-back-btn">
          <BackToHomeIcon />
        </Link>
        <h1 className={titleClassName}>{title}</h1>
      </div>

      {subtitle && (
        <p className="mt-3 text-center text-white/70 text-sm md:text-base">
          {subtitle}
        </p>
      )}

      {children}
    </div>
  );
}
