import { href, type LoaderFunctionArgs, Outlet, redirect } from "react-router";
import { cn } from "tailwind-variants";

import { isLoggedIn } from "~/lib/auth/session.server";

export async function loader({ request }: LoaderFunctionArgs) {
  if (await isLoggedIn(request)) {
    throw redirect(href("/"));
  }
}

export default function AuthLayout() {
  return (
    <div
      className={cn(
        "flex min-h-dvh items-center justify-center overflow-y-auto p-4"
      )}
    >
      <div className={cn("w-full max-w-md")}>
        <Outlet />
      </div>
    </div>
  );
}
