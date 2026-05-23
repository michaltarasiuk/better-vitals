"use client";

import type { LinkVariants } from "@lite-app/styles/components/link";
import { linkVariants } from "@lite-app/styles/components/link";
import type { ComponentPropsWithRef, ReactNode } from "react";
import React, { createContext, useContext } from "react";
import { Link as LinkPrimitive } from "react-aria-components/Link";

import { dataAttr } from "../../utils/assertion";
import {
  composeSlotClassName,
  composeTwRenderProps,
} from "../../utils/compose";
import type { DOMRenderProps } from "../../utils/dom";
import { dom } from "../../utils/dom";
import { ExternalLinkIcon } from "../icons";

interface LinkContext {
  slots?: ReturnType<typeof linkVariants>;
}

const LinkContext = createContext<LinkContext>({});

interface LinkRootProps
  extends ComponentPropsWithRef<typeof LinkPrimitive>, LinkVariants {}

function LinkRoot({ children, className, ...props }: LinkRootProps) {
  const slots = React.useMemo(() => linkVariants(), []);

  return (
    <LinkContext value={{ slots }}>
      <LinkPrimitive
        {...props}
        className={composeTwRenderProps(className, slots?.base())}
      >
        {(values) => (
          <>{typeof children === "function" ? children(values) : children}</>
        )}
      </LinkPrimitive>
    </LinkContext>
  );
}

interface LinkIconProps<
  E extends keyof React.JSX.IntrinsicElements = "span",
> extends DOMRenderProps<E, undefined> {
  children?: ReactNode;
  className?: string;
}

function LinkIcon<E extends keyof React.JSX.IntrinsicElements = "span">({
  children,
  className,
  ...rest
}: LinkIconProps<E> &
  Omit<React.JSX.IntrinsicElements[E], keyof LinkIconProps<E>>) {
  const { slots } = useContext(LinkContext);

  return (
    <dom.span
      className={composeSlotClassName(slots?.icon, className)}
      data-default-icon={dataAttr(!children)}
      data-slot="link-icon"
      {...(rest as React.ComponentProps<typeof dom.span>)}
    >
      {children ?? <ExternalLinkIcon data-slot="link-default-icon" />}
    </dom.span>
  );
}

export { LinkIcon, LinkRoot };

export type { LinkIconProps, LinkRootProps };
