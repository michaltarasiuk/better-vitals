"use client";

import type { SurfaceVariants } from "@lite-app/styles/components/surface";
import { surfaceVariants } from "@lite-app/styles/components/surface";
import type { ReactNode } from "react";
import React, { createContext } from "react";

import type { DOMRenderProps } from "../../utils/dom";
import { dom } from "../../utils/dom";

interface SurfaceContext {
  variant?: SurfaceVariants["variant"];
}

const SurfaceContext = createContext<SurfaceContext>({});

interface SurfaceRootProps<
  E extends keyof React.JSX.IntrinsicElements = "div",
> extends DOMRenderProps<E, undefined> {
  variant?: SurfaceVariants["variant"];
  children: ReactNode;
  className?: string;
}

function SurfaceRoot<E extends keyof React.JSX.IntrinsicElements = "div">({
  variant = "default",
  children,
  className,
  ...rest
}: SurfaceRootProps<E> &
  Omit<React.JSX.IntrinsicElements[E], keyof SurfaceRootProps<E>>) {
  return (
    <SurfaceContext value={{ variant }}>
      <dom.div
        data-slot="surface"
        className={surfaceVariants({ className, variant })}
        {...(rest as React.ComponentProps<typeof dom.div>)}
      >
        {children}
      </dom.div>
    </SurfaceContext>
  );
}

export { SurfaceContext, SurfaceRoot };

export type { SurfaceRootProps };
