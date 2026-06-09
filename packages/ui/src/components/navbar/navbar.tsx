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
