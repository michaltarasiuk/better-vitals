import { Outlet } from "react-router";

export default function OrganizationCreateLayout() {
  return (
    <div className="flex min-h-dvh items-center justify-center p-4">
      <div className="w-full max-w-md">
        <Outlet />
      </div>
    </div>
  );
}
