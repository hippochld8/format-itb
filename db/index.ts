import { drizzle } from "drizzle-orm/libsql";
import { createClient, type Client } from "@libsql/client";

let _client: Client | null = null;
let _db: ReturnType<typeof drizzle> | null = null;

function getClient() {
  if (!_client) {
    _client = createClient({
      url: process.env.TURSO_DATABASE_URL!,
      authToken: process.env.TURSO_AUTH_TOKEN!,
    });
  }
  return _client;
}

function getDb() {
  if (!_db) {
    _db = drizzle(getClient());
  }
  return _db;
}

export const db: ReturnType<typeof drizzle> = new Proxy({} as ReturnType<typeof drizzle>, {
  get(_, prop) {
    return (getDb() as any)[prop];
  },
});
