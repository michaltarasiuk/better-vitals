"use client";

import type { LinkVariants } from "@lite-app/styles/components/link";
import { linkVariants } from "@lite-app/styles/components/link";
import type {
  ComponentPropsWithoutRef,
  ComponentPropsWithRef,
  ReactNode,
} from "react";
import { createContext, useContext } from "react";
import { Link as LinkPrimitive } from "react-aria-components/Link";

import {
  composeSlotClassName,
  composeTwRenderProps,
} from "../../utils/compose";
import { ExternalLinkIcon } from "../icons";

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
        className={composeTwRenderProps(className, slots?.base())}
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
      className={composeSlotClassName(slots?.icon, className)}
      {...rest}
    >
      {children ?? <ExternalLinkIcon data-slot="link-default-icon" />}
    </span>
  );
}

export { LinkIcon, LinkRoot };

export type { LinkIconProps, LinkRootProps };
