import { requireAuthenticated } from "~/lib/auth/guards.server";

import type { Route } from "./+types/route";

export const middleware: Route.MiddlewareFunction[] = [requireAuthenticated];

export function loader() {
  throw new Response("Not Found", { status: 404 });
}
