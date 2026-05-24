"use client";

import type { SurfaceVariants } from "@lite-app/styles/components/surface";
import { surfaceVariants } from "@lite-app/styles/components/surface";
import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { createContext } from "react";

import { cn } from "../../utils/cn";

interface SurfaceContext {
  variant?: SurfaceVariants["variant"];
}

const SurfaceContext = createContext<SurfaceContext>({});

interface SurfaceRootProps extends ComponentPropsWithoutRef<"div"> {
  variant?: SurfaceVariants["variant"];
  children: ReactNode;
}

function SurfaceRoot({
  variant = "default",
  className,
  children,
  ...rest
}: SurfaceRootProps) {
  return (
    <SurfaceContext value={{ variant }}>
      <div
        data-slot="surface"
        className={cn(surfaceVariants({ variant }), className)}
        {...rest}
      >
        {children}
      </div>
    </SurfaceContext>
  );
}

export { SurfaceContext, SurfaceRoot };

export type { SurfaceRootProps };
