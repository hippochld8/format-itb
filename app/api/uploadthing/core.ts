import type { NextRequest } from "next/server";
import { createUploadthing, type FileRouter } from "uploadthing/next";
import { UploadThingError } from "uploadthing/server";
import { auth } from "@/lib/auth";
import { isAdminRole, normalizeRole } from "@/lib/permissions";

// Endpoint upload hanya boleh dipakai dari dashboard CMS, jadi wajib login
// dengan role admin. Tanpa guard ini, /api/uploadthing jadi endpoint publik
// yang bisa dipakai siapa saja untuk menitipkan file ke akun UploadThing.
async function requireAdminUploader(req: NextRequest) {
  const session = await auth.api.getSession({ headers: req.headers });
  const role = normalizeRole(session?.user.role);
  if (!session || !isAdminRole(role)) {
    // UploadThing hanya punya FORBIDDEN (403), bukan 401.
    throw new UploadThingError({
      code: "FORBIDDEN",
      message: "Unauthorized",
    });
  }
  return { userId: session.user.id };
}

const f = createUploadthing();

export const ourFileRouter = {
  imageUploader: f({ image: { maxFileSize: "4MB", maxFileCount: 4 } })
    .middleware(async ({ req }) => requireAdminUploader(req))
    .onUploadComplete(async ({ file }) => {
      return { url: file.ufsUrl };
    }),

  documentUploader: f({
    pdf: { maxFileSize: "16MB", maxFileCount: 4 },
    "application/msword": { maxFileSize: "16MB", maxFileCount: 4 },
  })
    .middleware(async ({ req }) => requireAdminUploader(req))
    .onUploadComplete(async ({ file }) => {
      return { url: file.ufsUrl };
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
