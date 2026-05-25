"use client";

import {
  Label as RACLabel,
  type LabelProps as RACLabelProps,
} from "react-aria-components/Label";
import { cn } from "tailwind-variants";

import { labelVariants, type LabelVariants } from "./label.variants";

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
