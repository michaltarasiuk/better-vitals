"use client";

import type { ButtonVariants } from "@lite-app/styles/components/button";
import { buttonVariants } from "@lite-app/styles/components/button";
import type { ComponentPropsWithRef } from "react";
import { useContext } from "react";
import { Button as ButtonPrimitive } from "react-aria-components/Button";

import { composeTwRenderProps } from "../../utils/compose";
import { BUTTON_GROUP_CHILD, ButtonGroupContext } from "../button-group";

interface ButtonRootProps
  extends ComponentPropsWithRef<typeof ButtonPrimitive>, ButtonVariants {
  [BUTTON_GROUP_CHILD]?: boolean;
}

function ButtonRoot({
  variant,
  size,
  isDisabled,
  fullWidth,
  isIconOnly,
  slot,
  className,
  style,
  [BUTTON_GROUP_CHILD]: isButtonGroupChild,
  children,
  ...rest
}: ButtonRootProps) {
  const buttonGroupContext = useContext(ButtonGroupContext);

  const shouldUseContext = isButtonGroupChild === true;

  const finalSize =
    size ?? (shouldUseContext ? buttonGroupContext?.size : undefined);
  const finalVariant =
    variant ?? (shouldUseContext ? buttonGroupContext?.variant : undefined);
  const finalIsDisabled =
    isDisabled ??
    (shouldUseContext ? buttonGroupContext?.isDisabled : undefined);
  const finalFullWidth =
    fullWidth ?? (shouldUseContext ? buttonGroupContext?.fullWidth : undefined);

  const styles = buttonVariants({
    fullWidth: finalFullWidth,
    isIconOnly,
    size: finalSize,
    variant: finalVariant,
  });

  return (
    <ButtonPrimitive
      data-slot="button"
      isDisabled={finalIsDisabled}
      slot={slot}
      className={composeTwRenderProps(className, styles)}
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
