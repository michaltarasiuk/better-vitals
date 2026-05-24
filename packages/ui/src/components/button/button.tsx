"use client";

import type { ButtonVariants } from "@lite-app/styles/components/button";
import { buttonVariants } from "@lite-app/styles/components/button";
import type { ButtonProps as RACButtonProps } from "react-aria-components/Button";
import { Button as RACButton } from "react-aria-components/Button";

import { cnRenderProps } from "../../utils/cn-render-props";

interface ButtonProps extends RACButtonProps, ButtonVariants {}

function Button({
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

export { Button };
export type { ButtonProps };
