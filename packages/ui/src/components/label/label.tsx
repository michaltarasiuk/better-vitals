"use client";

import type { LabelVariants } from "@lite-app/styles/components/label";
import { labelVariants } from "@lite-app/styles/components/label";
import type { ComponentPropsWithRef } from "react";
import { Label as LabelPrimitive } from "react-aria-components/Label";

/*
 * Label Root
 */
interface LabelRootProps
  extends ComponentPropsWithRef<typeof LabelPrimitive>, LabelVariants {}

const LabelRoot = ({
  children,
  className,
  isDisabled,
  isInvalid,
  isRequired,
  ...rest
}: LabelRootProps) => (
  <LabelPrimitive
    className={labelVariants({ className, isDisabled, isInvalid, isRequired })}
    data-slot="label"
    {...rest}
  >
    {children}
  </LabelPrimitive>
);

/*
 * Exports
 */
export { LabelRoot };

export type { LabelRootProps };
