"use client";

import { createContext, type ComponentProps } from "react";

import { surfaceVariants, type SurfaceVariants } from "./surface.variants";

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

export { Surface, SurfaceContext };
export type { SurfaceProps };
