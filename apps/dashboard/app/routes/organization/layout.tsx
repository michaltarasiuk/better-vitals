import { AppLayout } from "@lite-app/ui/components/app-layout";
import { Outlet } from "react-router";
import { cn } from "tailwind-variants";

export default function OrganizationLayout() {
  return (
    <div className={cn("flex min-h-svh w-full")}>
      <AppLayout navbar={null}>
        <Outlet />
      </AppLayout>
    </div>
  );
}
