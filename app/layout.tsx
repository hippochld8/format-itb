import "./globals.css";
import { NextSSRPlugin } from "@uploadthing/react/next-ssr-plugin";
import { extractRouterConfig } from "uploadthing/server";
import { ourFileRouter } from "./api/uploadthing/core";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id">
      <body>
        {/* Ambient light field — gives the liquid glass something to refract */}
        <div className="lg-ambient" aria-hidden="true">
          <span className="lg-orb lg-orb-lime" />
          <span className="lg-orb lg-orb-azure" />
          <span className="lg-orb lg-orb-cyan" />
          <span className="lg-orb lg-orb-white" />
        </div>
        <NextSSRPlugin routerConfig={extractRouterConfig(ourFileRouter)} />
        {children}
      </body>
    </html>
  );
}
