import { db } from "~/lib/db";
import * as schema from "~/lib/db/schema";

export async function userExists() {
  return (await db.$count(schema.user)) > 0;
}
