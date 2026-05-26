import { auth } from "~/lib/auth/index.server";

export async function getUserOrganizations(request: Request) {
  const organizations = await auth.api.listOrganizations({
    headers: request.headers,
  });
  return organizations;
}
