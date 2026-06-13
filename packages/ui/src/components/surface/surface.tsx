"use client";

import { createContext } from "@lite-app/shared/create-context";

import { surfaceVariants, type SurfaceVariants } from "./surface.ts";

interface SurfaceContextValue extends Pick<SurfaceVariants, "variant"> {}

export const [SurfaceContext, useSurfaceContext] =
  createContext<SurfaceContextValue>("SurfaceContext");

export interface SurfaceProps
  extends React.ComponentProps<"div">, SurfaceVariants {}

export function Surface({
  variant,
  className,
  children,
  ...rest
}: SurfaceProps) {
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
