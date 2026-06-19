import { defineConfig } from "drizzle-kit";

export default defineConfig({
  dialect: "sqlite",
  schema: "./app/lib/db/schema.server.ts",
  dbCredentials: {
    url: "./sqlite.db",
  },
});
