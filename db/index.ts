import { drizzle } from "drizzle-orm/libsql";
import { createClient, type Client } from "@libsql/client";

type Db = ReturnType<typeof drizzle>;

let _client: Client | null = null;
let _db: Db | null = null;

function getClient() {
  if (!_client) {
    _client = createClient({
      url: process.env.TURSO_DATABASE_URL!,
      authToken: process.env.TURSO_AUTH_TOKEN!,
    });
  }
  return _client;
}

function getDb(): Db {
  if (!_db) {
    _db = drizzle(getClient());
  }
  return _db;
}

export const db: Db = new Proxy({} as Db, {
  get: (_target, prop) => Reflect.get(getDb(), prop),
});
