import * as errore from "errore";
import type { z } from "zod";

export class InvalidFormDataError extends errore.createTaggedError({
  name: "InvalidFormDataError",
  message: "Invalid form data",
}) {}

export async function parseFormData<T extends z.ZodType>(
  request: Request,
  schema: T
) {
  const formData = await request
    .formData()
    .catch((error) => new InvalidFormDataError({ cause: error }));
  if (formData instanceof Error) {
    return formData;
  }
  const formDataObject = Object.fromEntries(formData);
  const formDataParseResult = schema.safeParse(formDataObject);
  if (!formDataParseResult.success) {
    return new InvalidFormDataError({ cause: formDataParseResult.error });
  }
  return formDataParseResult.data;
}
