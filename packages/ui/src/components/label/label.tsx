"use client";

import type { ComponentPropsWithRef } from "react";
import { Label as LabelPrimitive } from "react-aria-components/Label";
import { cn } from "tailwind-variants";

import type { LabelVariants } from "./label.variants";
import { labelVariants } from "./label.variants";

interface LabelRootProps
  extends ComponentPropsWithRef<typeof LabelPrimitive>, LabelVariants {}

function LabelRoot({
  isRequired,
  isInvalid,
  isDisabled,
  className,
  children,
  ...rest
}: LabelRootProps) {
  return (
    <LabelPrimitive
      data-slot="label"
      className={cn(
        labelVariants({ isDisabled, isInvalid, isRequired }),
        className
      )}
      {...rest}
    >
      {children}
    </LabelPrimitive>
  );
}

export { LabelRoot };

export type { LabelRootProps };
