"use client";

import type { LabelVariants } from "@lite-app/styles/components/label";
import { labelVariants } from "@lite-app/styles/components/label";
import type { ComponentPropsWithRef } from "react";
import { Label as LabelPrimitive } from "react-aria-components/Label";

interface LabelRootProps
  extends ComponentPropsWithRef<typeof LabelPrimitive>, LabelVariants {}

function LabelRoot({
  children,
  className,
  isDisabled,
  isInvalid,
  isRequired,
  ...rest
}: LabelRootProps) {
  return (
    <LabelPrimitive
      className={labelVariants({
        className,
        isDisabled,
        isInvalid,
        isRequired,
      })}
      data-slot="label"
      {...rest}
    >
      {children}
    </LabelPrimitive>
  );
}

export { LabelRoot };

export type { LabelRootProps };
