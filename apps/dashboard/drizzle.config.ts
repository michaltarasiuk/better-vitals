import { defineConfig } from "drizzle-kit";

export default defineConfig({
  dbCredentials: {
    url: "./sqlite.db",
  },
  dialect: "sqlite",
  schema: "./app/lib/db/schema.server.ts",
});
