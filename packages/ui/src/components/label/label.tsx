"use client";

import type { LabelProps as RACLabelProps } from "react-aria-components/Label";
import { Label as RACLabel } from "react-aria-components/Label";
import { cn } from "tailwind-variants";

import type { LabelVariants } from "./label.variants";
import { labelVariants } from "./label.variants";

interface LabelProps extends RACLabelProps, LabelVariants {}

function Label({
  isRequired,
  isInvalid,
  isDisabled,
  className,
  children,
  ...rest
}: LabelProps) {
  return (
    <RACLabel
      data-slot="label"
      className={cn(
        labelVariants({
          isDisabled,
          isInvalid,
          isRequired,
        }),
        className
      )}
      {...rest}
    >
      {children}
    </RACLabel>
  );
}

export { Label };
export type { LabelProps };
