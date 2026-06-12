import { drizzle } from "drizzle-orm/better-sqlite3";

import * as schema from "./schema.server";

export const db = drizzle("./sqlite.db", {
  schema,
});
