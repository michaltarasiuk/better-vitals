import * as errore from "errore";

export class NetworkError extends errore.createTaggedError({
  name: "NetworkError",
  message: "$operation request failed",
}) {}
