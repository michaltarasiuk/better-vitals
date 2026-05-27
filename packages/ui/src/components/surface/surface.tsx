"use client";

import { createContext } from "@lite-app/shared/create-context";
import type { ComponentProps } from "react";

import { surfaceVariants, type SurfaceVariants } from "./surface.variants";

const [SurfaceContext, useSurfaceContext] =
  createContext<Pick<SurfaceVariants, "variant">>("SurfaceContext");

interface SurfaceProps extends ComponentProps<"div">, SurfaceVariants {}

function Surface({ variant, className, children, ...rest }: SurfaceProps) {
  return (
    <SurfaceContext
      value={{
        variant,
      }}
    >
      <div
        data-slot="surface"
        className={surfaceVariants({
          className,
          variant,
        })}
        {...rest}
      >
        {children}
      </div>
    </SurfaceContext>
  );
}

export { Surface, SurfaceContext, useSurfaceContext };
export type { SurfaceProps };
