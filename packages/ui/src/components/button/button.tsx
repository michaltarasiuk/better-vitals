"use client";

import {
  Button as RACButton,
  type ButtonProps as RACButtonProps,
} from "react-aria-components/Button";

import { cnRenderProps } from "../../utils/cn-render-props";
import { buttonVariants, type ButtonVariants } from "./button.ts";

export interface ButtonProps extends RACButtonProps, ButtonVariants {}

export function Button({
  variant,
  size,
  fullWidth,
  isIconOnly,
  className,
  children,
  ...rest
}: ButtonProps) {
  return (
    <RACButton
      data-slot="button"
      className={cnRenderProps(
        className,
        buttonVariants({
          fullWidth,
          isIconOnly,
          size,
          variant,
        })
      )}
      {...rest}
    >
      {children}
    </RACButton>
  );
}
