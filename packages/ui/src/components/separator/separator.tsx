"use client";

import {
  Separator as RACSeparator,
  SeparatorContext,
  type SeparatorProps as RACSeparatorProps,
} from "react-aria-components/Separator";
import { useSlottedContext } from "react-aria-components/slots";

import {
  separatorVariants,
  type SeparatorVariants,
} from "./separator.variants";

interface SeparatorProps extends RACSeparatorProps, SeparatorVariants {}

function Separator({ variant, className, ...rest }: SeparatorProps) {
  const context = useSlottedContext(SeparatorContext);
  const orientation = rest.orientation ?? context?.orientation ?? "horizontal";

  return (
    <RACSeparator
      data-slot="separator"
      data-orientation={orientation}
      orientation={orientation}
      className={separatorVariants({
        className,
        orientation,
        variant,
      })}
      {...rest}
    />
  );
}

export { Separator };
export type { SeparatorProps };
