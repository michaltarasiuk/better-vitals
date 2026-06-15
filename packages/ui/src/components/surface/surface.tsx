import { createContext } from "@lite-app/shared/create-context";

import { surfaceVariants, type SurfaceVariants } from "./surface.ts";

interface SurfaceContextValue extends SurfaceVariants {}

export const [SurfaceContext, useSurfaceContext] =
  createContext<SurfaceContextValue>("SurfaceContext");

export interface SurfaceProps
  extends React.ComponentProps<"div">, SurfaceVariants {}

export function Surface({
  children,
  variant,
  className,
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
