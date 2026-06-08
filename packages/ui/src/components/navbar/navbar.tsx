import React from "react";

import { navbarVariants } from "./navbar";

const slots = navbarVariants();

interface NavbarProps extends React.ComponentProps<"div"> {}

function Navbar({ children, className, ...rest }: NavbarProps) {
  return (
    <nav
      data-slot="navbar"
      className={slots.base({
        className,
      })}
      {...rest}
    >
      {children}
    </nav>
  );
}

export { Navbar };
export type { NavbarProps };

interface NavbarHeaderProps extends React.ComponentProps<"div"> {}

function NavbarHeader({ children, className, ...rest }: NavbarHeaderProps) {
  return (
    <div
      data-slot="navbar-header"
      className={slots.header({
        className,
      })}
      {...rest}
    >
      {children}
    </div>
  );
}

export { NavbarHeader };
export type { NavbarHeaderProps };

interface NavbarSpacerProps extends React.ComponentProps<"div"> {}

function NavbarSpacer({ children, className, ...rest }: NavbarSpacerProps) {
  return (
    <div
      aria-hidden
      data-slot="navbar-spacer"
      className={slots.spacer({
        className,
      })}
      {...rest}
    >
      {children}
    </div>
  );
}

export { NavbarSpacer };
export type { NavbarSpacerProps };
