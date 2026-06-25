import { DbError } from "~/lib/db/error";
import { db } from "~/lib/db/index.server";
import * as schema from "~/lib/db/schema.server";

export async function hasUsers() {
  const countPromise: Promise<number> = db.$count(schema.user);
  const count = await countPromise.catch(
    (error) => new DbError({ cause: error })
  );
  if (count instanceof Error) {
    return count;
  }
  return count > 0;
}
