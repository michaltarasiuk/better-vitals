"use client";

import { createContext } from "@lite-app/shared/create-context";
import { PanelLeftIcon } from "lucide-react";
import { useState } from "react";
import { composeRenderProps } from "react-aria-components";

import { Button, type ButtonProps } from "../button";
import { sidebarVariants } from "./sidebar";

const slots = sidebarVariants();

interface SidebarContextValue {
  open: boolean;
  toggle: () => void;
}

const [SidebarContext, useSidebar] =
  createContext<SidebarContextValue>("SidebarContext");

export interface SidebarProviderProps extends React.ComponentProps<"div"> {}

export function SidebarProvider({
  children,
  className,
  ...rest
}: SidebarProviderProps) {
  const [open, setOpen] = useState(true);
  function toggle() {
    setOpen((prevOpen) => !prevOpen);
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

export interface SidebarTriggerProps extends ButtonProps {}

export function SidebarTrigger({
  children,
  onPress,
  ...rest
}: SidebarTriggerProps) {
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

export interface SidebarProps extends React.ComponentProps<"div"> {}

export function Sidebar({ children, className, ...rest }: SidebarProps) {
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

export interface SidebarHeaderProps extends React.ComponentProps<"div"> {}

export function SidebarHeader({
  children,
  className,
  ...rest
}: SidebarHeaderProps) {
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

export interface SidebarContentProps extends React.ComponentProps<"div"> {}

export function SidebarContent({
  children,
  className,
  ...rest
}: SidebarContentProps) {
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

export interface SidebarMenuProps extends React.ComponentProps<"div"> {}

export function SidebarMenu({
  children,
  className,
  ...rest
}: SidebarMenuProps) {
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

export interface SidebarMenuItemProps extends React.ComponentProps<"div"> {}

export function SidebarMenuItem({
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

export interface SidebarMenuIconProps extends React.ComponentProps<"div"> {}

export function SidebarMenuIcon({
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

export interface SidebarMenuItemContentProps extends React.ComponentProps<"div"> {}

export function SidebarMenuItemContent({
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

export interface SidebarMenuLabelProps extends React.ComponentProps<"div"> {}

export function SidebarMenuLabel({
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

export interface SidebarFooterProps extends React.ComponentProps<"div"> {}

export function SidebarFooter({
  children,
  className,
  ...rest
}: SidebarFooterProps) {
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
