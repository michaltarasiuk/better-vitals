import type { z } from "zod";

export async function parseFormData<T extends z.ZodType>(
  request: Request,
  schema: T
) {
  const formData = await request.formData();
  const formDataObject = Object.fromEntries(formData);
  return schema.parse(formDataObject);
}
