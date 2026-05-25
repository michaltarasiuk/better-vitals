"use client";

import { isDefined } from "@lite-app/shared/is-defined";
import type { ComponentProps } from "react";
import {
  Link as RACLink,
  type LinkProps as RACLinkProps,
} from "react-aria-components/Link";
import { cn } from "tailwind-variants";

import { cnRenderProps } from "../../utils/cn-render-props";
import { ExternalLinkIcon } from "../icons";
import { linkVariants, type LinkVariants } from "./link.variants";

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

export { Link };
export type { LinkProps };

interface LinkIconProps extends ComponentProps<"span"> {}

function LinkIcon({ className, children, ...rest }: LinkIconProps) {
  return (
    <span
      data-slot="link-icon"
      data-default-icon={!isDefined(children)}
      className={cn(slots.icon(), className)}
      {...rest}
    >
      {children ?? <ExternalLinkIcon data-slot="link-default-icon" />}
    </span>
  );
}

export { LinkIcon };
export type { LinkIconProps };
