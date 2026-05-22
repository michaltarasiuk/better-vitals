import { Outlet } from "react-router";

export default function AuthLayout() {
  return (
    <div className="flex min-h-dvh items-center justify-center overflow-y-auto p-4">
      <div className="w-full max-w-md">
        <Outlet />
      </div>
    </div>
  );
}
