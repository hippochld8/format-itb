import { betterAuth } from "better-auth";
import { drizzleAdapter } from "@better-auth/drizzle-adapter";
import { db } from "@/db";
import { user, session, account, verification } from "@/db/schema";
import { ROLES } from "@/lib/permissions";

const SUPERADMIN_EMAILS = (process.env.SUPERADMIN_EMAILS ?? "")
  .split(",")
  .map((e) => e.trim().toLowerCase())
  .filter(Boolean);

export const auth = betterAuth({
  baseURL: process.env.BETTER_AUTH_URL,
  database: drizzleAdapter(db, {
    provider: "sqlite",
    schema: { user, session, account, verification },
  }),
  user: {
    additionalFields: {
      role: {
        type: "string",
        required: false,
        defaultValue: "user",
        input: false,
        validate: {
          input: (value: unknown) => {
            if (!value) return "user";
            const role = String(value);
            if (!ROLES.includes(role as (typeof ROLES)[number])) {
              return "user";
            }
            return role;
          },
        },
      },
    },
  },
  databaseHooks: {
    user: {
      create: {
        before: async (user) => {
          const email = (user.email ?? "").toLowerCase();
          const role = SUPERADMIN_EMAILS.includes(email)
            ? "superadmin"
            : "user";
          return { data: { ...user, role } };
        },
      },
    },
  },
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    },
  },
});

export type Session = typeof auth.$Infer.Session;
