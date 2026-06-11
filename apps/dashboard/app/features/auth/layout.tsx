import { requireUnauthenticated } from "~/lib/auth/middleware.server";

import type { Route } from "./+types/layout";

export { CenteredLayout as default } from "../shared/centered-layout";

export const middleware: Route.MiddlewareFunction[] = [requireUnauthenticated];
