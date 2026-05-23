"use client";

import type { LabelVariants } from "@lite-app/styles/components/label";
import { labelVariants } from "@lite-app/styles/components/label";
import type { ComponentPropsWithRef } from "react";
import { Label as LabelPrimitive } from "react-aria-components/Label";

interface LabelRootProps
  extends ComponentPropsWithRef<typeof LabelPrimitive>, LabelVariants {}

function LabelRoot({
  isRequired,
  isInvalid,
  isDisabled,
  children,
  className,
  ...rest
}: LabelRootProps) {
  return (
    <LabelPrimitive
      data-slot="label"
      className={labelVariants({
        className,
        isDisabled,
        isInvalid,
        isRequired,
      })}
      {...rest}
    >
      {children}
    </LabelPrimitive>
  );
}

export { LabelRoot };

export type { LabelRootProps };
