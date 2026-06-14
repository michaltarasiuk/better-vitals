import { db } from "~/lib/db/index.server";
import * as schema from "~/lib/db/schema.server";

export async function hasUsers() {
  return (await db.$count(schema.user)) > 0;
}
