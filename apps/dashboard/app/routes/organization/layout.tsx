"use client";

import { AppLayout } from "@lite-app/ui/components/app-layout";
import { Avatar, AvatarImage } from "@lite-app/ui/components/avatar";
import { Navbar, NavbarHeader } from "@lite-app/ui/components/navbar";
import {
  Sidebar,
  SidebarFooter,
  SidebarHeader,
  SidebarMain,
  SidebarMenuItem,
} from "@lite-app/ui/components/sidebar";
import { Outlet } from "react-router";
import { cn } from "tailwind-variants";

export default function OrganizationLayout() {
  return (
    <AppLayout
      navbar={
        <Navbar>
          <NavbarHeader />
        </Navbar>
      }
      sidebar={
        <Sidebar>
          <SidebarHeader>
            <div className={cn("flex items-center gap-3 px-1 py-1")}>
              <Avatar className={cn("size-9")}>
                <AvatarImage src="/avatars/blue-light.jpg" />
              </Avatar>
              <div data-sidebar="label" className="flex min-w-0 flex-col">
                {null}
              </div>
            </div>
          </SidebarHeader>
          <SidebarMain>
            <SidebarMenuItem />
          </SidebarMain>
          <SidebarFooter />
        </Sidebar>
      }
    >
      <Outlet />
    </AppLayout>
  );
}
