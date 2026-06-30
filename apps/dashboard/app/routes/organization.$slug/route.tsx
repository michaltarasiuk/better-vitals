import { AppLayout } from "@better-vitals/ui/components/app-layout";
import { Navbar, NavbarSpacer } from "@better-vitals/ui/components/navbar";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarTrigger,
} from "@better-vitals/ui/components/sidebar";
import { Outlet } from "react-router";
import { cn } from "tailwind-variants";

import { requireAuthenticated } from "~/lib/auth/guards.server";

import type { Route } from "./+types/route";

export const middleware: Route.MiddlewareFunction[] = [requireAuthenticated];

export default function OrganizationLayout() {
  return (
    <AppLayout
      sidebar={
        <Sidebar>
          <SidebarContent>
            <SidebarHeader />
            <SidebarMenu />
          </SidebarContent>
        </Sidebar>
      }
      navbar={
        <Navbar>
          <SidebarTrigger className={cn("-ms-2 hidden", "md:inline-flex")} />
          <NavbarSpacer />
        </Navbar>
      }
    >
      <Outlet />
    </AppLayout>
  );
}
