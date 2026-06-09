"use client";

import { createContext } from "@lite-app/shared/create-context";
import { PanelLeftIcon } from "lucide-react";
import { useState } from "react";
import { composeRenderProps } from "react-aria-components";

import { Button, type ButtonProps } from "../button";
import { sidebarVariants } from "./sidebar";

const slots = sidebarVariants();

interface SidebarContext {
  open: boolean;
  toggle: () => void;
}

const [SidebarContext, useSidebar] =
  createContext<SidebarContext>("SidebarContext");

interface SidebarProviderProps extends React.ComponentProps<"div"> {}

function SidebarProvider({
  children,
  className,
  ...rest
}: SidebarProviderProps) {
  const [open, setOpen] = useState(true);
  function toggle() {
    setOpen(!open);
  }
  return (
    <SidebarContext
      value={{
        open,
        toggle,
      }}
    >
      <div
        data-slot="sidebar-provider"
        className={slots.provider({
          className,
        })}
        {...rest}
      >
        {children}
      </div>
    </SidebarContext>
  );
}

export { SidebarProvider };
export type { SidebarProviderProps };

interface SidebarTriggerProps extends ButtonProps {}

function SidebarTrigger({ children, onPress, ...rest }: SidebarTriggerProps) {
  const sidebar = useSidebar();
  return (
    <Button
      data-slot="sidebar-trigger"
      variant="ghost"
      size="sm"
      isIconOnly
      onPress={(e) => {
        onPress?.(e);
        sidebar.toggle();
      }}
      {...rest}
    >
      {composeRenderProps(
        children,
        (userChildren) => userChildren ?? <PanelLeftIcon aria-hidden />
      )}
    </Button>
  );
}

export { SidebarTrigger };
export type { SidebarTriggerProps };

interface SidebarProps extends React.ComponentProps<"div"> {}

function Sidebar({ children, className, ...rest }: SidebarProps) {
  const sidebar = useSidebar();
  const state = sidebar.open ? "expanded" : "collapsed";
  return (
    <div
      data-state={state}
      className={slots.offset({
        className,
      })}
      {...rest}
    >
      <aside data-slot="sidebar" data-state={state} className={slots.base()}>
        {children}
      </aside>
    </div>
  );
}

export { Sidebar };
export type { SidebarProps };

interface SidebarHeaderProps extends React.ComponentProps<"div"> {}

function SidebarHeader({ children, className, ...rest }: SidebarHeaderProps) {
  return (
    <div
      data-slot="sidebar-header"
      className={slots.header({
        className,
      })}
      {...rest}
    >
      {children}
    </div>
  );
}

export { SidebarHeader };
export type { SidebarHeaderProps };

interface SidebarContentProps extends React.ComponentProps<"div"> {}

function SidebarContent({ children, className, ...rest }: SidebarContentProps) {
  return (
    <div
      data-slot="sidebar-content"
      className={slots.content({
        className,
      })}
      {...rest}
    >
      {children}
    </div>
  );
}

export { SidebarContent };
export type { SidebarContentProps };

interface SidebarMenuProps extends React.ComponentProps<"div"> {}

function SidebarMenu({ children, className, ...rest }: SidebarMenuProps) {
  return (
    <div
      data-slot="sidebar-menu"
      className={slots.menu({
        className,
      })}
      {...rest}
    >
      {children}
    </div>
  );
}

export { SidebarMenu };
export type { SidebarMenuProps };

interface SidebarMenuItemProps extends React.ComponentProps<"div"> {}

function SidebarMenuItem({
  children,
  className,
  ...rest
}: SidebarMenuItemProps) {
  return (
    <div
      data-slot="sidebar-menu-item"
      className={slots.menuItem({
        className,
      })}
      {...rest}
    >
      {children}
    </div>
  );
}

export { SidebarMenuItem };
export type { SidebarMenuItemProps };

interface SidebarMenuIconProps extends React.ComponentProps<"div"> {}

function SidebarMenuIcon({
  children,
  className,
  ...rest
}: SidebarMenuIconProps) {
  return (
    <div
      data-slot="sidebar-menu-icon"
      className={slots.menuIcon({
        className,
      })}
      {...rest}
    >
      {children}
    </div>
  );
}

export { SidebarMenuIcon };
export type { SidebarMenuIconProps };

interface SidebarMenuItemContentProps extends React.ComponentProps<"div"> {}

function SidebarMenuItemContent({
  children,
  className,
  ...rest
}: SidebarMenuItemContentProps) {
  return (
    <div
      data-slot="sidebar-menu-item-content"
      className={slots.menuItemContent({
        className,
      })}
      {...rest}
    >
      {children}
    </div>
  );
}

export { SidebarMenuItemContent };
export type { SidebarMenuItemContentProps };

interface SidebarMenuLabelProps extends React.ComponentProps<"div"> {}

function SidebarMenuLabel({
  children,
  className,
  ...rest
}: SidebarMenuLabelProps) {
  return (
    <div
      data-slot="sidebar-menu-label"
      className={slots.menuLabel({
        className,
      })}
      {...rest}
    >
      <div
        data-slot="sidebar-menu-label-text"
        className={slots.menuLabelText()}
      >
        {children}
      </div>
    </div>
  );
}

export { SidebarMenuLabel };
export type { SidebarMenuLabelProps };

interface SidebarFooterProps extends React.ComponentProps<"div"> {}

function SidebarFooter({ children, className, ...rest }: SidebarFooterProps) {
  return (
    <div
      data-slot="sidebar-footer"
      className={slots.footer({
        className,
      })}
      {...rest}
    >
      {children}
    </div>
  );
}

export { SidebarFooter };
export type { SidebarFooterProps };
