import { Outlet } from "react-router";
import { cn } from "tailwind-variants";

import { requireUnauthenticated } from "~/lib/auth/guards.server";

import type { Route } from "./+types/route";

export const middleware: Route.MiddlewareFunction[] = [requireUnauthenticated];

export default function AuthLayout() {
  return (
    <div className={cn("flex min-h-dvh items-center justify-center p-4")}>
      <div className={cn("w-full max-w-md")}>
        <Outlet />
      </div>
    </div>
  );
}
