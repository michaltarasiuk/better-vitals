"use client";

import type { ComponentProps } from "react";
import type { LinkProps as RACLinkProps } from "react-aria-components/Link";
import { Link as RACLink } from "react-aria-components/Link";
import { cn } from "tailwind-variants";

import { cnRenderProps } from "../../utils/cn-render-props";
import { ExternalLinkIcon } from "../icons";
import type { LinkVariants } from "./link.variants";
import { linkVariants } from "./link.variants";

const slots = linkVariants();

interface LinkProps extends RACLinkProps, LinkVariants {}

function Link({ className, children, ...rest }: LinkProps) {
  return (
    <RACLink
      data-slot="link"
      className={cnRenderProps(className, slots.base())}
      {...rest}
    >
      {children}
    </RACLink>
  );
}

interface LinkIconProps extends ComponentProps<"span"> {}

function LinkIcon({ className, children, ...rest }: LinkIconProps) {
  return (
    <span
      data-slot="link-icon"
      data-default-icon={!children}
      className={cn(slots.icon(), className)}
      {...rest}
    >
      {children ?? <ExternalLinkIcon data-slot="link-default-icon" />}
    </span>
  );
}

export { Link, LinkIcon };
export type { LinkIconProps, LinkProps };
