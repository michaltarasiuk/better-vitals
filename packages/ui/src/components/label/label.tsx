"use client";

import {
  Label as RACLabel,
  type LabelProps as RACLabelProps,
} from "react-aria-components/Label";

import { labelVariants, type LabelVariants } from "./label.ts";

export interface LabelProps extends RACLabelProps, LabelVariants {}

export function Label({
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
      className={labelVariants({
        className,
        isDisabled,
        isInvalid,
        isRequired,
      })}
      {...rest}
    >
      {children}
    </RACLabel>
  );
}
