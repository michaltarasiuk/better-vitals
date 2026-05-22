"use client";

import type { SurfaceVariants } from "@lite-app/styles/components/surface";
import { surfaceVariants } from "@lite-app/styles/components/surface";
import type { ReactNode } from "react";
import React, { createContext } from "react";

import type { DOMRenderProps } from "../../utils/dom";
import { dom } from "../../utils/dom";

/*
 * Surface Context
 */
interface SurfaceContext {
  variant?: SurfaceVariants["variant"];
}

const SurfaceContext = createContext<SurfaceContext>({});

/*
 * Surface Root
 */
interface SurfaceRootProps<
  E extends keyof React.JSX.IntrinsicElements = "div",
> extends DOMRenderProps<E, undefined> {
  children: ReactNode;
  className?: string;
  /** Visual variant. @default "default" */
  variant?: SurfaceVariants["variant"];
}

const SurfaceRoot = <E extends keyof React.JSX.IntrinsicElements = "div">({
  children,
  className,
  variant = "default",
  ...rest
}: SurfaceRootProps<E> &
  Omit<React.JSX.IntrinsicElements[E], keyof SurfaceRootProps<E>>) => (
  <SurfaceContext value={{ variant }}>
    <dom.div
      className={surfaceVariants({ className, variant })}
      data-slot="surface"
      {...(rest as React.ComponentProps<typeof dom.div>)}
    >
      {children}
    </dom.div>
  </SurfaceContext>
);

/*
 * Exports
 */
export { SurfaceContext, SurfaceRoot };

export type { SurfaceRootProps };
