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
  const formData = await request.formData().catch(
    (error) =>
      new InvalidFormDataError({
        cause: error,
      })
  );
  if (formData instanceof Error) {
    return formData;
  }
  const formDataObject = Object.fromEntries(formData);
  const formDataResult = schema.safeParse(formDataObject);
  if (!formDataResult.success) {
    return new InvalidFormDataError({
      cause: formDataResult.error,
    });
  }
  return formDataResult.data;
}
