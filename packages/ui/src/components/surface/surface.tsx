"use client";

import type { ComponentProps } from "react";
import { createContext } from "react";
import { cn } from "tailwind-variants";

import type { SurfaceVariants } from "./surface.variants";
import { surfaceVariants } from "./surface.variants";

const SurfaceContext = createContext<Pick<SurfaceVariants, "variant">>({});

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
        className={cn(
          surfaceVariants({
            variant,
          }),
          className
        )}
        {...rest}
      >
        {children}
      </div>
    </SurfaceContext>
  );
}

export { Surface, SurfaceContext };
export type { SurfaceProps };
