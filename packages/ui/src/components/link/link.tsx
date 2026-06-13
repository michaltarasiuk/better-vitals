"use client";

import { isDefined } from "@lite-app/shared/is-defined";
import { ArrowUpRightIcon } from "lucide-react";
import {
  Link as RACLink,
  type LinkProps as RACLinkProps,
} from "react-aria-components/Link";

import { cnRenderProps } from "../../utils/cn-render-props";
import { linkVariants, type LinkVariants } from "./link.ts";

const slots = linkVariants();

export interface LinkProps extends RACLinkProps, LinkVariants {}

export function Link({ className, children, ...rest }: LinkProps) {
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

export interface LinkIconProps extends React.ComponentProps<"span"> {}

export function LinkIcon({ className, children, ...rest }: LinkIconProps) {
  return (
    <span
      data-slot="link-icon"
      data-default-icon={!isDefined(children)}
      className={slots.icon({
        className,
      })}
      {...rest}
    >
      {children ?? (
        <ArrowUpRightIcon aria-hidden data-slot="link-default-icon" size={9} />
      )}
    </span>
  );
}
