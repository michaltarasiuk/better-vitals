import { Outlet } from "react-router";
import { cn } from "tailwind-variants";

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
