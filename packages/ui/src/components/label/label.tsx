"use client";

import type { LabelVariants } from "@lite-app/styles/components/label";
import { labelVariants } from "@lite-app/styles/components/label";
import type { ComponentPropsWithRef } from "react";
import { Label as LabelPrimitive } from "react-aria-components/Label";
import { cn } from "tailwind-variants";

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
