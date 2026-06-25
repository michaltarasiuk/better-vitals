import * as errore from "errore";

export class DbError extends errore.createTaggedError({
  name: "DbError",
  message: "Database query failed",
}) {}
