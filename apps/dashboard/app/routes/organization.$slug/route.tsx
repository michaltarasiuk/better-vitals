import { isDefined } from "@lite-app/shared/is-defined";
import { AppLayout } from "@lite-app/ui/components/app-layout";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@lite-app/ui/components/avatar";
import { Navbar, NavbarSpacer } from "@lite-app/ui/components/navbar";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuIcon,
  SidebarMenuItem,
  SidebarMenuItemContent,
  SidebarMenuLabel,
  SidebarTrigger,
} from "@lite-app/ui/components/sidebar";
import { HomeIcon, LogOutIcon } from "lucide-react";
import { Outlet, useLoaderData } from "react-router";
import { cn } from "tailwind-variants";

import { requireAuthenticated } from "~/lib/auth/guards.server";
import { sessionContext } from "~/lib/auth/session.server";
import {
  formatUserRole,
  getAvatarFallback,
  getTimeOfDayGreeting,
} from "~/lib/user/display";
import { InviteModal } from "~/routes/organization.$slug.invite/invite";

import type { Route } from "./+types/route";

export const middleware: Route.MiddlewareFunction[] = [requireAuthenticated];

export function loader({ context }: Route.LoaderArgs) {
  const session = context.get(sessionContext);
  if (!isDefined(session)) {
    throw new Error("Missing session");
  }
  return {
    user: session.user,
  };
}

export default function OrganizationLayout() {
  const { user } = useLoaderData<typeof loader>();
  return (
    <AppLayout
      sidebar={
        <Sidebar>
          <SidebarHeader>
            <UserProfile user={user} />
          </SidebarHeader>
          <SidebarContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuItemContent>
                  <SidebarMenuIcon>
                    <HomeIcon aria-hidden />
                  </SidebarMenuIcon>
                  <SidebarMenuLabel>Dashboard</SidebarMenuLabel>
                </SidebarMenuItemContent>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarContent>
          <SidebarFooter>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuItemContent>
                  <SidebarMenuIcon>
                    <LogOutIcon aria-hidden />
                  </SidebarMenuIcon>
                  <SidebarMenuLabel>Log out</SidebarMenuLabel>
                </SidebarMenuItemContent>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarFooter>
        </Sidebar>
      }
      navbar={
        <Navbar>
          <SidebarTrigger className={cn("-ms-2 hidden", "md:inline-flex")} />
          <UserGreeting user={user} />
          <NavbarSpacer />
          <InviteModal />
        </Navbar>
      }
    >
      <Outlet />
    </AppLayout>
  );
}

interface UserGreetingProps {
  user: ReturnType<typeof useLoaderData<typeof loader>>["user"];
}

function UserGreeting({ user }: UserGreetingProps) {
  const greeting = getTimeOfDayGreeting();
  return (
    <h1 className={cn("truncate text-xl font-semibold text-foreground")}>
      {greeting}, {user.name}
    </h1>
  );
}

interface UserProfileProps {
  user: ReturnType<typeof useLoaderData<typeof loader>>["user"];
}

function UserProfile({ user }: UserProfileProps) {
  return (
    <div className={cn("flex items-center gap-3 px-1 py-1")}>
      <Avatar className={cn("size-9")}>
        {isDefined(user.image) && <AvatarImage src={user.image} alt="" />}
        <AvatarFallback>{getAvatarFallback(user.name)}</AvatarFallback>
      </Avatar>
      <div className={cn("flex min-w-0 flex-1 flex-col")}>
        <span className={cn("text-sm leading-tight font-medium")}>
          {user.name}
        </span>
        {isDefined(user.role) && (
          <span className={cn("text-xs leading-tight font-medium text-muted")}>
            {formatUserRole(user.role)}
          </span>
        )}
      </div>
    </div>
  );
}
