import { Outlet } from "react-router";

import { requireUnauthenticated } from "~/lib/auth/guards.server";

import type { Route } from "./+types/route";

export const middleware: Route.MiddlewareFunction[] = [requireUnauthenticated];

export default function AuthLayout() {
  return (
    <div className="flex min-h-dvh items-center justify-center p-4">
      <div className="w-full max-w-md">
        <Outlet />
      </div>
    </div>
  );
}
