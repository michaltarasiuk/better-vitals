import { auth } from "~/lib/auth/index.server";

export function getActiveOrganization(request: Request) {
  return auth.api.getFullOrganization({
    headers: request.headers,
  });
}
