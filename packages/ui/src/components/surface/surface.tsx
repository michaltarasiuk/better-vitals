"use client";

import { createContext } from "@lite-app/shared/create-context";

import { surfaceVariants, type SurfaceVariants } from "./surface.ts";

interface SurfaceContextValue extends Pick<SurfaceVariants, "variant"> {}

const [SurfaceContext, useSurfaceContext] =
  createContext<SurfaceContextValue>("SurfaceContext");

interface SurfaceProps extends React.ComponentProps<"div">, SurfaceVariants {}

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
