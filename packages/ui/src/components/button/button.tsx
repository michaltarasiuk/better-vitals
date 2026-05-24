"use client";

import type { ButtonVariants } from "@lite-app/styles/components/button";
import { buttonVariants } from "@lite-app/styles/components/button";
import type { ComponentPropsWithRef } from "react";
import { Button as ButtonPrimitive } from "react-aria-components/Button";

import { cnRenderProps } from "../../utils/cn-render-props";

interface ButtonRootProps
  extends ComponentPropsWithRef<typeof ButtonPrimitive>, ButtonVariants {}

function ButtonRoot({
  variant,
  size,
  isDisabled,
  fullWidth,
  isIconOnly,
  slot,
  className,
  style,
  children,
  ...rest
}: ButtonRootProps) {
  const styles = buttonVariants({
    fullWidth,
    isIconOnly,
    size,
    variant,
  });

  return (
    <ButtonPrimitive
      data-slot="button"
      isDisabled={isDisabled}
      slot={slot}
      className={cnRenderProps(className, styles)}
      style={style}
      {...rest}
    >
      {(renderProps) =>
        typeof children === "function" ? children(renderProps) : children
      }
    </ButtonPrimitive>
  );
}

export { ButtonRoot };

export type { ButtonRootProps };
