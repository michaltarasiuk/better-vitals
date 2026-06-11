import { requireUnauthenticated } from "~/lib/auth/middleware.server";

import { CenteredLayout } from "../shared/centered-layout";
import type { Route } from "./+types/layout";

export const middleware: Route.MiddlewareFunction[] = [requireUnauthenticated];

export { CenteredLayout as default };
