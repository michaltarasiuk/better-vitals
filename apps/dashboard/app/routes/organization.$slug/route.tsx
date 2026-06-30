import { isDefined } from "@better-vitals/shared/is-defined";
import { AppLayout } from "@better-vitals/ui/components/app-layout";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@better-vitals/ui/components/avatar";
import { buttonVariants } from "@better-vitals/ui/components/button";
import { Navbar, NavbarSpacer } from "@better-vitals/ui/components/navbar";
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
} from "@better-vitals/ui/components/sidebar";
import { HomeIcon, LogOutIcon, UserPlusIcon } from "lucide-react";
import {
  href,
  Outlet,
  Link as RouterLink,
  useLoaderData,
  useLocation,
} from "react-router";
import { cn } from "tailwind-variants";

import { MissingSessionError } from "~/lib/auth/error";
import { requireAuthenticated } from "~/lib/auth/guards.server";
import { sessionContext } from "~/lib/auth/session.server";
import {
  formatUserRole,
  getAvatarFallback,
  getTimeOfDayGreeting,
} from "~/lib/user/display";

import type { Route } from "./+types/route";

export const middleware: Route.MiddlewareFunction[] = [requireAuthenticated];

export function loader({ context }: Route.LoaderArgs) {
  const session = context.get(sessionContext);
  if (!isDefined(session)) {
    throw new MissingSessionError();
  }
  return {
    user: session.user,
  };
}

export default function OrganizationLayout({ params }: Route.ComponentProps) {
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
          <InviteButton slug={params.slug} />
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

interface InviteButtonProps {
  slug: Route.ComponentProps["params"]["slug"];
}

function InviteButton({ slug }: InviteButtonProps) {
  const location = useLocation();

  return (
    <RouterLink
      to={href("/organization/:slug/invite", {
        slug,
      })}
      state={{
        background: location,
      }}
      className={buttonVariants({
        variant: "primary",
        size: "sm",
      })}
    >
      <UserPlusIcon aria-hidden />
      Invite
    </RouterLink>
  );
}
