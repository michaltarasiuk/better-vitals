"use client";

import type {
  ComponentPropsWithoutRef,
  ComponentPropsWithRef,
  ReactNode,
} from "react";
import { createContext, useContext } from "react";
import { Link as LinkPrimitive } from "react-aria-components/Link";
import { cn } from "tailwind-variants";

import { cnRenderProps } from "../../utils/cn-render-props";
import { ExternalLinkIcon } from "../icons";
import type { LinkVariants } from "./link.variants";
import { linkVariants } from "./link.variants";

interface LinkContext {
  slots?: ReturnType<typeof linkVariants>;
}

const LinkContext = createContext<LinkContext>({});

interface LinkRootProps
  extends ComponentPropsWithRef<typeof LinkPrimitive>, LinkVariants {}

function LinkRoot({ href, className, children, ...rest }: LinkRootProps) {
  const slots = linkVariants();

  return (
    <LinkContext value={{ slots }}>
      <LinkPrimitive
        href={href}
        className={cnRenderProps(className, slots?.base())}
        {...rest}
      >
        {(values) => (
          <>{typeof children === "function" ? children(values) : children}</>
        )}
      </LinkPrimitive>
    </LinkContext>
  );
}

interface LinkIconProps extends ComponentPropsWithoutRef<"span"> {
  children?: ReactNode;
}

function LinkIcon({ className, children, ...rest }: LinkIconProps) {
  const { slots } = useContext(LinkContext);

  return (
    <span
      data-slot="link-icon"
      data-default-icon={!children}
      className={cn(slots?.icon?.(), className)}
      {...rest}
    >
      {children ?? <ExternalLinkIcon data-slot="link-default-icon" />}
    </span>
  );
}

export { LinkIcon, LinkRoot };

export type { LinkIconProps, LinkRootProps };
